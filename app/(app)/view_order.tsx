import { Text } from "tamagui";
import { Container } from "components/common";
import useViewOrder from "hooks/useViewOrder";

const ViewOrder = () => {
  const { currentOrder } = useViewOrder();

  return (
    <Container py={"$3"}>
      <Text
        letterSpacing={0.5}
        fontWeight={"700"}
        fontSize={18}
        color={"$gray7Dark"}
      >
        Order {currentOrder?.code}
      </Text>
    </Container>
  );
};

export default ViewOrder;
// Compare this snippet from app/%28app%29/%28more%29/payment-modes.tsx:
/*
  log table
  id: 1,
  description: "Order Created",
  stage: stage,
  order_id: order_id,
  timestamp;
*/
