import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="tabs/index" options={{ title: "Home" }} />
      <Tabs.Screen name="tabs/monitor" options={{ title: "Monitor" }} />
      <Tabs.Screen name="tabs/schedule" options={{ title: "Schedule" }} />
      <Tabs.Screen name="tabs/profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
