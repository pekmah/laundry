import { Avatar, useTheme, View, Text } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";

const Empty = () => {
  const theme = useTheme();
  return (
    <View h={"$9"} alignItems="center" justifyContent="center">
      <Avatar backgroundColor={"$gray4Light"} borderRadius={"$12"} size={50}>
        <FontAwesome
          name={"folder-open"}
          size={30}
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
        List Empty
      </Text>
      <Text
        col={"$gray9Light"}
        fontWeight={"300"}
        fontSize={11}
        w={"50%"}
        textAlign="center"
      >
        Add laundry items
      </Text>
    </View>
  );
};

export default Empty;
