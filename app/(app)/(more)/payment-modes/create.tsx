import { useLocalSearchParams, useRouter } from "expo-router";
import { YStack, ScrollView } from "tamagui";
import { useForm } from "react-hook-form";

import { CButton, Container } from "components/common";
import { ControlledInput } from "components/common/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToastController } from "lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PaymentFormData } from "types/payment";

import { insertPaymentMode, updatePaymentMode } from "lib/sqlite/paymentModes";
import { PAYMENT_QUERY_KEY } from ".";
import { PaymentSchema } from "lib/types/payment";

const Create = () => {
  const toast = useToastController();
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; name?: string }>();
  const isUpdating = !!params.id;

  const { control, handleSubmit } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: { name: params.name || "" },
  });

  const handleSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: PAYMENT_QUERY_KEY });
    toast.show("Success", {
      message: `Payment mode ${message} successfully`,
      type: "success",
    });

    router.back();
  };

  const handleError = (error) => {
    toast.show("Error saving payment mode", {
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
    mutationFn: (data: PaymentFormData) => updatePaymentMode(Number(params.id), data.name.trim()),
    onSuccess: () => handleSuccess("updated"),
    onError: handleError,
  });

  const onSubmit = (data: PaymentFormData) => {
    if (isUpdating) update(data);
    else mutate(data.name.trim());
  };

  const isLoading = isPending || updatePending;

  return (
    <>
      <Container py={"3"}>
        <ScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <YStack mt="1">
            {/* item name */}
            <ControlledInput
              name="name"
              control={control}
              label="Payment Mode"
              placeholder="name of payment mode i.e. cash, mpesa"
            />

            <CButton
              onPress={() => { void handleSubmit(onSubmit)(); }}
              text={isLoading ? "saving..." : isUpdating ? "Update" : "Save"}
              mt="4"
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
