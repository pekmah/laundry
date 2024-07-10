import { Text, View, XStack, YStack } from "tamagui";

const Footer = ({
  hideActions,
  totalOrderAmount = 0,
  negotiated_amount = 0,
}: {
  hideActions?: boolean;
  totalOrderAmount: number;
  negotiated_amount: number;
}) => {
  if (!totalOrderAmount) return null;
  return (
    <YStack>
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

      {negotiated_amount ? (
        <XStack pt={"$2"} justifyContent="space-between">
          <View flex={1}>
            <Text fontSize={13} fontWeight={"600"} col={"black"}>
              Amount to Pay
            </Text>
          </View>

          <View flex={!hideActions ? 0.5 : "unset"}>
            <Text fontSize={13} fontWeight={"600"} col={"black"}>
              KES {negotiated_amount}
            </Text>
          </View>
        </XStack>
      ) : null}
    </YStack>
  );
};

export default Footer;
