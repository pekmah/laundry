import { ScrollView, Text, View, XStack, YStack } from "tamagui";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

import { LaundryFormData } from "types/laundry";
import { CButton, Container } from "components/common";
import {
  EmptyLaundryList,
  LaundryItem,
  LaundryListFooter,
} from "components/create_order";
import { ControlledInput } from "components/common/input";
import useCreateOrder from "hooks/useCreateOrder";

const create_order = () => {
  const {
    control,
    totalLaundryAmount,
    laundry,
    isPending,
    handleAddLaundry,
    handleSubmit,
  } = useCreateOrder();

  return (
    <Container py={"$3"}>
      <ScrollView>
        <YStack>
          {/* item name */}
          <ControlledInput
            name="customer_name"
            control={control}
            label="Customer Name"
            placeholder="name of customer"
          />

          {/* payment amount */}
          <ControlledInput
            name="customer_phone"
            control={control}
            label="Customer Phone"
            placeholder="07XX XXXXXX"
            keyboardType="numeric"
          />
          <View h={"$0.5"} />

          <View>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontWeight={"600"} fontSize={14} color={"black"}>
                Laundry Items
              </Text>

              <CButton
                onPress={handleAddLaundry}
                borderRadius={"$4"}
                p={"$1"}
                h={30}
                w={30}
              >
                <Feather name="plus" size={20} color={"white"} />
              </CButton>
            </XStack>
            <View px={"$2"} py={"$3"}>
              <FlatList
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListEmptyComponent={renderEmptyLaundryList}
                data={laundry ?? []}
                renderItem={renderLaundryItem}
                ListFooterComponent={() =>
                  renderLaundryFooter(totalLaundryAmount ?? 0)
                }
                scrollEnabled={false}
              />
            </View>
          </View>

          {/* payment amount */}
          <ControlledInput
            mt="$2"
            name="negotiated_amount"
            control={control}
            label="Revised Amount"
            desc="Amount customer will pay after negotiation"
            placeholder=""
            keyboardType="numeric"
          />

          <CButton
            onPress={handleSubmit}
            text={isPending ? "saving..." : "Save"}
            mt="$4"
            letterSpacing={1}
            disabled={isPending}
          />
        </YStack>
      </ScrollView>
    </Container>
  );
};

export default create_order;

export const renderEmptyLaundryList = () => <EmptyLaundryList />;

const renderLaundryItem = ({ item }: { item: LaundryFormData }) => {
  return <LaundryItem item={item} />;
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
