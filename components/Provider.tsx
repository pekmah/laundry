import { TamaguiProvider, type TamaguiProviderProps } from "tamagui";
import { CurrentToast } from "./CurrentToast";
import { config } from "../tamagui.config";
import React from "react";

export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config" | "defaultTheme">) {
  return (
    <TamaguiProvider
      config={config}
      defaultTheme="light"
      {...rest}
    >
      {children}
      <CurrentToast />
    </TamaguiProvider>
  );
}
