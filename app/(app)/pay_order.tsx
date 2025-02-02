import { useMemo } from "react";
import { FlatList } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useToastController } from "@tamagui/toast";
import { XStack, View, Text } from "tamagui";
import { Label, ScrollView, YStack } from "tamagui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { LaundryFormData } from "types/laundry";
import { OrderPaymentFormData } from "types/payment";
import { renderEmptyLaundryList } from "./(tabs)/create_order";
import useOrders from "hooks/useOrders";
import { PAYMENT_QUERY_KEY } from "./(more)/payment-modes";
import { ControlledSelect } from "components/create_order/laundrySelector";
import { ControlledInput } from "components/common/input";
import { LaundryItem, LaundryListFooter } from "components/create_order";
import { CButton, ConfirmDialogue, Container } from "components/common";
import { selectAllPaymentModes } from "lib/sqlite/paymentModes";
import { OrderPaymentSchema } from "lib/types/payment";
import OrderServices from "lib/services/OrderServices";
import LogServices from "lib/services/LogServices";
import { ORDER_STAGES } from "constants/order";

const Pay = () => {
  const params = useLocalSearchParams();
  const toast = useToastController();
  const queryClient = useQueryClient();
  const { orders, isPending: fetching, refetch } = useOrders();
  const { control, handleSubmit, reset, watch } = useForm<OrderPaymentFormData>(
    {
      resolver: zodResolver(OrderPaymentSchema),
    }
  );

  const paymentMode = watch("mode");

  const orderOnPayment =
    typeof params?.order === "string" ? parseInt(params?.order, 10) : null;
  const modeOfPayment = typeof params?.mdoe === "string" ? params?.mode : null;

  const { refetch: refetchOrder } = useQuery({
    queryKey: ["orders", params?.order],
    queryFn: () => OrderServices.fetchSingle(orderOnPayment),
    enabled: !!params?.order,
  });

  const currentOrder = useMemo(() => {
    if (orders && orderOnPayment)
      return orders.find((order) => order.id === orderOnPayment);
  }, [orders, params?.order]);

  const totalPaymentMade = useMemo(() => {
    if (!currentOrder?.payments?.data || !currentOrder?.payments?.data?.length)
      return 0;

    return currentOrder.payments.data.reduce(
      (acc, item) => acc + (parseInt(item?.amount, 10) ?? 0),
      0
    );
  }, [currentOrder?.laundry]);

  // fetch payment modes from local storage
  const { data, isPending } = useQuery({
    queryKey: PAYMENT_QUERY_KEY,
    queryFn: selectAllPaymentModes,
  });

  const handleSuccess = (_, variables) => {
    // append the created order to current list of orders
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    reset();
    refetchOrder();
    toast.show("Success", {
      message: `Payment successful`,
      type: "success",
    });
    if (currentOrder?.id) {
      const paymentString =
        modeOfPayment === "clear"
          ? `KES ${variables?.amount} Payment Made.`
          : `KES ${variables?.amount} Payment Made and order is processing.`;
      // create log: processing
      LogServices.create({
        order: currentOrder.id,
        stage: ORDER_STAGES[2],
        description: paymentString,
      });
    }
    modeOfPayment === "clear" ? router.back() : router.push("orders");
  };

  const handleError = (error) => {
    toast.show("Error paying for order.", {
      message: error.message,
      type: "error",
    });
  };

  const { mutate: payOrder, isPending: isPaying } = useMutation({
    mutationKey: ["pay_order"],
    mutationFn: OrderServices.pay,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (_payload: OrderPaymentFormData) => {
    if (!currentOrder) return;

    const balance =
      currentOrder.negotiated_amount -
      (parseInt(_payload.amount, 10) + totalPaymentMade);

    const payload = {
      mode: _payload.mode,
      other_details: _payload?.other_details,
      amount: _payload.amount,
      balance,
      order: currentOrder.id,
    };
    payOrder(payload);
  };

  return (
    <Container py={"$3"}>
      <ScrollView>
        <View>
          <XStack mb={"$2"} justifyContent="space-between" alignItems="center">
            <Text fontWeight={"600"} fontSize={14} color={"black"}>
              Laundry Items
            </Text>
          </XStack>

          <FlatList
            refreshing={fetching}
            onRefresh={refetch}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={renderEmptyLaundryList}
            data={currentOrder?.laundry ?? []}
            renderItem={renderLaundryItem}
            ListFooterComponent={() =>
              renderLaundryFooter(
                currentOrder?.amount ?? 0,
                currentOrder?.negotiated_amount ?? 0
              )
            }
            scrollEnabled={false}
          />
        </View>

        <YStack mt={"$3"}>
          {/* item name */}
          <ControlledInput
            name="amount"
            control={control}
            label="Paid amount"
            placeholder="customer initial payment"
          />

          <View>
            <Label lineHeight={"$6"} fontWeight={"500"} color={"black"}>
              Payment Mode
            </Label>
            <ControlledSelect
              control={control}
              name="mode"
              data={data ?? []}
              isPending={isPending}
              value={paymentMode}
              placeholder={
                isPending ? "Fetching modes..." : "--choose payment mode--"
              }
            />
          </View>
          {/* Other details about payment */}
          <ControlledInput
            name="other_details"
            control={control}
            label="Other Details"
            placeholder="i.e. mpesa code."
          />
          <View h={"$0.5"} />

          <ConfirmDialogue
            handleAccept={handleSubmit(onSubmit)}
            body="Pay order?"
          >
            <CButton
              text={isPending ? "saving..." : "Save"}
              mt="$4"
              letterSpacing={1}
              disabled={!currentOrder || isPaying}
            />
          </ConfirmDialogue>
        </YStack>
      </ScrollView>
    </Container>
  );
};

export default Pay;

const renderLaundryItem = ({ item }: { item: LaundryFormData }) => {
  return <LaundryItem item={item} hideActions />;
};
const renderLaundryFooter = (
  totalOrderAmount: number,
  negotiated_amount?: number
) => (
  <LaundryListFooter
    hideActions
    totalOrderAmount={totalOrderAmount}
    negotiated_amount={negotiated_amount ?? 0}
  />
);
