// components/monitor/AlertHistoryCard.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/Themed";

type AlertType = "Info" | "Warning" | "Resolved";

type AlertItem = {
  id: string;
  type: AlertType | string;
  time: string;
  message: string;
};

type Props = {
  alerts: AlertItem[];
};

const AlertHistoryCard: React.FC<Props> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <View style={styles.emptyCard}>
        <ThemedText type="defaultSemiBold">No alerts 🎉</ThemedText>
        <ThemedText type="default" style={styles.emptyText}>
          Baby is doing great. We’ll show alerts here if anything needs
          attention.
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {alerts.map((alert, index) => {
        const isLast = index === alerts.length - 1;

        const type = alert.type as AlertType;
        const typeColor =
          type === "Warning"
            ? "#C0392B"
            : type === "Resolved"
            ? "#27AE60"
            : "#2980B9";
        const typeBg =
          type === "Warning"
            ? "#FFE3E3"
            : type === "Resolved"
            ? "#E3FCEC"
            : "#E3F2FF";

        return (
          <View
            key={alert.id}
            style={[styles.row, !isLast && styles.rowDivider]}
          >
            <View style={styles.dot} />
            <View style={styles.content}>
              <View style={styles.headerRow}>
                <View style={[styles.typePill, { backgroundColor: typeBg }]}>
                  <ThemedText style={[styles.typeText, { color: typeColor }]}>
                    {alert.type}
                  </ThemedText>
                </View>
                <ThemedText style={styles.time}>{alert.time}</ThemedText>
              </View>
              <ThemedText style={styles.message}>{alert.message}</ThemedText>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default AlertHistoryCard;

const styles = StyleSheet.create({
  emptyCard: {
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  emptyText: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.8,
  },
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
    paddingVertical: 8,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#F0EAF5",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFB3C6",
    marginTop: 10,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typePill: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  time: {
    fontSize: 11,
    opacity: 0.7,
  },
  message: {
    marginTop: 4,
    fontSize: 13,
  },
});
