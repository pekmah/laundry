import { useColorScheme, StatusBar } from "react-native";
import { COLORS } from "constants/Colors";
import React from "react";

const CStatusBar = () => {
  const colorScheme = useColorScheme();

  return (
    <StatusBar
      backgroundColor={colorScheme == "dark" ? COLORS.primary_dark : "black"}
    />
  );
};

export default CStatusBar;
