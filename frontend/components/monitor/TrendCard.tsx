// components/monitor/TrendCard.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/Themed";

type Props = {
  data: number[];
  unit: string;
};

const TrendCard: React.FC<Props> = ({ data, unit }) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const latest = data[data.length - 1];

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          Current: {latest} {unit}
        </ThemedText>
        <ThemedText type="default" style={styles.range}>
          Range: {min}–{max} {unit}
        </ThemedText>
      </View>

      <View style={styles.chartRow}>
        {data.map((value, index) => {
          const norm = max === min ? 0.6 : (value - min) / (max - min);
          const height = 24 + norm * 32;
          const isLast = index === data.length - 1;

          return (
            <View key={index} style={styles.barWrapper}>
              <View
                style={[
                  styles.bar,
                  {
                    height,
                    opacity: isLast ? 1 : 0.6,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>

      <ThemedText type="default" style={styles.caption}>
        Baby-safe trend preview.
      </ThemedText>
    </View>
  );
};

export default TrendCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 14,
    backgroundColor: "#E7F5FF",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  title: {
    fontSize: 14,
  },
  range: {
    fontSize: 12,
    opacity: 0.8,
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
  },
  barWrapper: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  bar: {
    width: 10,
    borderRadius: 999,
    backgroundColor: "#FFB3C6",
  },
  caption: {
    marginTop: 8,
    fontSize: 11,
    opacity: 0.7,
  },
});
