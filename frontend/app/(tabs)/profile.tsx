import { View, Text, StyleSheet, Pressable } from "react-native";
import { sendTestNotification } from "../../components/utils/notifications"; // adjust path as needed

export default function ProfileScreen() {
  const handleSendNotification = () => {
    sendTestNotification();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Baby Name: Aarav</Text>
      <Text style={styles.sub}>Age: 2 months</Text>
      <Text style={styles.sub}>Weight: 4.8 kg</Text>

      <Pressable style={styles.button} onPress={handleSendNotification}>
        <Text style={styles.buttonText}>Send Test Notification</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6FAFF" },
  name: { fontSize: 22, fontWeight: "600", marginBottom: 10 },
  sub: { fontSize: 16, marginVertical: 6 },

  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#FF8FB1", // soft pink baby theme
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
