import { Anchor, View, XStack } from "tamagui";

import { SectionTitle } from "components/common";
import { Orders } from "components/orders";
import useOrders from "hooks/useOrders";
import { renderEmpty } from "app/(app)/(more)/payment-modes";

const RecentOrders = () => {
  const { orders, isPending, refetch } = useOrders();

  const recentOrders = orders?.slice(0, 5);

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

      <Orders
        refreshing={isPending}
        onRefresh={refetch}
        orders={recentOrders || []}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

export default RecentOrders;
