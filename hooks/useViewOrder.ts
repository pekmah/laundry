import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import useOrders from "./useOrders";
import { useQuery } from "@tanstack/react-query";
import LogServices from "lib/services/LogServices";

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
    if (!currentOrder?.payments?.data || !currentOrder?.payments?.data?.length)
      return 0;

    return currentOrder.payments.data.reduce(
      (acc, item) => acc + (parseInt(item?.amount, 10) ?? 0),
      0
    );
  }, [currentOrder?.laundry]);

  const { data: logs } = useQuery({
    queryKey: ["logs", params?.order],
    queryFn: () => LogServices.fetchByOrder(orderOnPayment ?? 0),
    enabled: !!orderOnPayment,
  });

  const handlePay = () => {
    router.push({
      pathname: "/(app)/pay_order",
      params: { order: currentOrder?.id, mode: "clear" },
    });
  };

  return { currentOrder, fetching, logs, totalPaymentMade, handlePay };
};

export default useViewOrder;
