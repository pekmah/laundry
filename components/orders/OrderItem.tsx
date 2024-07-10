import { Avatar, Label, Text, useTheme, View, XStack, YStack } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { LaundryOrderType } from "types/laundry";
import { useRouter } from "expo-router";

const OrderItem = ({
  customer_name,
  status,
  createdAt,
  amount,
  id,
  payments = [],
}: LaundryOrderType) => {
  const router = useRouter();
  const theme = useTheme();

  const hasInitialPayment = payments.length > 0;
  const handlePress = () => {
    if (hasInitialPayment) {
      // handle pay
      router.push({
        pathname: "/(app)/pay_order",
        params: { order: id },
      });
    }
  };
  return (
    <View
      marginVertical={"$1.5"}
      padding={"$2"}
      backgroundColor={"$white1"}
      borderRadius={"$3"}
      borderColor={"$gray6Light"}
      borderWidth={1}
    >
      <XStack gap={"$3"}>
        <Avatar size={40} borderRadius={"$2"} bg={"$primary_light"}>
          <MaterialIcons
            name="local-laundry-service"
            size={24}
            color={theme.primary.val}
          />
        </Avatar>

        <XStack flex={1}>
          <YStack gap={"$1.5"} flex={1}>
            <XStack justifyContent="space-between">
              <Text
                fontSize={13}
                lineHeight={25}
                color={"black"}
                fontWeight={"600"}
              >
                {customer_name}{" "}
              </Text>
              {/* badge */}
            </XStack>

            <Label
              lineHeight={20}
              fontWeight={"500"}
              color={"$primary"}
              fontSize={12}
              onPress={handlePress}
            >
              {hasInitialPayment ? status : "Pay"}
            </Label>
          </YStack>
        </XStack>
        <XStack flex={1}>
          <YStack gap={"$1.5"} flex={1}>
            <XStack justifyContent="space-between">
              <Text
                lineHeight={25}
                fontSize={11}
                color={"$gray10Light"}
                fontWeight={"500"}
              >
                {moment(createdAt).format("DD MMM YYYY, HH:mm")}{" "}
              </Text>
            </XStack>

            <Text fontWeight={"600"} color={"$gray12Light"} fontSize={12}>
              KES {amount}
            </Text>
          </YStack>
        </XStack>
      </XStack>
    </View>
  );
};

export default OrderItem;
