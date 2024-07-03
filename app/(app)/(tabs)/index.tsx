import { DashboardHeader } from "components/dashboard";
import { Stack } from "expo-router";
import { H2, YStack } from "tamagui";

export default function Dashboard() {
  return (
    <>
      <Stack.Screen
        options={{
          header: renderHeader,
        }}
      />
      <YStack f={1} ai="center" gap="$8" px="$10" pt="$5">
        <H2 color={"black"}>Laundry App</H2>
      </YStack>
    </>
  );
}

function renderHeader(props) {
  return <DashboardHeader {...props} />;
}
