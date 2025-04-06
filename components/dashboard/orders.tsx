import { Text, View, XStack } from "tamagui";
import React from "react";

import { renderEmpty } from "app/(app)/(more)/payment-modes";
import { SectionTitle } from "components/common";
import { Orders } from "components/orders";
import { Link } from "expo-router";
import useOrders from "hooks/useOrders";
import { TouchableOpacity } from "react-native";

const RecentOrders = () => {
  const { orders, isPending, refetch } = useOrders();

  const recentOrders = orders?.slice(0, 5);

  return (
    <View my={"$2"}>
      <XStack justifyContent="space-between">
        <SectionTitle title="Recent Orders" />

        <Link href={"/(tabs)/orders"} asChild>
          <TouchableOpacity>
            <Text fontSize={12} fontWeight={"500"} color={"$primary"} disabled>
              View All
            </Text>
          </TouchableOpacity>
        </Link>
      </XStack>

      <Orders
        refreshing={isPending}
        onRefresh={refetch}
        orders={recentOrders || []}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys for each item
      />
    </View>
  );
};

export default RecentOrders;
