import { CButton, Container } from "components/common";
import { ScrollView, Text, View, XStack, YStack } from "tamagui";
import { ControlledInput } from "components/common/input";
import { useForm } from "react-hook-form";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLaundryStore } from "lib/storage/useLaundryStorage";
import { LaundryFormData, LaundryOrderFormData } from "types/laundry";
import { EmptyLaundryList, LaundryItem } from "components/create_order";
import { zodResolver } from "@hookform/resolvers/zod";
import { LaundryOrderSchema } from "lib/types/laundry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrderServices from "lib/services/OrderServices";
import { useToastController } from "@tamagui/toast";
import { updateQueryData } from "utils/query";

const create_order = () => {
  const toast = useToastController();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<LaundryOrderFormData>({
    resolver: zodResolver(LaundryOrderSchema),
  });
  const { laundry, reset: resetLaundryStore } = useLaundryStore();

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
    return handlePay();
    const totalLaundryAmount = laundry.reduce(
      (acc, item) => acc + (item?.price ?? 0),
      0
    );

    createOrder({ ...payload, amount: totalLaundryAmount, laundry });
  };

  return (
    <Container py={"$3"}>
      <ScrollView>
        <YStack>
          {/* item name */}
          <ControlledInput
            name="customer_name"
            control={control}
            label="Customer Name"
            placeholder="name of customer"
          />

          {/* payment amount */}
          <ControlledInput
            name="customer_phone"
            control={control}
            label="Customer Phone"
            placeholder="07XX XXXXXX"
            keyboardType="numeric"
          />
          <View h={"$0.5"} />

          <View>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontWeight={"600"} fontSize={14} color={"black"}>
                Laundry Items
              </Text>

              <CButton
                onPress={handleAddLaundry}
                borderRadius={"$4"}
                p={"$1"}
                h={30}
                w={30}
              >
                <Feather name="plus" size={20} color={"white"} />
              </CButton>
            </XStack>
            <View px={"$2"} py={"$3"}>
              <FlatList
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListEmptyComponent={renderEmptyLaundryList}
                data={laundry ?? []}
                renderItem={renderLaundryItem}
                // ListFooterComponent={renderFooter}
                scrollEnabled={false}
              />
            </View>
          </View>

          <CButton
            // onPress={handleSubmit(onSubmit)}
            onPress={onSubmit}
            text={isPending ? "saving..." : "Save"}
            mt="$4"
            letterSpacing={1}
            disabled={isPending}
          />
        </YStack>
      </ScrollView>
    </Container>
  );
};

export default create_order;

export const renderEmptyLaundryList = () => <EmptyLaundryList />;

const renderLaundryItem = ({ item }: { item: LaundryFormData }) => {
  return <LaundryItem item={item} />;
};
