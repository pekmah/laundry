import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { ScrollView, Text, View, XStack, YStack } from "tamagui";

import { CButton, Container } from "components/common";
import { ControlledInput } from "components/common/input";
import {
  EmptyLaundryList,
  LaundryItem,
  LaundryListFooter,
} from "components/create_order";
import PickImage from "components/modals/pick-image";
import useCreateOrder from "hooks/useCreateOrder";
import { LaundryFormData } from "types/laundry";

const create_order = () => {
  const {
    control,
    totalLaundryAmount,
    laundry,
    isPending,
    handleAddLaundry,
    handleSubmit,
    setImages,
    images, uploadImageMutation
  } = useCreateOrder();

  return (
    <Container py={0}>
      <ScrollView
        contentContainerStyle={{ py: "$3" }}
        showsVerticalScrollIndicator={false}
      >
        <YStack>
          {/* upload images section */}
          <View>
            <Text fontWeight={"500"} fontSize={14} color={"black"}>
              Upload Image
            </Text>

            <XStack paddingVertical={"$1"} paddingHorizontal={"$2"}>
              <PickImage images={images} setState={setImages} />
            </XStack>
          </View>

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
            text={uploadImageMutation?.isPending ? "Uploading images..." : (isPending) ? "saving..." : "Save"}
            mt="$4"
            letterSpacing={1}
            disabled={uploadImageMutation?.isPending || isPending}
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
