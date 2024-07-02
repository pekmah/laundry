import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "lib/storage/useAuthStore";

export default function AppLayout() {
  const { token } = useAuthStore();
  if (!token) {
    return <Redirect href={"/(auth)"} />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
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
