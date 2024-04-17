import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Suspense } from "react";
import { Appearance, useColorScheme } from "react-native";
import { TamaguiProvider, Text, Theme } from "tamagui";
import Routes from "./src/routes";
import config from "./tamagui.config";
export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }
  const colorScheme = Appearance.getColorScheme();

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme}>
        <Routes />
      </Theme>
    </TamaguiProvider>
  );
}
