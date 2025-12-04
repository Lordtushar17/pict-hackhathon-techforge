import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter,  type Href } from 'expo-router';
import RoleTabs from '@/components/auth/RoleTabs';
import ParentLoginForm from '@/components/auth/ParentLoginForm';
import HospitalLoginForm from '@/components/auth/HospitalLoginForm';

type Role = 'parent' | 'hospital';

export default function LoginScreen() {
  const [role, setRole] = useState<Role>('parent');
  const router = useRouter();

  const handleParentLogin = () => {
    router.replace('/(tabs)');
  };

  const handleHospitalLogin = () => {
    router.replace('/doctor' as Href);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Soft pastel “blob” background */}
      <View style={styles.bgLayer}>
        <View style={styles.blobPink} />
        <View style={styles.blobBlue} />
        <View style={styles.blobYellow} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.shell}>
          <View style={styles.loginCard}>
            {/* Header */}
            <View style={styles.loginHeader}>
              <View style={styles.logoBadge}>
                <Text style={styles.logoEmoji}>🍼</Text>
              </View>
              <View style={styles.titleBlock}>
                <Text style={styles.appTitle}>BabyGuard</Text>
                <Text style={styles.appSubtitle}>
                  Smart Infant Health Monitoring System
                </Text>
              </View>
            </View>

            {/* Role tabs */}
            <RoleTabs role={role} onChangeRole={setRole} />

            {/* Forms */}
            {role === 'parent' ? (
              <ParentLoginForm onSubmit={handleParentLogin} />
            ) : (
              <HospitalLoginForm onSubmit={handleHospitalLogin} />
            )}
          </View>

          <View style={styles.footer}>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDFBFF', // overall light theme
  },
  bgLayer: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#F9FAFF',
  },
  blobPink: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#FCE7F3',
    top: -80,
    left: -40,
    opacity: 0.7,
  },
  blobBlue: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#DBEAFE',
    top: -40,
    right: -60,
    opacity: 0.7,
  },
  blobYellow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 280,
    backgroundColor: '#FEF9C3',
    bottom: -120,
    alignSelf: 'center',
    opacity: 0.6,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  shell: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  loginCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 32,
    paddingHorizontal: 26,
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.25)',
    shadowColor: '#93C5FD',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 30,
    elevation: 10,
  },
  loginHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 24,
    backgroundColor: '#F9A8D4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  logoEmoji: {
    fontSize: 30,
  },
  titleBlock: {
    flexDirection: 'column',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  footer: {
    marginTop: 12,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
});

