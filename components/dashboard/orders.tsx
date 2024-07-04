import { Anchor, View, XStack } from "tamagui";
import { SectionTitle } from "components/common";
import { Orders } from "components/orders";

const RecentOrders = () => {
  return (
    <View my={"$2"}>
      <XStack justifyContent="space-between">
        <SectionTitle title="Recent Orders" />

        <Anchor
          href="/(app)/(tabs)/orders"
          fontSize={12}
          fontWeight={"500"}
          color={"$primary"}
        >
          View All
        </Anchor>
      </XStack>

      <Orders />
    </View>
  );
};

export default RecentOrders;
