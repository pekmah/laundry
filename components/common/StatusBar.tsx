import { Platform, StatusBar } from "react-native";
import React from "react";

const CStatusBar = ({ style = "dark" }: { style?: "light" | "dark" }) => (
  <StatusBar
    barStyle={style === "light" && !(Platform.OS === "android" && Number(Platform.Version) < 35)
      ? "light-content"
      : "dark-content"}
  />
);

export default CStatusBar;
