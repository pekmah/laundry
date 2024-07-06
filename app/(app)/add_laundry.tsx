import { ToastAndroid, View } from "react-native";
import { CButton, Container } from "components/common";
import { Label, ScrollView } from "tamagui";
import { useForm } from "react-hook-form";
import { ControlledSelect } from "components/create_order/laundrySelector";
import { LaundryFormData } from "types/laundry";
import { zodResolver } from "@hookform/resolvers/zod";
import { LaundrySchema } from "lib/types/laundry";
import { ControlledInput } from "components/common/input";
import { useLaundryStore } from "lib/storage/useLaundryStorage";
import { useRouter } from "expo-router";
import { PRICING_QUERY_KEY } from "./(more)/pricing";
import { useQuery } from "@tanstack/react-query";
import { PricingType } from "types/pricing";
import PricingServices from "lib/services/PricingServices";

const AddLaundry = () => {
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm<LaundryFormData>({
    resolver: zodResolver(LaundrySchema),
  });
  const laundry = watch("laundry");
  const { addLaundryItem } = useLaundryStore();

  //   const [val, setVal] = useState("");
  const { data, isPending } = useQuery<PricingType[]>({
    queryKey: PRICING_QUERY_KEY,
    queryFn: PricingServices.fetchAll,
  });

  const onSubmit = (selected: LaundryFormData) => {
    const chosenLaundry = data?.find(
      (item) => item?.id?.toString() === selected.laundry
    );

    const quantity =
      typeof selected.quantity === "string"
        ? parseInt(selected.quantity)
        : selected.quantity;
    const amount =
      typeof chosenLaundry?.amount === "string"
        ? parseInt(chosenLaundry.amount)
        : chosenLaundry?.amount ?? 1;

    ToastAndroid.show(`${selected.laundry} added`, ToastAndroid.SHORT);

    if (chosenLaundry?.id) {
      addLaundryItem({
        ...selected,
        laundry: chosenLaundry.name,
        unit: chosenLaundry.unit,
        id: chosenLaundry.id.toString(),
        price: amount * quantity ?? 1,
      });
    }
    router.back();
  };

  return (
    <Container>
      <ScrollView keyboardDismissMode="interactive">
        <View>
          <Label lineHeight={"$6"} fontWeight={"500"} color={"black"}>
            Select Laundry
          </Label>
          <ControlledSelect
            control={control}
            name="laundry"
            data={data}
            isPending={isPending}
            value={laundry}
          />
        </View>

        <ControlledInput
          name="quantity"
          control={control}
          label="Quantity"
          placeholder="laundry quantity i.e. kgs/pieces"
          keyboardType="numeric"
        />

        <CButton
          onPress={handleSubmit(onSubmit)}
          text={"Add Laundry"}
          mt="$4"
          letterSpacing={1}
        />
      </ScrollView>
    </Container>
  );
};

export default AddLaundry;
