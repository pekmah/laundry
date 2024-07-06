import { useLaundryStore } from "lib/storage/useLaundryStorage";
import { Text, View, XStack } from "tamagui";

const Footer = () => {
  const { laundry } = useLaundryStore();

  const laundryItemsAmountSum = laundry.reduce(
    (acc, item) => acc + (item?.price ?? 0),
    0
  );
  return (
    <XStack pt={"$3"} justifyContent="space-between">
      <View flex={1}>
        <Text fontSize={13} fontWeight={"600"} col={"black"}>
          Total Amount
        </Text>
      </View>

      <View flex={0.5}>
        <Text fontSize={13} fontWeight={"600"} col={"black"}>
          KES {laundryItemsAmountSum}
        </Text>
      </View>
    </XStack>
  );
};

export default Footer;
