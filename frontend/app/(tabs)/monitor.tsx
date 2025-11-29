import { View, StyleSheet, ScrollView } from "react-native";
import VitalStat from "../../components/VitalStat";
import SectionHeader from "../../components/SectionHeader";

export default function MonitorScreen() {
  return (
    <ScrollView style={styles.container}>
      <SectionHeader title="Real-Time Monitoring" />

      <VitalStat label="Temperature" value="36.7°C" />
      <VitalStat label="Heart Rate" value="130 bpm" />
      <VitalStat label="Respiration" value="31 breaths/min" />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6FAFF" },
});
