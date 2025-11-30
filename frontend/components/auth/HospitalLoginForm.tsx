import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

interface HospitalLoginFormProps {
  onSubmit: () => void;
}

export default function HospitalLoginForm({ onSubmit }: HospitalLoginFormProps) {
  return (
    <View>
      <Text style={styles.title}>Hospital / Clinic Login</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Hospital ID or Email</Text>
        <TextInput
          placeholder="HOSP-001 or admin@hospital.com"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="••••••••"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.checkboxText}>Keep me signed in</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={onSubmit}>
        <Text style={styles.primaryButtonText}>
          Continue to Hospital Console
        </Text>
      </Pressable>

      <Text style={styles.helper}>
        Need access? <Text style={styles.link}>Request onboarding</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 14,
  },
  field: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 4,
  },
  input: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 13,
    backgroundColor: '#F9FAFB',
    shadowColor: '#E5E7EB',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    marginTop: 4,
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 11,
    color: '#6B7280',
  },
  primaryButton: {
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34D399', // soft green for hospital
    shadowColor: '#6EE7B7',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#022C22',
  },
  helper: {
    marginTop: 10,
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  link: {
    fontSize: 11,
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
});
