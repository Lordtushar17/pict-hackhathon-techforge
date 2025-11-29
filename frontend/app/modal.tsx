import { View, Text, StyleSheet } from "react-native";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚠ Abnormal Reading Detected</Text>
      <Text style={styles.msg}>Heart rate has dropped below safe levels.</Text>
      <Text style={styles.msg}>Please check the infant immediately.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 30,
    backgroundColor: "white",
    justifyContent: "center"
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  msg: { fontSize: 16, marginVertical: 6 }
});
