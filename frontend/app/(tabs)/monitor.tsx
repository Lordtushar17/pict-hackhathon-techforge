// app/(tabs)/monitor.tsx
import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/Themed";
import BabyHeader from "@/components/monitor/BabyHeader";
import LiveVitalsGrid from "@/components/monitor/LiveVitalsGrid";
import TrendCard from "@/components/monitor/TrendCard";
import SensorStatusList from "@/components/monitor/SensorStatusList";
import AlertHistoryCard from "@/components/monitor/AlertHistoryCard";
import SectionHeader from "@/components/SectionHeader";

const MonitorScreen: React.FC = () => {
  const router = useRouter();

  const vitals = {
    heartRate: {
      label: "Heart Rate",
      value: 132,
      unit: "bpm",
      status: "Normal" as const,
    },
    spo2: {
      label: "SpO₂",
      value: 97,
      unit: "%",
      status: "Normal" as const,
    },
    temperature: {
      label: "Temperature",
      value: 36.8,
      unit: "°C",
      status: "Normal" as const,
    },
    respiration: {
      label: "Resp Rate",
      value: 32,
      unit: "rpm",
      status: "Slightly High" as const,
    },
  };

  const sensorStatus = [
    {
      id: "chest",
      label: "Chest Strap",
      status: "Connected",
      detail: "Signal stable",
    },
    {
      id: "temp",
      label: "Temp Patch",
      status: "Connected",
      detail: "Last sync 3s ago",
    },
    {
      id: "crib",
      label: "Crib Base Unit",
      status: "Connected",
      detail: "Wi-Fi good",
    },
    {
      id: "battery",
      label: "Battery",
      status: "Low",
      detail: "15% • Charge soon",
    },
  ];

  const alerts = [
    {
      id: "1",
      type: "Info",
      time: "2 min ago",
      message: "All vitals normal 🧸",
    },
    {
      id: "2",
      type: "Warning",
      time: "18 min ago",
      message: "Respiration slightly high. Monitoring…",
    },
    {
      id: "3",
      type: "Resolved",
      time: "45 min ago",
      message: "Mild temperature spike resolved.",
    },
  ];

  const trendData = [130, 132, 128, 135, 133, 131, 132];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="always" 
      >
        {/* Top back button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ThemedText type="defaultSemiBold">←</ThemedText>
          </TouchableOpacity>
          <ThemedText type="defaultSemiBold">Monitoring</ThemedText>
        </View>

        {/* Baby header card */}
        <BabyHeader
          babyName="Baby Aarya"
          ageText="2 months • 3.8 kg"
          status="All vitals stable"
        />

        {/* Live monitoring */}
        <View style={styles.section}>
          <SectionHeader title="Live Monitoring" />
          <LiveVitalsGrid vitals={vitals} />
        </View>

        {/* Heart rate trend */}
        <View style={styles.section}>
          <SectionHeader title="Heart Rate Trend" />
          <TrendCard data={trendData} unit="bpm" />
        </View>

        {/* Sensor status */}
        <View style={styles.section}>
          <SectionHeader title="Sensor Status" />
          <SensorStatusList items={sensorStatus} />
        </View>

        {/* Alerts */}
        <View style={[styles.section, styles.bottomSpacing]}>
          <SectionHeader title="Recent Alerts" />
          <AlertHistoryCard alerts={alerts} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MonitorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFBFF", // soft baby theme background
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: Platform.select({
      ios: 32,
      android: 32,
      default: 12, // web
    }),
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#FFE5F1",
  },
  section: {
    marginTop: 16,
  },
  bottomSpacing: {
    paddingBottom: 16,
  },
});
