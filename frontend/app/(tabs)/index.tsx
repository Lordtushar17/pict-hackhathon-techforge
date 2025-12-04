import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import SectionHeader from "../../components/SectionHeader";
import SensorCard from "../../components/SensorCard";
import AlertBanner from "../../components/AlertBanner";
import QuickActionsBar from "../../components/QuickActionsBar";

import { Tabs } from 'expo-router';


export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.bgLayer}>
        <View style={styles.blobTop} />
        <View style={styles.blobSide} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top header with baby info */}
        <View style={styles.headerRow}>
          <View style={styles.babyRow}>
            <View style={styles.babyAvatar}>
              <Text style={styles.babyEmoji}>👶</Text>
            </View>
            <View>
              <Text style={styles.babyName}>Arya</Text>
              <Text style={styles.babyMeta}>4 months · 5.3 kg</Text>
            </View>
          </View>
          <View style={styles.badgeSoft}>
            <Text style={styles.badgeText}>Wearable connected</Text>
          </View>
        </View>

        {/* NEW: collapsable sidebar-style quick actions */}
        <QuickActionsBar />

        {/* Alert summary */}
        <AlertBanner message="No abnormal readings detected in the last 24 hours." />

        {/* Live vitals */}
        <SectionHeader title="Live Vitals" />
        <View style={styles.cardRow}>
          <SensorCard
            label="Temperature"
            value="36.5°C"
            status="normal"
            emoji="🌡️"
            tag="Normal range"
          />
          <SensorCard
            label="Heart Rate"
            value="123 bpm"
            status="normal"
            emoji="💓"
            tag="Comfort zone"
          />
        </View>
        <View style={styles.cardRow}>
          <SensorCard
            label="Respiration"
            value="27 rpm"
            status="normal"
            emoji="🌬️"
            tag="Steady"
          />
        </View>

        {/* Today at a glance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today at a glance</Text>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <View style={styles.dot} />
              <Text style={styles.listText}>
                Slept peacefully for <Text style={styles.bold}>6.5 hours</Text> last night.
              </Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.dot} />
              <Text style={styles.listText}>
                No fever spikes in the last <Text style={styles.bold}>48 hours</Text>.
              </Text>
            </View>
            <View style={styles.listItem}>
              <View style={styles.dot} />
              <Text style={styles.listText}>
                Feeding schedule is <Text style={styles.bold}>on track</Text>.
              </Text>
            </View>
          </View>
        </View>

        {/* Risk summary (AI) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Summary (AI)</Text>
          <View style={styles.cardRow}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Current risk level</Text>
              <Text style={styles.infoValue}>Low</Text>
              <View style={[styles.tagChip, styles.tagChipSafe]}>
                <Text style={styles.tagChipText}>All vitals stable</Text>
              </View>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Things to watch</Text>
              <Text style={styles.infoValue}>Hydration</Text>
              <View style={[styles.tagChip, styles.tagChipWarn]}>
                <Text style={styles.tagChipText}>Offer feeds regularly</Text>
              </View>
            </View>
          </View>
        </View>

        {/* (Old bottom quick actions removed; sidebar handles it now) */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FDFBFF",
  },
  bgLayer: {
    position: "absolute",
    inset: 0,
    backgroundColor: "#F9FAFF",
  },
  blobTop: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: "#E0F2FE",
    top: -80,
    right: -40,
    opacity: 0.6,
  },
  blobSide: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: "#FCE7F3",
    bottom: -120,
    left: -60,
    opacity: 0.45,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  babyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  babyAvatar: {
    width: 44,
    height: 44,
    borderRadius: 18,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  babyEmoji: {
    fontSize: 24,
  },
  babyName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  babyMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
  badgeSoft: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#1D4ED8",
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  list: {},
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#A5B4FC",
    marginRight: 8,
  },
  listText: {
    fontSize: 12,
    color: "#4B5563",
    flex: 1,
  },
  bold: {
    fontWeight: "600",
    color: "#111827",
  },
  infoCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    marginRight: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#E5E7EB",
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },
  tagChip: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagChipSafe: {
    backgroundColor: "rgba(22,163,74,0.1)",
  },
  tagChipWarn: {
    backgroundColor: "rgba(234,179,8,0.1)",
  },
  tagChipText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#374151",
  },
});
