import { CONTAINER_PADDING } from "constants/variables";
import { useAuthStore } from "lib/storage/useAuthStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { H4, View } from "tamagui";

const Header = () => {
  const { top } = useSafeAreaInsets();
  const { user } = useAuthStore();

  return (
    <View
      paddingHorizontal={CONTAINER_PADDING}
      paddingTop={top}
      backgroundColor={"$colorTransparent"}
    >
      <H4 color={"black"}>Hello, Master!</H4>
    </View>
  );
};

export default Header;
