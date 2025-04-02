import { ScrollView } from "tamagui";

import { Container } from "components/common";
import {
  OrderHeader,
  OrderLaundry,
  OrderPayment,
  OrderStatus,
} from "components/view_order";
import useViewOrder from "hooks/useViewOrder";

const ViewOrder = () => {
  const { currentOrder } = useViewOrder();

  return (
    <Container px={"$3"} py={"$3"}>
      <ScrollView>


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
