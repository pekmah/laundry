import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import useOrders from "./useOrders";
import { useQuery } from "@tanstack/react-query";
import LogServices from "lib/services/LogServices";

const useViewOrder = () => {
  const params = useLocalSearchParams();
  const { orders, isPending: fetching } = useOrders();

  const orderOnPayment =
    typeof params?.order === "string" ? parseInt(params?.order, 10) : null;

  const currentOrder = useMemo(() => {
    if (orders && orderOnPayment)
      return orders.find((order) => order.id === orderOnPayment);
  }, [orders, params?.order]);

  const { data } = useQuery({
    queryKey: ["logs", params?.order],
    queryFn: () => LogServices.fetchByOrder(orderOnPayment ?? 0),
    enabled: !!orderOnPayment,
  });

  return { currentOrder, fetching };
};

export default useViewOrder;
