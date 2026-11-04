import { Tabs } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { screenOptionsWithHeader } from "../_layout";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#dce2ff",
        tabBarStyle: {
          backgroundColor: theme.primary.val,
          height: 72,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", headerShown: true, tabBarIcon: ({ color }) => <Octicons name="home" size={22} color={typeof color === "string" ? color : "#fff"} /> }} />
      <Tabs.Screen name="orders" options={{ ...screenOptionsWithHeader, title: "Orders", tabBarIcon: ({ color }) => <Ionicons name="basket-outline" size={24} color={typeof color === "string" ? color : "#fff"} /> }} />
      <Tabs.Screen name="create_order" options={{ ...screenOptionsWithHeader, title: "Create Order", tabBarLabel: "Create", tabBarIcon: ({ color }) => <Feather name="plus-circle" size={24} color={typeof color === "string" ? color : "#fff"} /> }} />
      <Tabs.Screen name="more" options={{ title: "More", tabBarIcon: ({ color }) => <Feather name="more-horizontal" size={24} color={typeof color === "string" ? color : "#fff"} /> }} />
    </Tabs>
  );
}
