import { CONTAINER_PADDING } from "constants/variables";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GetProps, View } from "tamagui";

type Props = {
  children: React.ReactNode;
} & GetProps<typeof View>;

/**
 * container wrapper component within safe area
 */
const Container = ({ children, ...rest }: Props) => {
  return (
    <View flex={1} padding={CONTAINER_PADDING} {...rest}>
      {children}
    </View>
  );
};

export default Container;
