import { Stack, useRouter } from "expo-router";
import { View, Text, YStack, ScrollView } from "tamagui";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useForm } from "react-hook-form";

import { CButton, Container } from "components/common";
import { ControlledInput } from "components/common/input";
import { PricingFormData, PricingType } from "types/pricing";
import { zodResolver } from "@hookform/resolvers/zod";
import { PricingSchema } from "lib/types/pricing";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import PricingServices from "lib/services/PricingServices";
import { updateQueryData } from "utils/query";
import { usePricingStore } from "lib/storage/usePricingStore";
import { useMemo } from "react";
import { PaymentFormData } from "types/payment";

import { insertPaymentMode } from "lib/sqlite/paymentModes";
import { PAYMENT_QUERY_KEY } from ".";
import { PaymentSchema } from "lib/types/payment";

const Create = () => {
  const toast = useToastController();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentSchema),
  });

  //   const isUpdating = useMemo(() => !!pricing?.id, [pricing]);
  //   const currentName = watch("name");

  //   const hasDataChanged = useMemo(() => {
  //     return pricing?.name !== currentName;
  //   }, [pricing, currentName]);

  const handleSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: PAYMENT_QUERY_KEY });
    toast.show("Success", {
      message: `Pricing item ${message} successfully`,
      type: "success",
    });

    router.back();
  };

  const handleError = (error) => {
    toast.show("Error adding pricing", {
      message: error.message,
      type: "error",
    });
  };

  const { mutate, isPending } = useMutation({
    mutationKey: PAYMENT_QUERY_KEY,
    mutationFn: insertPaymentMode,
    onSuccess: () => handleSuccess("created"),
    onError: handleError,
  });

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationKey: PAYMENT_QUERY_KEY,
    mutationFn: PricingServices.update,
    onSuccess: () => handleSuccess("updated"),
    onError: handleError,
  });

  const onSubmit = (data: PaymentFormData) => {
    // if (isUpdating && pricing?.id) {
    //   update({
    //     id: pricing?.id,
    //     payload: { ...data, amount: parseInt(amount, 10) },
    //   });
    // } else

    mutate(data.name);
  };

  const isLoading = isPending || updatePending;

  return (
    <>
      <Container py={"$3"}>
        <ScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <YStack mt={"$1"}>
            {/* item name */}
            <ControlledInput
              name="name"
              control={control}
              label="Payment Mode"
              placeholder="name of payment mode i.e. cash, mpesa"
            />

            <CButton
              onPress={handleSubmit(onSubmit)}
              text={isLoading ? "saving..." : "Save"}
              mt="$4"
              letterSpacing={1}
              disabled={isLoading}
            />
          </YStack>
        </ScrollView>
      </Container>
    </>
  );
};

export default Create;

const renderHeaderRight = () => {
  return <Text>pricing</Text>;
};
