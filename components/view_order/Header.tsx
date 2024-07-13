import moment from "moment";
import { Paragraph, Text, View, XStack, YStack } from "tamagui";

type Props = {
  orderID: string;
  negotiatedAmount: number;
  createdAt: string | Date;
  customerName: string;
  customerPhone: string;
};

const Header = ({
  orderID,
  negotiatedAmount,
  createdAt,
  customerName,
  customerPhone,
}: Props) => {
  return (
    <YStack
      px={"$3"}
      py={"$3"}
      bg={"white"}
      borderColor={"$gray5Light"}
      borderWidth={1}
      borderRadius={"$5"}
      mb={"$3"}
    >
      <View
        py={"$2"}
        mb={"$2"}
        borderBottomWidth={1}
        borderBottomColor={"$gray6Light"}
      >
        <Text
          lineHeight={22}
          fontWeight={"700"}
          fontSize={15}
          color={"$gray7Dark"}
          mr={"auto"}
        >
          Order {orderID}
        </Text>
      </View>

      <XStack mb={"$2"}>
        <Text
          fontSize={14}
          fontWeight={"500"}
          color={"$gray12Light"}
          mr={"auto"}
        >
          {customerName}
        </Text>

        <Text fontSize={14} fontWeight={"500"} color={"$gray12Light"}>
          {customerPhone}
        </Text>
      </XStack>
      <XStack justifyContent="space-between">
        <Text fontSize={13} fontWeight={"500"} color={"$gray12Light"}>
          {"KES "}
          {negotiatedAmount.toFixed(2)}
        </Text>
        <Paragraph fontSize={12} col={"$gray10Dark"}>
          {moment(createdAt).format("DD MMM YYYY, hh:mm:ss a")}
        </Paragraph>
      </XStack>
    </YStack>
  );
};

export default Header;
