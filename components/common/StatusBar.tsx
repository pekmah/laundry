import { useColorScheme, StatusBar } from "react-native";
import { useTheme } from "tamagui";
import { COLORS } from "constants/Colors";

const CStatusBar = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  return (
    <StatusBar
      backgroundColor={colorScheme == "dark" ? COLORS.primary_dark : "black"}
    />
  );
};

export default CStatusBar;
