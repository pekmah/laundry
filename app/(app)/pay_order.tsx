import { zodResolver } from "@hookform/resolvers/zod";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FlatList } from "react-native";
import { Label, ScrollView, Text, View, XStack, YStack } from "tamagui";

import { CButton, ConfirmDialogue, Container } from "components/common";
import { ControlledInput } from "components/common/input";
import { LaundryItem, LaundryListFooter } from "components/create_order";
import { ControlledSelect } from "components/create_order/laundrySelector";
import useOrders from "hooks/useOrders";
import OrderServices from "lib/services/OrderServices";
import { selectAllPaymentModes } from "lib/sqlite/paymentModes";
import { OrderPaymentSchema } from "lib/types/payment";
import { ILaundryItem } from "types/laundry";
import { OrderPaymentFormData } from "types/payment";
import { PAYMENT_QUERY_KEY } from "./(more)/payment-modes";
import { renderEmptyLaundryList } from "./(tabs)/create_order";

const Pay = () => {
  const params = useLocalSearchParams();
  const toast = useToastController();
  const router = useRouter();
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

  const { refetch: refetchOrder } = useQuery({
    queryKey: ["orders", params?.order],
    queryFn: () => OrderServices.fetchSingle(orderOnPayment),
    enabled: !!params?.order,
  });

  const currentOrder = useMemo(() => {
    if (orders && orderOnPayment)
      return orders.find((order) => order.id === orderOnPayment);
  }, [orders, params?.order]);

  // fetch payment modes from local storage
  const { data, isPending } = useQuery({
    queryKey: PAYMENT_QUERY_KEY,
    queryFn: selectAllPaymentModes,
  });

  const handleSuccess = () => {
    // append the created order to current list of orders
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    reset();
    refetchOrder();
    toast.show("Success", {
      message: `Payment successful`,
      type: "success",
    });
    // push to view order screen
    router.push({
      pathname: "/(app)/view_order",
      params: { order: currentOrder?.id.toString() },
    });
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

    const payload = {
      paymentMethod: _payload.mode,
      otherDetails: _payload?.other_details,
      amount: Number(_payload.amount),
      orderNumber: currentOrder.orderNumber,
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
            data={currentOrder?.laundryItems ?? []}
            renderItem={renderLaundryItem}
            ListFooterComponent={() =>
              renderLaundryFooter(
                currentOrder?.totalAmount ?? 0,
                currentOrder?.paymentAmount ?? 0
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

const renderLaundryItem = ({ item }: { item: ILaundryItem }) => {
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
