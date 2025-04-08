import { ScrollView, Text, View } from "tamagui";

import { Container } from "components/common";
import {
  OrderHeader,
  OrderLaundry,
  OrderPayment,
  OrderStatus,
} from "components/view_order";
import useViewOrder from "hooks/useViewOrder";
import { ActivityIndicator, RefreshControl } from "react-native";
import { COLORS } from "constants/Colors";

const ViewOrder = () => {
  const { currentOrder, orderQuery } = useViewOrder();

  if (orderQuery.isLoading)
    return (
      <Container
        flex={1}
        bg={"$gray2Light"}
        justifyContent="center"
        alignItems="center"
      >
        <View mb={"$19"}>
          <ActivityIndicator color={COLORS.primary} size={45} />
          <Text
            fontWeight={600}
            mt={"$3"}
            fontSize={14}
            color={"$primary"}
            textAlign="center"
          >
            Fetching order details...
          </Text>
        </View>
      </Container>
    );

  return (
    <Container px={"$3"} py={"$3"}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={orderQuery.isFetching}
            onRefresh={orderQuery.refetch}
            colors={[COLORS.primary]} // Android spinner color
            tintColor={COLORS.primary} // iOS spinner color
          />
        }
      >
        {/* header */}
        <OrderHeader
          orderID={currentOrder?.orderNumber ?? ""}
          negotiatedAmount={currentOrder?.paymentAmount ?? 0}
          createdAt={currentOrder?.createdAt ?? ""}
          customerName={currentOrder?.customerName ?? ""}
          customerPhone={currentOrder?.customerPhone ?? ""}
          images={currentOrder?.images || []}
        />

        {/* order status/stages */}
        <OrderStatus />

        {/* order laundry */}
        <OrderLaundry />

        {/* order payment */}
        <OrderPayment />
      </ScrollView>
    </Container>
  );
};

export default ViewOrder;
