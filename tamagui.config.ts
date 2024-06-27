import { config as configBase, themes, tokens } from "@tamagui/config/v3";
import { createFont, createTamagui } from "tamagui";

const commonColors = {
  primary: "#3D4EB0",
  c_grey: "#6E6F79",
};

const poppinsFont = {
  normal: { normal: "Poppins" },
  semiBold: { normal: "PoppinsSemiBold" },
  bold: { normal: "PoppinsBold" },
  300: { normal: "PoppinsLight" },
  500: { normal: "Poppins" },
  600: { normal: "PoppinsMedium" },
  700: { normal: "PoppinsSemiBold" },
  800: { normal: "PoppinsBold" },
  900: { normal: "PoppinsBlack" },
};

const headingFont = createFont({
  size: configBase.fonts.heading.size,
  lineHeight: configBase.fonts.heading.lineHeight,
  weight: configBase.fonts.heading.weight,
  letterSpacing: configBase.fonts.heading.letterSpacing,
  face: poppinsFont,
});

const bodyFont = createFont({
  size: configBase.fonts.body.size,
  lineHeight: configBase.fonts.body.lineHeight,
  weight: configBase.fonts.body.weight,
  letterSpacing: configBase.fonts.body.letterSpacing,
  face: poppinsFont,
});

export const config = createTamagui({
  ...configBase,
  tokens,
  themes: {
    ...configBase.themes,
    light: {
      ...configBase.themes.light,
      ...commonColors,
    },
    dark: {
      ...configBase.themes.dark,
      ...commonColors,
    },
  },
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
