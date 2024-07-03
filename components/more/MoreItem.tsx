import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Avatar, Text, View, XStack, useTheme } from "tamagui";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

export type MoreItemProps = {
  title: string;
  icon: React.ReactNode;
  handlePress?: () => void;
} & TouchableOpacityProps;

const MoreItem = ({ title, icon, handlePress, ...rest }: MoreItemProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={handlePress} {...rest}>
      <View
        bg={"$gray2Light"}
        padding={"$2"}
        paddingVertical={"$1.5"}
        borderRadius={"$5"}
      >
        <XStack gap="$4" alignItems="center">
          <Avatar size={35} bg={"$primary_light"} borderRadius={"$4"}>
            {icon}
          </Avatar>
          <View flex={1}>
            <Text col={"$black1"} fontWeight={"500"} fontSize={14}>
              {title}
            </Text>
          </View>
          <Avatar>
            <Feather
              name="chevron-right"
              size={24}
              color={theme.gray12Light.val}
            />
          </Avatar>
        </XStack>
      </View>
    </TouchableOpacity>
  );
};

export default MoreItem;
