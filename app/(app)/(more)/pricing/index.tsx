import { CButton, Container } from "components/common";
import { PriceItem } from "components/more/pricing";
import { Avatar, View } from "tamagui";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { flattenAttributes } from "utils/strapi";
import { useQuery } from "@tanstack/react-query";
import PricingServices from "lib/services/PricingServices";
import { FlatList } from "react-native";
import { PricingType } from "types/pricing";
import { usePricingStore } from "lib/storage/usePricingStore";

export const PRICING_QUERY_KEY = ["pricing"];

const index = () => {
  const router = useRouter();
  const { editPricing } = usePricingStore();

  const handleCreate = () => {
    router.push("pricing/create");
  };

  const { data, isPending, refetch } = useQuery<PricingType[]>({
    queryKey: PRICING_QUERY_KEY,
    queryFn: PricingServices.fetchAll,
  });

  const handleEdit = (id: number) => {
    if (!data || !id) return;
    const currentPricing = data.find((pricing) => pricing.id === id);

    if (currentPricing) {
      editPricing(currentPricing);
      router.push("pricing/create");
    }
  };

  return (
    <Container px={"$3"} py={"$3"}>
      <FlatList
        refreshing={isPending}
        onRefresh={refetch}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={data || []}
        renderItem={({ item }) => (
          <PriceItem
            title={item.name}
            price={item.amount.toString()}
            unit={item.unit}
            handleEdit={() => handleEdit(item.id)}
          />
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

export default index;
