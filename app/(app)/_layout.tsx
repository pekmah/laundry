import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "lib/storage/useAuthStore";

export default function AppLayout() {
  const { token } = useAuthStore();

  console.log("TOKEN IS:::", token);
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
      <Stack.Screen
        name="(more)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add_laundry"
        options={{
          ...screenOptionsWithHeader,
          presentation: "modal",
          animation: "slide_from_bottom",
          title: "Add Laundry",
        }}
      />
      <Stack.Screen
        name="pay_order"
        options={{
          ...screenOptionsWithHeader,
          presentation: "modal",
          animation: "slide_from_bottom",
          title: "Pay Order",
        }}
      />
      <Stack.Screen
        name="view_order"
        options={{
          ...screenOptionsWithHeader,
          title: "View Order",
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
  headerTitleStyle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  headerShown: true,
};
