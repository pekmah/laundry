import { useColorScheme } from "react-native";
import { TamaguiProvider, type TamaguiProviderProps } from "tamagui";
import { CurrentToast } from "./CurrentToast";
import { config } from "../tamagui.config";
import React from "react";

export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config" | "defaultTheme">) {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === "dark" ? "dark" : "light"}
      {...rest}
    >
      {children}
      <CurrentToast />
    </TamaguiProvider>
  );
}
