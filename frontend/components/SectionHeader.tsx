import { View, Text, StyleSheet } from "react-native";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  text: { fontSize: 20, fontWeight: "600" }
});
