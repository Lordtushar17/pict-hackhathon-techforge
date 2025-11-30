// notifications.ts
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications behave when received in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,

    shouldShowBanner: true,  // iOS: show banner at top
    shouldShowList: true,    // iOS: show in Notification Center
  }),
});

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permission for notifications not granted 😢");
    return false;
  }

  // Android needs a notification channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return true;
}

export async function sendTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "BabyGuard Alert 👶",
      body: "This is a test notification from the Profile screen.",
      data: { type: "test-alert" },
    },
    trigger: null, // null = send immediately
  });
}
