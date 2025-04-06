import { Avatar, Label, Text, useTheme, View, XStack, YStack } from "tamagui";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { ILaundryOrder } from "types/laundry";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { PressableImageView } from "components/common";
import { getRandomImageUrl } from "utils/order";

const OrderItem = ({
  customerName,
  status,
  createdAt,
  paymentAmount,
  id,
  payments = [],
  images,
}: ILaundryOrder) => {
  const router = useRouter();
  const theme = useTheme();

  const hasNoInitialPayment = !payments.length;

  const handlePay = () => {
    if (hasNoInitialPayment) {
      // handle pay
      router.push({
        pathname: "/(app)/pay_order",
        params: { order: id },
      });
    }
  };
  const handleViewOrder = () => {
    if (hasNoInitialPayment) handlePay();
    else
      router.push({
        pathname: "/(app)/view_order",
        params: { order: id },
      });
  };

  return (
    <TouchableOpacity onPress={handleViewOrder}>
      <View
        marginVertical={"$1.5"}
        padding={"$2"}
        backgroundColor={"$white1"}
        borderRadius={"$3"}
        borderColor={"$gray6Light"}
        borderWidth={1}
      >
        <XStack gap={"$3"}>
          <Avatar size={"$5"} borderRadius={"$2"} bg={"$primary_light"}>
            {images?.length ? (
              <PressableImageView
                source={{
                  uri: getRandomImageUrl(images),
                }}
                h={"$5"}
                w={"$5"}
              />
            ) : (
              <MaterialIcons
                name="local-laundry-service"
                size={24}
                color={theme.primary.val}
              />
            )}
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
                  {customerName}{" "}
                </Text>
                {/* badge */}
              </XStack>

              <Label
                lineHeight={20}
                fontWeight={"500"}
                color={"$primary"}
                fontSize={12}
                onPress={handlePay}
              >
                {!hasNoInitialPayment ? status : "Pay"}
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
                KES {paymentAmount}
              </Text>
            </YStack>
          </XStack>
        </XStack>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItem;
