import { Avatar, Text, useTheme, View, XStack } from "tamagui";
import { OrderType } from "types/order";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

const OrderItem = ({ name, stage, date }: OrderType) => {
  const theme = useTheme();
  return (
    <View
      marginVertical={"$1.5"}
      padding={"$2"}
      backgroundColor={"$gray3Light"}
      borderRadius={"$3"}
    >
      <XStack gap={"$3"} alignItems="center">
        <Avatar size={40} borderRadius={"$2"} bg={"$primary_light"}>
          <MaterialIcons
            name="local-laundry-service"
            size={24}
            color={theme.primary.val}
          />
        </Avatar>

        <View flex={1}>
          <XStack justifyContent="space-between">
            <Text color={"black"} fontWeight={"600"}>
              {name}{" "}
            </Text>
            {/* badge */}
          </XStack>
          <Text fontWeight={"500"} color={"black"} fontSize={12}>
            {moment(date).format("DD-MM-YYYY HH:mm")}
          </Text>
        </View>
      </XStack>
    </View>
  );
};

export default OrderItem;
