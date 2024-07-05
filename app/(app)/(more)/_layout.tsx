import { Stack } from "expo-router";
import { screenOptionsWithHeader } from "../_layout";

export default function MoreLayout() {
  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen
        name="pricing/create"
        options={{
          ...screenOptionsWithHeader,
          title: "Add Pricing",
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="pricing/index"
        options={{
          ...screenOptionsWithHeader,
          title: "Manage Pricing ",
        }}
      />
      <Stack.Screen
        name="payment-modes/index"
        options={{
          ...screenOptionsWithHeader,
          title: "Manage Payment Modes",
        }}
      />
      <Stack.Screen
        name="payment-modes/create"
        options={{
          ...screenOptionsWithHeader,
          title: "Add Payment Mode",
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
