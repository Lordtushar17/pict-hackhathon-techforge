// components/QuickActionsBar.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

export default function QuickActionsBar() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      {/* Header row */}
      <Pressable
        style={styles.headerRow}
        onPress={() => setOpen((prev) => !prev)}
      >
        <View style={styles.iconBubble}>
          <Text style={styles.iconText}>✨</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Quick shortcuts</Text>
          <Text style={styles.subtitle}>
            Jump to common actions in a tap.
          </Text>
        </View>
        <Text style={styles.toggleText}>{open ? "Hide" : "Show"}</Text>
      </Pressable>

      {open && (
        <View style={styles.actionsColumn}>
          <Pressable
            style={styles.actionRow}
            // ✅ use the group name "(tabs)" in the path
            onPress={() => router.push("/(tabs)/monitor")}
          >
            <View style={[styles.actionIcon, styles.actionIconBlue]}>
              <Text style={styles.actionEmoji}>📊</Text>
            </View>
            <View style={styles.actionTextBlock}>
              <Text style={styles.actionTitle}>View full monitoring</Text>
              <Text style={styles.actionSubtitle}>
                Open real-time vitals dashboard.
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.actionRow}
            onPress={() => router.push("/(tabs)/schedule")}
          >
            <View style={[styles.actionIcon, styles.actionIconPink]}>
              <Text style={styles.actionEmoji}>🍼</Text>
            </View>
            <View style={styles.actionTextBlock}>
              <Text style={styles.actionTitle}>Add feeding entry</Text>
              <Text style={styles.actionSubtitle}>
                Log today&apos;s feeds and timings.
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.actionRow}
            onPress={() => router.push("/(tabs)/schedule")}
          >
            <View style={[styles.actionIcon, styles.actionIconGreen]}>
              <Text style={styles.actionEmoji}>💉</Text>
            </View>
            <View style={styles.actionTextBlock}>
              <Text style={styles.actionTitle}>Check vaccinations</Text>
              <Text style={styles.actionSubtitle}>
                See upcoming doses & status.
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.actionRow}
            onPress={() => router.push("/(tabs)/profile")}
          >
            <View style={[styles.actionIcon, styles.actionIconLilac]}>
              <Text style={styles.actionEmoji}>⚙️</Text>
            </View>
            <View style={styles.actionTextBlock}>
              <Text style={styles.actionTitle}>Baby profile & settings</Text>
              <Text style={styles.actionSubtitle}>
                Edit baby details & preferences.
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#E5E7EB",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBubble: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#FDE68A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  iconText: {
    fontSize: 18,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2563EB",
  },
  actionsColumn: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 10,
    gap: 8,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 14,
  },
  actionIcon: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  actionIconBlue: {
    backgroundColor: "#DBEAFE",
  },
  actionIconPink: {
    backgroundColor: "#FCE7F3",
  },
  actionIconGreen: {
    backgroundColor: "#DCFCE7",
  },
  actionIconLilac: {
    backgroundColor: "#EDE9FE",
  },
  actionEmoji: {
    fontSize: 18,
  },
  actionTextBlock: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  actionSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 1,
  },
});
