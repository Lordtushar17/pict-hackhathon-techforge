import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

interface ParentLoginFormProps {
  onSubmit: () => void;
}

export default function ParentLoginForm({ onSubmit }: ParentLoginFormProps) {
  return (
    <View>
      <Text style={styles.title}>Parent Login</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          placeholderTextColor="#a2a7b1ff"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#a2a7b1ff"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.checkboxText}>Remember me</Text>
        <Pressable>
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>
      </View>

      <Pressable style={styles.primaryButton} onPress={onSubmit}>
        <Text style={styles.primaryButtonText}>Continue to Baby Dashboard</Text>
      </Pressable>

      <Text style={styles.helper}>
        New parent? <Text style={styles.link}>Create account</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 11,
    color: '#6B7280',
  },
  link: {
    fontSize: 11,
    color: '#2563EB',
    textDecorationLine: 'underline',
  },
  primaryButton: {
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#60A5FA',
    shadowColor: '#93C5FD',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#F9FAFF',
  },
  helper: {
    marginTop: 10,
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
});
