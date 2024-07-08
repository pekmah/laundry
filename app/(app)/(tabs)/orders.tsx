import { Container } from "components/common";
import useOrders from "hooks/useOrders";
import { Orders } from "components/orders";
import { renderEmpty } from "../(more)/payment-modes";

const orders = () => {
  const { isPending, orders, refetch } = useOrders();

  return (
    <Container p={"$3"} bg={"$gray2Light"}>
      <Orders
        refreshing={isPending}
        onRefresh={refetch}
        orders={orders || []}
        ListEmptyComponent={renderEmpty}
      />
    </Container>
  );
};

export default orders;
