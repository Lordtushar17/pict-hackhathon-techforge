/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  type TextStyle,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ViewProps = ThemeProps & DefaultView["props"];

/**
 * Extra variants for BabyGuard UI
 */
export type TextVariant =
  | "default"
  | "title"
  | "defaultSemiBold"
  | "subtitle";

export type TextProps = ThemeProps &
  DefaultText["props"] & {
    /**
     * Text style variant, e.g. "title" / "defaultSemiBold"
     */
    type?: TextVariant;
  };

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, type = "default", ...otherProps } =
    props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  let variantStyle: TextStyle = {};

  switch (type) {
    case "title":
      variantStyle = { fontSize: 20, fontWeight: "700" };
      break;
    case "defaultSemiBold":
      variantStyle = { fontWeight: "600" };
      break;
    case "subtitle":
      variantStyle = { fontSize: 13, opacity: 0.8 };
      break;
    case "default":
    default:
      variantStyle = {};
  }

  return (
    <DefaultText
      style={[{ color }, variantStyle, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultView
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}

/**
 * Aliases so we can import { ThemedText, ThemedView } from "@/components/Themed"
 */
export { Text as ThemedText, View as ThemedView };
