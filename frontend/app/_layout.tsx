// app/_layout.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { registerForPushNotificationsAsync } from "@/components/utils/notifications";

import { useColorScheme } from "@/components/useColorScheme";

// Keep splash visible while we load fonts
SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Login first */}
        <Stack.Screen name="login" />

        {/* Tab group */}
        <Stack.Screen name="(tabs)" />

        {/* Modal (if you use it) */}
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
