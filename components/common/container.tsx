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
    <View bg={"$gray1"} flex={1} padding="$4" {...rest}>
      {children}
    </View>
  );
};

export default Container;
