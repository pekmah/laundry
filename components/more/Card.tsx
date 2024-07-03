import { SCREEN_HEIGHT } from "constants/variables";
import { StyleSheet } from "react-native";
import { Avatar, Button, Paragraph, Text, View, YStack } from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
const CARD_HEIGHT = SCREEN_HEIGHT * 0.3;

const Card = () => {
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
              EP
            </Text>
          </Avatar>

          <View>
            <Text lineHeight={25} fontWeight={"600"} fontSize={16}>
              Eric Pekmah
            </Text>
            <Paragraph fontSize={12} color={"$gray2Light"}>
              +254 712 345 678
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

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: CARD_HEIGHT,
  },
});
