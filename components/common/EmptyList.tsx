import { View, Text, Avatar, useTheme } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  message?: string;
  subText?: string;
};
const EmptyList = ({
  message = "List Empty",
  subText = "Add data to populate the list",
}: Props) => {
  const theme = useTheme();
  return (
    <View h={"$16"} alignItems="center" justifyContent="center">
      <Avatar backgroundColor={"$gray4Light"} borderRadius={"$12"} size={100}>
        <FontAwesome
          name={"folder-open"}
          size={50}
          color={theme.gray8Light.val}
        />
      </Avatar>
      <Text
        fontWeight={"600"}
        fontSize={13}
        col={"$gray9Light"}
        textAlign="center"
        mt={"$2"}
      >
        {message}
      </Text>
      <Text
        col={"$gray9Light"}
        fontWeight={"300"}
        fontSize={11}
        w={"50%"}
        textAlign="center"
      >
        {subText}
      </Text>
    </View>
  );
};

export default EmptyList;
