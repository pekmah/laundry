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
import { flattenAttributes } from "utils/strapi";

const pricing = () => {
  const toast = useToastController();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { control, handleSubmit } = useForm<PricingFormData>({
    resolver: zodResolver(PricingSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: PRICING_QUERY_KEY,
    mutationFn: PricingServices.create,
    onSuccess: (response) => {
      const createdPricing: PricingType = flattenAttributes(response);

      updateQueryData(PRICING_QUERY_KEY, queryClient, createdPricing);

      toast.show("Success", {
        message: "Pricing item created successfully",
        type: "success",
      });
      router.back();
    },
    onError: (error) => {
      toast.show("Error adding pricing", {
        message: error.message,
        type: "error",
      });
    },
  });

  const onSubmit = (data: PricingFormData) => {
    mutate(data);
  };

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
              handleChange={(val, onChange) => onChange(parseInt(val, 10))}
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
              text={isPending ? "saving..." : "Save"}
              mt="$4"
              letterSpacing={1}
              disabled={isPending}
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
