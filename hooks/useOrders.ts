import { useQuery } from "@tanstack/react-query";
import OrderServices from "lib/services/OrderServices";

const useOrders = () => {
  const {
    data: orders,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: OrderServices.fetchAll,
  });

  return { orders, refetch, isPending };
};

export default useOrders;
