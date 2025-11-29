import { View, Text, StyleSheet } from "react-native";

export default function SensorCard({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "normal" | "alert";
}) {
  return (
    <View style={[styles.card, status === "alert" && styles.alert]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#fff",
    marginVertical: 10,
    elevation: 2,
  },
  alert: {
    borderColor: "red",
    borderWidth: 1,
  },
  label: { fontSize: 16, fontWeight: "500" },
  value: { fontSize: 22, fontWeight: "700", marginTop: 6 },
});
