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
import { PRICING_QUERY_KEY } from ".";
import PricingServices from "lib/services/PricingServices";
import { updateQueryData } from "utils/query";
import { usePricingStore } from "lib/storage/usePricingStore";
import { useMemo } from "react";

const pricing = () => {
  const toast = useToastController();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pricing, reset } = usePricingStore();

  const { control, handleSubmit, watch } = useForm<PricingFormData>({
    resolver: zodResolver(PricingSchema),
    defaultValues: {
      name: pricing?.name || "",
      amount: pricing?.amount?.toString() || 0,
      unit: pricing?.unit || "",
    },
  });

  const isUpdating = useMemo(() => !!pricing?.id, [pricing]);
  const currentName = watch("name");
  const currentAmount = watch("amount");
  const currentUnit = watch("unit");

  const hasDataChanged = useMemo(() => {
    return (
      pricing?.name !== currentName ||
      pricing?.amount?.toString() !== currentAmount ||
      pricing?.unit !== currentUnit
    );
  }, [pricing, currentName, currentAmount, currentUnit]);

  const handleSuccess = (response: PricingType, message: string) => {
    updateQueryData(PRICING_QUERY_KEY, queryClient, response);

    toast.show("Success", {
      message: `Pricing item ${message} successfully`,
      type: "success",
    });
    reset();
    router.back();
  };

  const handleError = (error) => {
    toast.show("Error adding pricing", {
      message: error.message,
      type: "error",
    });
  };

  const { mutate, isPending } = useMutation({
    mutationKey: PRICING_QUERY_KEY,
    mutationFn: PricingServices.create,
    onSuccess: (res) => handleSuccess(res, "created"),
    onError: handleError,
  });

  const { mutate: update, isPending: updatePending } = useMutation({
    mutationKey: PRICING_QUERY_KEY,
    mutationFn: PricingServices.update,
    onSuccess: (res) => handleSuccess(res, "updated"),
    onError: handleError,
  });

  const onSubmit = (data: PricingFormData) => {
    const amount = data.amount.toString();

    if (isUpdating && pricing?.id) {
      update({
        id: pricing?.id,
        payload: { ...data, amount: parseInt(amount, 10) },
      });
    } else mutate({ ...data, amount: parseInt(amount, 10) });
  };

  const isLoading = isPending || updatePending;

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
        }}
      />

      <Container py={"$3"}>
        <ScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
        >
          <View
            backgroundColor={"$gray8Light"}
            height={150}
            width={"100%"}
            borderRadius={"$6"}
            alignItems="center"
            justifyContent="center"
          >
            <FontAwesome5 name={"images"} size={35} color={"white"} />
            <Text
              fontWeight={"500"}
              fontSize={12}
              position="absolute"
              bottom={10}
              color={"white"}
            >
              Upload your pricing item image
            </Text>
          </View>

          <YStack mt={"$4"}>
            {/* item name */}
            <ControlledInput
              name="name"
              control={control}
              label="Product Name"
              placeholder="name of laundry item i.e. shirt, trousers"
            />

            {/* payment amount */}
            <ControlledInput
              name="amount"
              control={control}
              label="Amount"
              placeholder="price of item"
              keyboardType="numeric"
            />
            {/* payment amount */}
            <ControlledInput
              name="unit"
              control={control}
              label="Unit"
              placeholder="unit of item i.e. kg, piece"
            />
            <CButton
              onPress={handleSubmit(onSubmit)}
              text={isLoading ? "saving..." : isUpdating ? "Update" : "Save"}
              mt="$4"
              letterSpacing={1}
              disabled={isLoading || (isUpdating && !hasDataChanged)}
            />
          </YStack>
        </ScrollView>
      </Container>
    </>
  );
};

export default pricing;

const renderHeaderRight = () => {
  return <Text>pricing</Text>;
};
