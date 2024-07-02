import { Link, Tabs } from "expo-router";
import { Button, Text, View, useTheme } from "tamagui";
import { Atom, AudioWaveform } from "@tamagui/lucide-icons";
import { tokens } from "@tamagui/config/v3";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary.val,
        tabBarStyle: {
          backgroundColor: theme.primary.val,
          height: 70,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          paddingHorizontal: 10,
        },
        tabBarLabelStyle: {
          display: "none",
          height: 0,
        },
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: renderHomeIcon,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: renderOrdersIcon,
        }}
      />
      <Tabs.Screen
        name="create_order"
        options={{
          title: "Create",
          tabBarIcon: renderCreateTabBarIcon,
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
  if (!isFocused) {
    return icon;
  }

  return (
    <View
      flexDirection="row"
      paddingVertical={"$1.5"}
      paddingHorizontal={"$2"}
      backgroundColor={"#fff"}
      borderRadius={"$12"}
      alignItems="center"
    >
      {icon}
      <Text fontWeight={"600"} color={color} fontSize={12} ml={"$2"} mt={2}>
        {title}
      </Text>
    </View>
  );
};
