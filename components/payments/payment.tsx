import { TouchableOpacity } from "react-native";
import { Avatar, Text, useTheme, View, XStack } from "tamagui";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CButton } from "components/common";

const PaymentItem = ({ title }) => {
  const theme = useTheme();

  return (
    <View
      bg={"$gray3Light"}
      padding={"$2"}
      paddingVertical={"$2"}
      borderRadius={"$5"}
    >
      <XStack gap="$4" alignItems="center">
        <Avatar size={40} bg={"$primary_light"} borderRadius={"$4"}>
          <FontAwesome name={"money"} size={24} color={theme.primary.val} />
        </Avatar>
        <View flex={1}>
          <Text col={"$black1"} fontWeight={"500"} fontSize={14}>
            {title}
          </Text>
        </View>

        <XStack gap={"$2"} alignItems="center">
          <CButton borderRadius={"$4"} px={"$2"} w={40} h={32}>
            <AntDesign name="edit" size={20} color={theme.white1.val} />
          </CButton>

          <CButton
            bg={"$red10Light"}
            borderRadius={"$4"}
            px={"$2"}
            w={40}
            h={32}
          >
            <MaterialCommunityIcons
              name="delete"
              size={20}
              color={theme.white1.val}
            />
          </CButton>
        </XStack>
      </XStack>
    </View>
  );
};

export default PaymentItem;
