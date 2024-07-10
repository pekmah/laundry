import { Stack, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";

import useOrders from "hooks/useOrders";
import { renderEmpty } from "../(more)/payment-modes";
import { CButton, Container } from "components/common";
import { Orders } from "components/orders";

const orders = () => {
  const { isPending, orders, refetch } = useOrders();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
        }}
      />
      <Container p={"$3"} bg={"$gray2Light"}>
        <Orders
          refreshing={isPending}
          onRefresh={refetch}
          orders={orders || []}
          ListEmptyComponent={renderEmpty}
        />
      </Container>
    </>
  );
};

export default orders;

const renderHeaderRight = (props) => <HeaderRight {...props} />;

const HeaderRight = () => {
  const router = useRouter();
  const handleAddOrder = () => {
    router.push("create_order");
  };
  return (
    <CButton
      p={"$2"}
      h={40}
      w={40}
      bg={"$colorTransparent"}
      mr={"$3"}
      onPress={handleAddOrder}
    >
      <Entypo name="plus" size={25} color={"black"} />
    </CButton>
  );
};
