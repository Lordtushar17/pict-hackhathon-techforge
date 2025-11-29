import { View, Text, StyleSheet, ScrollView } from "react-native";
import SectionHeader from "../../components/SectionHeader";
import SensorCard from "../../components/SensorCard";
import AlertBanner from "../../components/AlertBanner";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <AlertBanner message="No abnormal readings detected." />

      <SectionHeader title="Live Vitals" />

      <SensorCard 
        label="Temperature" 
        value="36.5°C"
        status="normal"
      />
      <SensorCard 
        label="Heart Rate" 
        value="128 bpm"
        status="normal"
      />
      <SensorCard 
        label="Respiration" 
        value="32 breaths/min"
        status="alert"
      />

      <SectionHeader title="Quick Actions" />

      <Text style={styles.action}>• View Full Monitoring</Text>
      <Text style={styles.action}>• Add Feeding Entry</Text>
      <Text style={styles.action}>• Check Vaccination</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6FAFF" },
  action: { fontSize: 16, paddingVertical: 6 }
});
