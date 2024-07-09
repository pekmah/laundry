import { Text, View, XStack } from "tamagui";

const Footer = ({
  hideActions,
  totalOrderAmount = 0,
}: {
  hideActions?: boolean;
  totalOrderAmount: number;
}) => {
  return (
    <XStack pt={"$2"} justifyContent="space-between">
      <View flex={1}>
        <Text fontSize={13} fontWeight={"600"} col={"black"}>
          Total Amount
        </Text>
      </View>

      <View flex={!hideActions ? 0.5 : "unset"}>
        <Text fontSize={13} fontWeight={"600"} col={"black"}>
          KES {totalOrderAmount}
        </Text>
      </View>
    </XStack>
  );
};

export default Footer;
