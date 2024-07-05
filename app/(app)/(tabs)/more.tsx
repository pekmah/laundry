import { StyleSheet } from "react-native";
import { ScrollView, View, YStack } from "tamagui";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ConfirmDialogue, Container } from "components/common";
import { MoreCard, MoreItem } from "components/more";
import { MoreItemProps } from "components/more/MoreItem";
import { COLORS } from "constants/Colors";
import { useAuthStore } from "lib/storage/useAuthStore";
import { useRouter } from "expo-router";

const more = () => {
  const { removeUser } = useAuthStore();
  const router = useRouter();

  const handleSignout = () => {
    removeUser();
  };

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <View style={styles.safeArea}>
      <MoreCard />

      <Container bg={"white"}>
        {/* more list */}
        <ScrollView>
          <YStack gap={"$2.5"}>
            {moreItems.map((item, index) => (
              <MoreItem
                key={index}
                title={item.title}
                icon={item.icon}
                handlePress={() => handleNavigate(item?.screen)}
              />
            ))}

            <ConfirmDialogue
              handleAccept={handleSignout}
              body="Are you sure you want to signout?"
            >
              <MoreItem
                key={"-1"}
                title={"Sign Out"}
                icon={
                  <Ionicons color={COLORS.primary} name="log-in" size={26} />
                }
              />
            </ConfirmDialogue>
          </YStack>
        </ScrollView>
      </Container>
    </View>
  );
};

export default more;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

const moreItems: MoreItemProps[] = [
  {
    title: "Account",
    icon: <FontAwesome6 color={COLORS.primary} name="user-large" size={18} />,
  },
  {
    title: "Pricing",
    icon: <Ionicons color={COLORS.primary} name="pricetag-sharp" size={20} />,
    screen: "/(app)/(more)/pricing",
  },
  {
    title: "Payment Modes",
    icon: (
      <MaterialIcons color={COLORS.primary} name="attach-money" size={24} />
    ),
    screen: "/(app)/(more)/payment-modes",
  },
  {
    title: "Offers",
    icon: (
      <MaterialCommunityIcons color={COLORS.primary} name="offer" size={24} />
    ),
  },
];
