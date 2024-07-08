import { Avatar, Text, useTheme, View, XStack, YStack } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { LaundryOrderType } from "types/laundry";

const OrderItem = ({
  customer_name,
  status,
  createdAt,
  amount,
}: LaundryOrderType) => {
  const theme = useTheme();
  return (
    <View
      marginVertical={"$1.5"}
      padding={"$2"}
      backgroundColor={"$gray3Light"}
      borderRadius={"$3"}
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

            <Text fontWeight={"500"} color={"$primary"} fontSize={12}>
              {status}
            </Text>
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
