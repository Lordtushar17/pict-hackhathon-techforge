// components/monitor/LiveVitalsGrid.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import VitalTile, { VitalStatus } from "./VitalTile";

type SingleVital = {
  label: string;
  value: number | string;
  unit: string;
  status: VitalStatus;
};

type Props = {
  vitals: {
    heartRate: SingleVital;
    spo2: SingleVital;
    temperature: SingleVital;
    respiration: SingleVital;
  };
};

const LiveVitalsGrid: React.FC<Props> = ({ vitals }) => {
  return (
    <View style={styles.grid}>
      <View style={styles.row}>
        <View style={styles.col}>
          <VitalTile {...vitals.heartRate} />
        </View>
        <View style={styles.col}>
          <VitalTile {...vitals.spo2} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <VitalTile {...vitals.temperature} />
        </View>
        <View style={styles.col}>
          <VitalTile {...vitals.respiration} />
        </View>
      </View>
    </View>
  );
};

export default LiveVitalsGrid;

const styles = StyleSheet.create({
  grid: {
    marginTop: 8,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  col: {
    flex: 1,
  },
});
