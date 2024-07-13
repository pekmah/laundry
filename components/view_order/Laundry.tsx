import { renderEmptyLaundryList } from "app/(app)/(tabs)/create_order";
import { LaundryItem, LaundryListFooter } from "components/create_order";
import useViewOrder from "hooks/useViewOrder";
import { FlatList } from "react-native";
import { View, Text } from "tamagui";
import { LaundryFormData } from "types/laundry";

const Laundry = () => {
  const { currentOrder } = useViewOrder();

  return (
    <View
      bg={"white"}
      px={"$2"}
      py={"$3"}
      borderColor={"$gray5Light"}
      borderWidth={1}
      borderRadius={"$5"}
    >
      <View
        py={"$2"}
        px={"$3"}
        borderBottomWidth={1}
        borderBottomColor={"$gray6Light"}
      >
        <Text
          lineHeight={22}
          fontWeight={"700"}
          fontSize={15}
          color={"$gray7Dark"}
          mr={"auto"}
        >
          Order Laundry Items
        </Text>
      </View>

      <View p={"$3"}>
        <FlatList
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={renderEmptyLaundryList}
          data={currentOrder?.laundry ?? []}
          renderItem={renderLaundryItem}
          ListFooterComponent={() =>
            renderLaundryFooter(currentOrder?.amount ?? 0)
          }
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default Laundry;

const renderLaundryItem = ({ item }: { item: LaundryFormData }) => {
  return <LaundryItem item={item} hideActions />;
};
const renderLaundryFooter = (totalOrderAmount: number) => (
  <LaundryListFooter
    hideActions
    totalOrderAmount={totalOrderAmount}
    negotiated_amount={0}
  />
);
