import { CONTAINER_PADDING } from "constants/variables";
import { useAuthStore } from "lib/storage/useAuthStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, H4, View, XStack, useTheme } from "tamagui";
import Fontiso from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback } from "react";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const Header = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useAuthStore();
  const theme = useTheme();
  const router = useRouter();

  const firstName = user?.name.split(" ")[0];

  const handleViewReports = useCallback(() => {
    router.push("/(app)/(more)/reports");
  }, []);

  return (
    <View
      paddingHorizontal={CONTAINER_PADDING}
      paddingTop={top + 10}
      backgroundColor={"$colorTransparent"}
      paddingBottom={10}
      bg={"white"}
    >
      <XStack justifyContent="space-between" gap={10} alignItems="center">
        <H4 fontSize={19} color={"black"}>
          Hello, {firstName}!
        </H4>

        <XStack gap={"$3"}>
          <Avatar size={35} borderRadius={"$2"} bg={"$primary_light"}>
            <Fontiso name="bell" size={20} color={theme.primary.val} />
          </Avatar>
          <TouchableOpacity onPress={handleViewReports}>
            <Avatar size={35} borderRadius={"$2"} bg={"$primary_light"}>
              <Ionicons
                name="analytics-sharp"
                size={22}
                color={theme.primary.val}
              />
            </Avatar>
          </TouchableOpacity>
        </XStack>
      </XStack>
    </View>
  );
};

export default Header;
