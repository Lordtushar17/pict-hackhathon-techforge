// components/monitor/VitalTile.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/Themed";

export type VitalStatus =
  | "Normal"
  | "High"
  | "Low"
  | "Slightly High"
  | "Slightly Low";

type Props = {
  label: string;
  value: number | string;
  unit: string;
  status: VitalStatus;
};

const statusColors: Record<VitalStatus, { bg: string; text: string }> = {
  Normal: { bg: "#E3FCEC", text: "#1F8A4D" },
  High: { bg: "#FFE3E3", text: "#C0392B" },
  Low: { bg: "#E3F2FF", text: "#2C3E50" },
  "Slightly High": { bg: "#FFF4E0", text: "#E67E22" },
  "Slightly Low": { bg: "#E3F2FF", text: "#2980B9" },
};

const VitalTile: React.FC<Props> = ({ label, value, unit, status }) => {
  const colors = statusColors[status] ?? statusColors.Normal;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <ThemedText type="defaultSemiBold" style={styles.label}>
          {label}
        </ThemedText>
        <View style={[styles.statusPill, { backgroundColor: colors.bg }]}>
          <View style={[styles.dot, { backgroundColor: colors.text }]} />
          <ThemedText style={[styles.statusText, { color: colors.text }]}>
            {status}
          </ThemedText>
        </View>
      </View>
      <View style={styles.valueRow}>
        <ThemedText type="title" style={styles.value}>
          {value}
        </ThemedText>
        <ThemedText type="default" style={styles.unit}>
          {unit}
        </ThemedText>
      </View>
    </View>
  );
};

export default VitalTile;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    opacity: 0.8,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 5,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  valueRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  value: {
    fontSize: 22,
  },
  unit: {
    marginLeft: 6,
    fontSize: 13,
    opacity: 0.8,
  },
});
