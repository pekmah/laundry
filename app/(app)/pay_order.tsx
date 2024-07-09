import { CButton, Container } from "components/common";
import { useLocalSearchParams } from "expo-router";
import useOrders from "hooks/useOrders";
import { useMemo } from "react";
import { FlatList } from "react-native";
import { ScrollView, YStack } from "tamagui";
import { renderEmptyLaundryList } from "./(tabs)/create_order";
import { LaundryFormData } from "types/laundry";
import { LaundryItem, LaundryListFooter } from "components/create_order";
import { XStack, View, Text } from "tamagui";
import { ControlledInput } from "components/common/input";
import { useForm } from "react-hook-form";

const Pay = () => {
  const params = useLocalSearchParams();
  const { orders } = useOrders();
  const { control, handleSubmit, reset } = useForm();

  const currentOrder = useMemo(() => {
    const orderOnPayment =
      typeof params?.order === "string" ? parseInt(params?.order, 10) : null;
    if (orders && orderOnPayment)
      return orders.find((order) => order.id === orderOnPayment);
  }, [orders, params?.order]);

  const totalLaundryOrderAmount = useMemo(() => {
    return currentOrder?.laundry.reduce(
      (acc, item) => acc + (item.price ?? 0),
      0
    );
  }, [currentOrder?.laundry]);

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
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListEmptyComponent={renderEmptyLaundryList}
            data={currentOrder?.laundry ?? []}
            renderItem={renderLaundryItem}
            ListFooterComponent={() =>
              renderFooter(totalLaundryOrderAmount ?? 0)
            }
            scrollEnabled={false}
          />
        </View>

        <YStack mt={"$5"}>
          {/* item name */}
          <ControlledInput
            name="deposit"
            control={control}
            label="Deposit amount"
            placeholder="customer initial payment"
          />

          {/* payment amount */}
          <ControlledInput
            name="mode"
            control={control}
            label="Payment Mode"
            placeholder="i.e. Mpesa, Cash, etc."
          />
          <View h={"$0.5"} />

          <CButton
            // onPress={handleSubmit(onSubmit)}
            // onPress={onSubmit}
            // text={isPending ? "saving..." : "Save"}
            text="Save"
            mt="$4"
            letterSpacing={1}
            // disabled={isPending}
          />
        </YStack>
      </ScrollView>
    </Container>
  );
};

export default Pay;

const renderLaundryItem = ({ item }: { item: LaundryFormData }) => {
  return <LaundryItem item={item} hideActions />;
};
const renderFooter = (totalOrderAmount: number) => (
  <LaundryListFooter hideActions totalOrderAmount={totalOrderAmount} />
);
