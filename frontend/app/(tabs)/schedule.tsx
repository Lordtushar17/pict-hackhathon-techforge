import { View, Text, StyleSheet } from "react-native";
import SectionHeader from "../../components/SectionHeader";

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <SectionHeader title="Vaccination Schedule" />

      <Text style={styles.item}>• Hep B — Due in 4 days</Text>
      <Text style={styles.item}>• DTP — Completed</Text>

      <SectionHeader title="Feeding Log" />
      <Text style={styles.item}>• 9:00 AM — 90ml Milk</Text>
      <Text style={styles.item}>• 12:00 PM — 80ml Milk</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6FAFF" },
  item: { fontSize: 16, marginVertical: 6 }
});
