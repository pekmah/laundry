import { CButton, Container } from "components/common";
import {
  Avatar,
  ScrollView,
  Text,
  useTheme,
  View,
  XStack,
  YStack,
} from "tamagui";
import { ControlledInput } from "components/common/input";
import { useForm } from "react-hook-form";
import { FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLaundryStore } from "lib/storage/useLaundryStorage";
import { LaundryFormData } from "types/laundry";
import {
  EmptyLaundryList,
  LaundryItem,
  LaundryListFooter,
} from "components/create_order";

const create_order = () => {
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm({});
  const { laundry } = useLaundryStore();

  const handleAddLaundry = () => {
    router.push("/(app)/add_laundry");
  };

  return (
    <Container py={"$3"}>
      <ScrollView>
        <YStack>
          {/* item name */}
          <ControlledInput
            name="customerName"
            control={control}
            label="Customer Name"
            placeholder="name of customer"
          />

          {/* payment amount */}
          <ControlledInput
            name="customerPhone"
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
                ListEmptyComponent={renderEmpty}
                data={laundry ?? []}
                renderItem={renderLaundryItem}
                ListFooterComponent={renderFooter}
                scrollEnabled={false}
              />
            </View>
          </View>

          <ControlledInput
            name="amount"
            control={control}
            label="Amount"
            placeholder="Enter amount to be paid by customer"
            keyboardType="numeric"
          />

          <CButton
            // onPress={handleSubmit(onSubmit)}
            // text={isLoading ? "saving..." : isUpdating ? "Update" : "Save"}
            text={"Save"}
            mt="$4"
            letterSpacing={1}
            // disabled={isLoading || (isUpdating && !hasDataChanged)}
          />
        </YStack>
      </ScrollView>
    </Container>
  );
};

export default create_order;

const renderEmpty = () => <EmptyLaundryList />;
const renderFooter = () => <LaundryListFooter />;

const renderLaundryItem = ({ item }: { item: LaundryFormData }) => {
  return <LaundryItem item={item} />;
};
