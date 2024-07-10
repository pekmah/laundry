import { zodResolver } from "@hookform/resolvers/zod";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ORDER_STAGES } from "constants/order";
import { useRouter } from "expo-router";
import LogServices from "lib/services/LogServices";
import OrderServices from "lib/services/OrderServices";
import { useLaundryStore } from "lib/storage/useLaundryStorage";
import { LaundryOrderSchema } from "lib/types/laundry";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { LaundryOrderFormData } from "types/laundry";
import { updateQueryData } from "utils/query";

const useCreateOrder = () => {
  const toast = useToastController();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset, watch, setValue } =
    useForm<LaundryOrderFormData>({
      resolver: zodResolver(LaundryOrderSchema),
    });

  const { laundry, reset: resetLaundryStore } = useLaundryStore();

  const totalLaundryAmount = useMemo(() => {
    return laundry.reduce((acc, item) => acc + (item?.price ?? 0), 0);
  }, [laundry]);

  const handleAddLaundry = () => {
    router.push("/(app)/add_laundry");
  };
  const handlePay = (id: number = 3) => {
    router.push({
      pathname: "/(app)/pay_order",
      params: { order: id },
    });
  };

  const handleSuccess = (response) => {
    // append the created order to current list of orders
    updateQueryData(["orders"], queryClient, response);
    reset();
    resetLaundryStore();
    toast.show("Success", {
      message: `Order created successfully`,
      type: "success",
    });
    // navigate to payment page
    handlePay(response?.id);
    // create log

    LogServices.create({
      order: response.id,
      stage: ORDER_STAGES[1],
      description: "Order Created",
    });
  };

  const handleError = (error) => {
    // console.log("ERROR: ", JSON.stringify(error));
    toast.show("Error creating order.", {
      message: error.message,
      type: "error",
    });
  };

  const { mutate: createOrder, isPending } = useMutation({
    mutationKey: ["create_order"],
    mutationFn: OrderServices.create,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onSubmit = (payload: LaundryOrderFormData) => {
    const dateCode = moment().format("DDMMHHmmss");
    const orderCode = `#LDR${dateCode}`;
    console.log("Payload", payload);
    createOrder({
      ...payload,
      amount: totalLaundryAmount,
      laundry,
      code: orderCode,
      negotiated_amount: payload.negotiated_amount,
    });
  };

  //   update the value of the negotiated amount to the total laundry amount
  useEffect(() => {
    setValue("negotiated_amount", totalLaundryAmount.toString());

    return () => {
      setValue("negotiated_amount", "");
    };
  }, [totalLaundryAmount]);

  return {
    control,
    isPending,
    laundry,
    totalLaundryAmount,

    handleSubmit: handleSubmit(onSubmit),
    reset,
    handleAddLaundry,
    handlePay,
    onSubmit,
    resetLaundryStore,
  };
};

export default useCreateOrder;
