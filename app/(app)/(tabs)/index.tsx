import { CStatusBar, Container } from "components/common";
import { DashboardHeader, LaundryServices } from "components/dashboard";
import { Stack } from "expo-router";
import { ScrollView } from "tamagui";

export default function Dashboard() {
  return (
    <>
      <CStatusBar />

      <Stack.Screen
        options={{
          header: renderHeader,
        }}
      />

      <Container bg={"white"} py={"$1"}>
        <ScrollView>
          <LaundryServices />
        </ScrollView>
      </Container>
    </>
  );
}

function renderHeader(props) {
  return <DashboardHeader {...props} />;
}
