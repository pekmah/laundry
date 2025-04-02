import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import useOrders from "./useOrders";

const useViewOrder = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { orders, isPending: fetching } = useOrders();

  const orderOnPayment =
    typeof params?.order === "string" ? parseInt(params?.order, 10) : null;

  const currentOrder = useMemo(() => {
    if (orders && orderOnPayment)
      return orders.find((order) => order.id === orderOnPayment);
  }, [orders, params?.order]);

  const totalPaymentMade = useMemo(() => {
    if (!currentOrder?.payments || !currentOrder?.payments?.length) return 0;

    return currentOrder.payments.reduce(
      (acc, item) => acc + (item?.amount ?? 0),
      0
    );
  }, [currentOrder]);

  const handlePay = () => {
    router.push({
      pathname: "/(app)/pay_order",
      params: { order: currentOrder?.id, mode: "clear" },
    });
  };

  return {
    currentOrder,
    fetching,
    logs: currentOrder?.logs,
    totalPaymentMade,
    handlePay,
  };
};

export default useViewOrder;
