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
          title: "Pricing Setup",
        }}
      />
    </Stack>
  );
}
