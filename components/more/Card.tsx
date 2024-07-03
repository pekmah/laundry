import { SCREEN_HEIGHT } from "constants/variables";
import { StyleSheet } from "react-native";
import { Avatar, Button, Paragraph, Text, View, YStack } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { useAuthStore } from "lib/storage/useAuthStore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const CARD_HEIGHT = SCREEN_HEIGHT * 0.3;

const Card = () => {
  const { user } = useAuthStore();
  return (
    <View bg={"$primary"} minHeight={CARD_HEIGHT}>
      <LinearGradient
        colors={["rgba(15,19,48,1)", "transparent"]}
        style={styles.background}
      />
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        justifyContent="flex-end"
        padding="$5"
      >
        <YStack alignItems="center" gap="$2">
          <Avatar mb={"$1"} borderRadius={"$3"} bg={"$white1"} size={60}>
            <Text
              color={"$primary"}
              fontSize={20}
              fontWeight={"800"}
              letterSpacing={2}
            >
              {getNameAbbreviation(user?.name || "User")}
            </Text>
          </Avatar>

          <View>
            <Text lineHeight={25} fontWeight={"600"} fontSize={16}>
              {user?.name || ""}
            </Text>
            <Paragraph fontSize={12} textAlign="center" color={"$gray2Light"}>
              {user?.phone || ""}
            </Paragraph>
          </View>

          <Button mt={"$1"} h={"$3"} bg={"$primary_light"}>
            <Feather name="edit" size={18} />

            <Text fontSize={12} color={"$black2"} mt={1} fontWeight={"700"}>
              Edit Profile
            </Text>
          </Button>
        </YStack>
      </View>
    </View>
  );
};

export default Card;

const getNameAbbreviation = (name: string) => {
  const names = name.split(" ");
  const first = names[0][0];
  if (names.length === 1) return `${first}${names[0][1]}`.toUpperCase();
  const last = names[1][0];
  return `${first}${last}`.toUpperCase();
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: CARD_HEIGHT,
  },
});
