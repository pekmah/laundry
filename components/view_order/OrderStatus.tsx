import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { CButton, ConfirmDialogue } from "components/common";
import { EmptyLaundryList } from "components/create_order";
import { ORDER_STAGES } from "constants/order";
import useViewOrder from "hooks/useViewOrder";
import OrderServices from "lib/services/OrderServices";
import { useMemo } from "react";
import { Text, View, XStack, YStack } from "tamagui";
import { ILaundryOrder } from "types/laundry";
import LogItem from "./LogItem";
import { useToastController } from "lib/toast";
import { getErrorMessage } from "utils";

const OrderStatus = () => {
  const { logs, orderQuery } = useViewOrder();
  const toast = useToastController();

  const currentOrder = orderQuery.data as unknown as ILaundryOrder;
  const outstandingBalance = Math.max(0, (currentOrder?.paymentAmount ?? 0) -
    (currentOrder?.payments?.reduce((sum, item) => sum + (item.amount ?? 0), 0) ?? 0));
  const collectionBlocked = currentOrder?.status === "completed" && outstandingBalance > 0;

  const updateStatusMutation = useMutation({
    mutationFn: async () => {
      currentOrder?.status === "processing" || currentOrder?.status === "created"
        ? await OrderServices.updateStatus(
            currentOrder.orderNumber,
            "completed"
          )
        : currentOrder?.status === "completed"
        ? await OrderServices.updateStatus(
            currentOrder.orderNumber,
            "collected"
          )
        : null;
    },
    onSuccess: () => {
      orderQuery.refetch();
      toast.show("Update successful!", {
        type: "success",
        message: "Order status updated successfully.",
      });
    },
    onError: (error) => {
      toast.show("Status update error", {
        message: getErrorMessage(error, "Error updating order status. "),
        type: "error",
      });
    },
  });

  const updateAction = useMemo(
    () => ({
      title:
        currentOrder?.status === "processing" || currentOrder?.status === "created"
          ? "Complete Order"
          : currentOrder?.status === "completed"
          ? "Collect Order"
          : null,
      action: updateStatusMutation.mutate,
    }),
    [currentOrder?.status]
  );

  return (
    <View
      bg={"white"}
      px="2"
      py="3"
      borderColor="gray5Light"
      borderWidth={1}
      borderRadius="5"
      mb="3"
    >
      <View
        py="2"
        px="3"
        borderBottomWidth={1}
        borderBottomColor="gray6Light"
      >
        <Text
          letterSpacing={0.5}
          fontWeight={"700"}
          fontSize={15}
          color="gray7Dark"
          mr={"auto"}
        >
          Order Status
        </Text>
      </View>

      {!currentOrder?.logs?.length ? (
        <View py="4">
          <EmptyLaundryList />
        </View>
      ) : (
        <View mt="2">
          <XStack>
            {currentOrder?.logs?.length ? (
              <View flexDirection="row" justifyContent="center" w="3">
                <View backgroundColor="primary" w={2} my="3" />
              </View>
            ) : null}
            <YStack gap="3">
              {currentOrder?.logs?.map((log) => (
                <LogItem
                  key={log.id}
                  title={log.stage}
                  desc={log.description}
                  time={log.createdAt}
                  isLast={log.stage === ORDER_STAGES[4]}
                />
              ))}
            </YStack>
          </XStack>
        </View>
      )}

      {updateAction?.title ? (
        <ConfirmDialogue
          title="Confirm Status Update"
          body={
            currentOrder?.status === "processing" || currentOrder?.status === "created"
              ? "Do you want to complete this order?"
              : currentOrder?.status === "completed"
              ? "Do you want to collect this order?"
              : ""
          }
          handleAccept={() => updateStatusMutation.mutate()}
        >
          <CButton
            disabled={updateStatusMutation.isPending || collectionBlocked}
            mx={"3"}
            borderRadius={"5"}
            fontSize={12}
            mt={"3"}
          >
            <MaterialCommunityIcons name="update" size={18} color="white" />
            <Text fontSize={13} color="white1" fontWeight={"600"}>
              {updateStatusMutation?.isPending
                ? "Updating..."
                : updateAction.title}
            </Text>
          </CButton>
        </ConfirmDialogue>
      ) : null}
      {collectionBlocked ? <Text mx="3" mt="2" fontSize={12} color="gray11Light">Clear the outstanding balance before collection.</Text> : null}
    </View>
  );
};

export default OrderStatus;
