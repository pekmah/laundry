import { BluetoothEscposPrinter } from "@brooons/react-native-bluetooth-escpos-printer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ORDER_STAGES } from "constants/order";
import { useRouter } from "expo-router";
import LogServices from "lib/services/LogServices";
import OrderServices from "lib/services/OrderServices";
import { uploadImage } from "lib/storage/cloudinary";
import { useLaundryStore } from "lib/storage/useLaundryStorage";
import { LaundryOrderSchema } from "lib/types/laundry";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { LaundryOrderFormData } from "types/laundry";
import { handlePrintReceipt } from "utils/print";
import { updateQueryData } from "utils/query";

const useCreateOrder = () => {
  const toast = useToastController();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset, watch, setValue } =
    useForm<LaundryOrderFormData>({
      resolver: zodResolver(LaundryOrderSchema),
    });
  const [images, setImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<object[]>([]);

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
    console.log("ERROR: ", JSON.stringify(error));
    toast.show("Error creating order.", {
      message: error.message,
      type: "error",
    });
  };

  const uploadImages = async (imgs: string[]) => {
    const uploadPromises = imgs.map((image, index) => {
      const toastId = `upload-image-${index + 1}`;

      // Show initial uploading toast
      toast.show("Uploading Image", {
        id: toastId,
        message: `Uploading image ${index + 1} of ${imgs.length}...`,
        type: "info",
      });

      return uploadImage(image)
        .then((response) => {
          // Update toast to success
          toast.show("Success", {
            id: toastId, // Same toast ID to update it
            message: `Image ${index + 1} uploaded successfully.`,
            type: "success",
          });

          return {
            publicId: response.public_id,
            url: response.secure_url,
          };
        })
        .catch((error) => {
          // Update toast to error
          toast.show("Error", {
            id: toastId,
            message: `Failed to upload image ${index + 1}.`,
            type: "error",
          });
          return { error, index }; // Return error instead of stopping execution
        });
    });

    const results = await Promise.allSettled(uploadPromises);

    // Filter out successfully uploaded images
    const uploadedResponses = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<object>).value);

    setUploadedImages(uploadedResponses);

    return uploadedResponses;
  };

  const uploadImageMutation = useMutation({
    mutationKey: ["upload_image"],
    mutationFn: async () => await uploadImages(images),

    onError: (error) => {
      console.log("ERROR: ", JSON.stringify(error, null, 2));
      toast.show("Error uploading image.", {
        message: error.message,
        type: "error",
      });
    },
  });

  const handleCreateOrder = async (newOrder) => {
    const uploadedImages = await uploadImageMutation.mutateAsync();

    return await OrderServices.create({
      ...newOrder,
      images: uploadedImages,
    });
  };

  const { mutate: createOrder, isPending } = useMutation({
    mutationKey: ["create_order"],
    mutationFn: handleCreateOrder,
    // mutationFn: OrderServices.create,
    onSuccess: handleSuccess,
    onSettled: () => {
      console.log("Uploaded image::", uploadedImages);
    },
    onError: handleError,
  });

  const onSubmit = (payload: LaundryOrderFormData) => {
    return handlePrintReceipt(payload, laundry, totalLaundryAmount);
    const newOrder = {
      customerName: payload.customer_name,
      customerPhone: payload.customer_phone,
      totalAmount: totalLaundryAmount,
      paymentAmount: Number(payload.negotiated_amount),
      laundryItems: laundry.map((item) => ({
        laundryCategoryId: Number(item.id),
        quantity: Number(item.quantity),
      })),
    };

    createOrder(newOrder);
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
    images,

    uploadImageMutation,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    handleAddLaundry,
    handlePay,
    onSubmit,
    resetLaundryStore,
    setImages,
  };
};

export default useCreateOrder;
