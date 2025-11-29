import { View, Text, StyleSheet } from "react-native";

export default function VitalStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "white",
    marginVertical: 10,
    elevation: 2,
  },
  label: { fontSize: 16 },
  value: { fontSize: 22, fontWeight: "700" },
});
