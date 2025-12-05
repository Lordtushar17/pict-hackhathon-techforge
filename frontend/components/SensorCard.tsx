import { View, Text, StyleSheet } from "react-native";

type Status = "normal" | "alert";

export default function SensorCard({
  label,
  value,
  status,
  emoji,
  tag,
}: {
  label: string;
  value: string;
  status: Status;
  emoji?: string;
  tag?: string;
}) {
  const isAlert = status === "alert";

  return (
    <View style={[styles.card, isAlert && styles.cardAlert]}>
      <View style={styles.headerRow}>
        <View style={styles.iconBubble}>
          <Text style={styles.iconText}>{emoji ?? "🌡️"}</Text>
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>

      <Text style={styles.value}>{value}</Text>

      {tag && (
        <View style={[styles.tag, isAlert ? styles.tagAlert : styles.tagNormal]}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    marginRight: 10,
    shadowColor: "#E5E7EB",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardAlert: {
    borderColor: "#FCA5A5",
    backgroundColor: "#FEF2F2",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconBubble: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  iconText: {
    fontSize: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4B5563",
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  tag: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagNormal: {
    backgroundColor: "rgba(22,163,74,0.08)",
  },
  tagAlert: {
    backgroundColor: "rgba(248,113,113,0.16)",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#374151",
  },
});
