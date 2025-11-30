// components/monitor/BabyHeader.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/Themed";

type Props = {
  babyName: string;
  ageText: string;
  status: string;
};

const BabyHeader: React.FC<Props> = ({ babyName, ageText, status }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <ThemedText style={styles.avatarEmoji}>👶</ThemedText>
        <View style={styles.statusDot} />
      </View>

      <View style={styles.textWrapper}>
        <ThemedText type="title" style={styles.name}>
          {babyName}
        </ThemedText>
        <ThemedText type="default" style={styles.age}>
          {ageText}
        </ThemedText>
        <View style={styles.statusPill}>
          <View style={styles.pillDot} />
          <ThemedText type="defaultSemiBold" style={styles.statusText}>
            {status}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default BabyHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#FFE8F1",
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: "#FFD6E6",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarEmoji: {
    fontSize: 32,
  },
  statusDot: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6AD18A",
    borderWidth: 2,
    borderColor: "#FFE8F1",
  },
  textWrapper: {
    flex: 1,
  },
  name: {
    fontSize: 20,
  },
  age: {
    marginTop: 2,
    fontSize: 13,
    opacity: 0.8,
  },
  statusPill: {
    marginTop: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#C8F7E3",
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2ECC71",
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
  },
});
