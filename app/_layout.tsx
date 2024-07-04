import "../tamagui-web.css";

import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "./Provider";
import { useAuthStore } from "lib/storage/useAuthStore";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const queryClient = new QueryClient();

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
    praise: require("../assets/fonts/Praise-Regular.ttf"),
  });

  const { removeUser } = useAuthStore();

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
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Slot />
      </Provider>
    </QueryClientProvider>
  );
}
