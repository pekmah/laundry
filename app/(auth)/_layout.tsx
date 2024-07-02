import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "lib/storage/useAuthStore";

export default function AppLayout() {
  const { token } = useAuthStore();
  if (token) {
    return <Redirect href={"/(app)"} />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="verify"
        options={{ ...screenOptionsWithHeader, title: "" }}
      />

      <Stack.Screen
        name="signup"
        options={{ ...screenOptionsWithHeader, title: "" }}
      />
    </Stack>
  );
}
export const screenOptionsWithHeader = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerShadowVisible: false,
  headerShown: true,
};
