import { CButton, Container, EmptyList } from "components/common";
import { Text, View } from "tamagui";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { PaymentType } from "types/payment";
import { selectAllPaymentModes } from "lib/sqlite/paymentModes";
import PaymentItem from "components/payments/payment";

export const PAYMENT_QUERY_KEY = ["payment_modes"];

const Index = () => {
  const router = useRouter();

  const { data, isPending, refetch } = useQuery({
    queryKey: PAYMENT_QUERY_KEY,
    queryFn: selectAllPaymentModes,
  });

  const handleCreate = () => {
    router.push("payment-modes/create");
  };

  return (
    <Container bg={"$gray1Light"} px={"$3"} py={"$3"}>
      <FlatList
        refreshing={isPending}
        onRefresh={refetch}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={data || []}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }: { item: any }) => (
          <PaymentItem title={item?.name || ""} />
        )}
        scrollEnabled={false}
      />

      {/* Add pricing item button */}
      <CButton
        h={55}
        w={55}
        padding={"$1"}
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
