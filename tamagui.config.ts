import { defaultConfig as configBase, tokens } from "@tamagui/config/v5";
import { defaultConfig as modernConfig, tokens as modernTokens } from "@tamagui/config/v6";
import { animations } from "@tamagui/config/animations-css";
import { blue, gray, grayDark, purple, red } from "@tamagui/colors";
import { COLORS } from "./constants/Colors";
import { createFont, createTamagui } from "tamagui";

const commonColors = {
  primary: COLORS.primary,
  primary_light: COLORS.primary_light,
  c_grey: COLORS.c_grey,
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
  size: { ...modernConfig.fonts.heading.size, ...configBase.fonts.heading.size },
  lineHeight: { ...modernConfig.fonts.heading.lineHeight, ...configBase.fonts.heading.lineHeight },
  weight: configBase.fonts.heading.weight,
  letterSpacing: configBase.fonts.heading.letterSpacing,
  face: poppinsFont,
});

const bodyFont = createFont({
  size: { ...modernConfig.fonts.body.size, ...configBase.fonts.body.size },
  lineHeight: { ...modernConfig.fonts.body.lineHeight, ...configBase.fonts.body.lineHeight },
  weight: configBase.fonts.body.weight,
  letterSpacing: configBase.fonts.body.letterSpacing,
  face: poppinsFont,
});

export const config = createTamagui({
  ...configBase,
  animations,
  shorthands: { ...configBase.shorthands, col: "color", h: "height", w: "width", ta: "textAlign", pos: "position", ai: "alignItems", jc: "justifyContent", f: "flex", br: "borderRadius", fow: "fontWeight" } as const,
  settings: { ...configBase.settings, onlyAllowShorthands: false, styleCompat: "legacy" },
  tokens: { ...tokens, radius: { ...modernTokens.radius, ...tokens.radius }, color: {
    black1: "#000000", white1: "#ffffff", blue10: blue.blue10, blue2Light: blue.blue2,
    purple10: purple.purple10, gray10: gray.gray10,
    gray1Light: gray.gray1, gray2Light: gray.gray2, gray3Light: gray.gray3,
    gray4Light: gray.gray4, gray5Light: gray.gray5, gray6Light: gray.gray6,
    gray7Light: gray.gray7, gray8Light: gray.gray8, gray9Light: gray.gray9,
    gray10Light: gray.gray10, gray11Light: gray.gray11, gray12Light: gray.gray12,
    gray7Dark: grayDark.gray7, gray10Dark: grayDark.gray10,
    red1Light: red.red1, red3Light: red.red3, red8Light: red.red8,
    red10Light: red.red10, red11Light: red.red11,
  } },
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
