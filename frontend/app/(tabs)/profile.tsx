import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Baby Name: Aarav</Text>
      <Text style={styles.sub}>Age: 2 months</Text>
      <Text style={styles.sub}>Weight: 4.8 kg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6FAFF" },
  name: { fontSize: 22, fontWeight: "600", marginBottom: 10 },
  sub: { fontSize: 16, marginVertical: 6 },
});
