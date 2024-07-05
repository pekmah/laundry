import { CButton } from "components/common";
import { Text, View, XStack, YStack } from "tamagui";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { COLORS } from "constants/Colors";

type Props = { title: string; price: string; unit: string };

const PriceItem = ({ title, price, unit }: Props) => {
  return (
    <View
      overflow="hidden"
      borderRadius={"$4"}
      borderWidth={1}
      borderColor={"$gray5Light"}
      bg={"white"}
    >
      <XStack gap={"$3"}>
        <View
          w={70}
          justifyContent="center"
          alignItems="center"
          bg={"$primary_light"}
          borderRadius={"$4"}
        >
          <FontAwesome5 name={"tshirt"} size={24} color={COLORS.primary} />
        </View>

        <YStack py={"$2"}>
          <Text
            lineHeight={20}
            color={"black"}
            fontSize={15}
            fontWeight={"700"}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <XStack gap={"$5"} justifyContent="space-between">
            <YStack>
              <Text fontSize={12} fontWeight={"500"} color={"$gray10"}>
                Price: {price}/{unit}
              </Text>
              <Text fontSize={12} fontWeight={"500"} color={"$gray10"}>
                Unit: {unit}
              </Text>
            </YStack>
            <View
              flexDirection="row"
              py={"$2"}
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <CButton flexGrow={1} h={"$2.5"} fs={12} mt={"$1"}>
                <Text
                  letterSpacing={1}
                  fontWeight={"600"}
                  fontSize={12}
                  color={"whitesmoke"}
                >
                  Edit
                </Text>
              </CButton>
            </View>
          </XStack>
        </YStack>
      </XStack>
    </View>
  );
};

export default PriceItem;
