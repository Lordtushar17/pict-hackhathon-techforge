import { View, Text, StyleSheet } from "react-native";

export default function AlertBanner({ message }: { message: string }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.badge}>
        <Text style={styles.badgeEmoji}>🩺</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title}>All clear</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFEFF", // soft teal
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  badgeEmoji: {
    fontSize: 18,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 2,
  },
  message: {
    fontSize: 12,
    color: "#4B5563",
  },
});
