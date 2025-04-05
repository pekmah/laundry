import { Tabs } from "expo-router";
import { Text, View, useTheme } from "tamagui";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { screenOptionsWithHeader } from "../_layout";
import React from "react";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: theme.primary.val,
          height: 70,
          paddingHorizontal: 10,
        },
        tabBarLabelStyle: {
          display: "none",
          height: 0,
        },
        tabBarInactiveTintColor: "#fff",
      }}
      initialRouteName="create_order"
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          headerShown: true,
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: renderOrdersIcon,
          ...screenOptionsWithHeader,
          title: "Orders",
        }}
      />
      <Tabs.Screen
        name="create_order"
        options={{
          tabBarIcon: renderCreateTabBarIcon,
          ...screenOptionsWithHeader,
          title: "Create Order",
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: renderMoreIcon,
        }}
      />
    </Tabs>
  );
}

const renderHomeIcon = ({ color, focused }) => (
  <TabBarIcon
    color={color}
    title="Home"
    icon={<Octicons name="home" size={20} color={color} />}
    isFocused={focused}
  />
);

const renderOrdersIcon = ({ color, focused }) => (
  <TabBarIcon
    color={color}
    title="Orders"
    icon={<Ionicons name="basket-outline" size={24} color={color} />}
    isFocused={focused}
  />
);
const renderMoreIcon = ({ color, focused }) => (
  <TabBarIcon
    color={color}
    title="More"
    icon={<Feather name="more-horizontal" size={24} color={color} />}
    isFocused={focused}
  />
);
const renderCreateTabBarIcon = ({ color, focused }) => (
  <TabBarIcon
    color={color}
    title="Create"
    icon={<Feather name="plus-circle" size={26} color={color} />}
    isFocused={focused}
  />
);

type TabBarProps = {
  color: string;
  title: string;
  icon: React.ReactNode;
  isFocused?: boolean;
};
const TabBarIcon = ({ color, title, icon, isFocused }: TabBarProps) => {
  return (
    <View
      flexDirection="column"
      paddingVertical={"$1.5"}
      paddingHorizontal={"$2"}
      backgroundColor={"transparent"}
      borderRadius={"$1"}
      alignItems="center"
    >
      {icon}
      <Text fontWeight={"600"} color={color} fontSize={11} mt={2}>
        {title}
      </Text>

      {isFocused ? (
        <View borderRadius={"$3"} bg={"white"} h={4} w={"$2"} mt="$1" />
      ) : null}
    </View>
  );
};
