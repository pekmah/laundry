import "../tamagui-web.css";

import { useEffect } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

import { Provider } from "./Provider";
import { Text, View } from "tamagui";
import { ChevronLeft, Feather } from "@tamagui/lucide-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PopinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    PopinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "inherit",
          },
          headerShadowVisible: false,
          headerLeft: renderHeaderLeft,
          headerShown: false,
        }}
        initialRouteName="signin"
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="modal"
          options={{
            title: "Tamagui + Expo",
            presentation: "modal",
            animation: "slide_from_right",
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        />
      </Stack>
    </Provider>
  );
}

const renderHeaderLeft = (props) => {
  console.log("props", props);
  if (!props.canGoBack) return;
  return (
    <TouchableOpacity {...props}>
      <View borderRadius={"$12"} padding="$2">
        <Octicons name="arrow-left" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};
