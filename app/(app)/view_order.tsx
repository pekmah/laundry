import { ScrollView } from "tamagui";

import { Container } from "components/common";
import useViewOrder from "hooks/useViewOrder";
import {
  OrderHeader,
  OrderLaundry,
  OrderPayment,
  OrderStatus,
} from "components/view_order";

const ViewOrder = () => {
  const { currentOrder } = useViewOrder();

  return (
    <Container px={"$3"} py={"$3"}>
      <ScrollView>
        {/* header */}
        <OrderHeader
          orderID={currentOrder?.code ?? ""}
          negotiatedAmount={currentOrder?.negotiated_amount ?? 0}
          createdAt={currentOrder?.createdAt ?? ""}
          customerName={currentOrder?.customer_name ?? ""}
          customerPhone={currentOrder?.customer_phone ?? ""}
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
