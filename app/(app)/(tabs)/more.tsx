import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import { ScrollView, View, YStack } from "tamagui";
import React from "react";

import { ConfirmDialogue, Container } from "components/common";
import { MoreCard, MoreItem } from "components/more";
import { COLORS } from "constants/Colors";
import { useRouter } from "expo-router";
import { useAuthStore } from "lib/storage/useAuthStore";

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
            <MoreItem
              title="Account"
              icon={
                <FontAwesome6
                  color={COLORS.primary}
                  name="user-large"
                  size={18}
                />
              }
              handlePress={() => handleNavigate(undefined)}
            />

            <MoreItem
              title="Pricing"
              icon={
                <Ionicons
                  color={COLORS.primary}
                  name="pricetag-sharp"
                  size={20}
                />
              }
              handlePress={() => handleNavigate("/(app)/(more)/pricing")}
            />

            <MoreItem
              title="Payment Modes"
              icon={
                <MaterialIcons
                  color={COLORS.primary}
                  name="attach-money"
                  size={24}
                />
              }
              handlePress={() => handleNavigate("/(app)/(more)/payment-modes")}
            />

            <MoreItem
              title="Reports"
              icon={
                <Ionicons
                  name="analytics-sharp"
                  size={22}
                  color={COLORS.primary}
                />
              }
              handlePress={() => handleNavigate("/(app)/(more)/reports")}
            />

            <MoreItem
              title="Settings"
              icon={
                <Ionicons
                  color={COLORS.primary}
                  name="settings-outline"
                  size={24}
                />
              }
              handlePress={() => handleNavigate("/(app)/(more)/settings")}
            />

            <ConfirmDialogue
              handleAccept={handleSignout}
              body="Are you sure you want to signout?"
            >
              <MoreItem
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
