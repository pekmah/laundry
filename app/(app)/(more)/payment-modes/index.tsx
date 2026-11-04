import { CButton, Container, EmptyList } from "components/common";
import { Text, View } from "tamagui";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Alert, FlatList } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaymentType } from "types/payment";
import { deletePaymentMode, selectAllPaymentModes } from "lib/sqlite/paymentModes";
import PaymentItem from "components/payments/payment";

export const PAYMENT_QUERY_KEY = ["payment_modes"];

const Index = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const remove = useMutation({
    mutationFn: deletePaymentMode,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PAYMENT_QUERY_KEY }),
    onError: () => Alert.alert("Unable to delete", "The payment mode could not be deleted."),
  });

  const { data, isPending, refetch } = useQuery({
    queryKey: PAYMENT_QUERY_KEY,
    queryFn: selectAllPaymentModes,
  });

  const handleCreate = () => {
    router.push("/(app)/(more)/payment-modes/create");
  };

  return (
    <Container bg={"gray1Light"} px={"3"} py={"3"}>
      <FlatList
        refreshing={isPending}
        onRefresh={refetch}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={data || []}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }: { item: any }) => (
          <PaymentItem title={item?.name || ""}
            onEdit={() => router.push({ pathname: "/(app)/(more)/payment-modes/create", params: { id: String(item.id), name: item.name } })}
            onDelete={() => Alert.alert("Delete payment mode?", `Delete ${item.name}?`, [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", style: "destructive", onPress: () => remove.mutate(item.id) },
            ])} />
        )}
        scrollEnabled={false}
      />

      {/* Add pricing item button */}
      <CButton
        h={55}
        w={55}
        padding={"1"}
        position="absolute"
        bottom={20}
        right={20}
        onPress={handleCreate}
      >
        <MaterialIcons name="add" size={26} color="white" />
      </CButton>
    </Container>
  );
};

export default Index;

export const renderEmpty = () => <EmptyList />;
