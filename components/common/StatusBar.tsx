import { useColorScheme, StatusBar } from "react-native";
import React from "react";

const CStatusBar = () => {
  const colorScheme = useColorScheme();

  return (
    <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} />
  );
};

export default CStatusBar;
