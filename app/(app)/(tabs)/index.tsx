import { Container } from "components/common";
import {
  DashboardHeader,
  LaundryServices,
  RecentOrders,
} from "components/dashboard";
import { Stack } from "expo-router";
import { ScrollView } from "tamagui";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <Stack.Screen
        options={{
          header: renderHeader,
        }}
      />

      <Container bg={"white"} py={"1"}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LaundryServices />

          {/* recent orders */}
          <RecentOrders />
        </ScrollView>
      </Container>
    </>
  );
}

function renderHeader(props) {
  return <DashboardHeader {...props} />;
}
