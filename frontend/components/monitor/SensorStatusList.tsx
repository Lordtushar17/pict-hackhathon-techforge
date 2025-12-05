// components/monitor/SensorStatusList.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/Themed";

type SensorItem = {
  id: string;
  label: string;
  status: string;
  detail?: string;
};

type Props = {
  items: SensorItem[];
};

const SensorStatusList: React.FC<Props> = ({ items }) => {
  return (
    <View style={styles.card}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isWarning = item.status.toLowerCase().includes("low");

        return (
          <View
            key={item.id}
            style={[styles.row, !isLast && styles.rowDivider]}
          >
            <View style={styles.leftCol}>
              <View style={styles.iconBubble}>
                <ThemedText style={styles.iconEmoji}>🩺</ThemedText>
              </View>
              <View>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                  {item.label}
                </ThemedText>
                {item.detail ? (
                  <ThemedText type="default" style={styles.detail}>
                    {item.detail}
                  </ThemedText>
                ) : null}
              </View>
            </View>

            <View
              style={[
                styles.statusPill,
                isWarning ? styles.statusPillWarning : styles.statusPillOk,
              ]}
            >
              <ThemedText
                style={[
                  styles.statusText,
                  isWarning ? styles.statusTextWarning : styles.statusTextOk,
                ]}
              >
                {item.status}
              </ThemedText>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default SensorStatusList;

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F0EAF5",
  },
  leftCol: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FDE7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  iconEmoji: {
    fontSize: 18,
  },
  label: {
    fontSize: 14,
  },
  detail: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusPillOk: {
    backgroundColor: "#E3FCEC",
  },
  statusPillWarning: {
    backgroundColor: "#FFE3E3",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  statusTextOk: {
    color: "#1F8A4D",
  },
  statusTextWarning: {
    color: "#C0392B",
  },
});
