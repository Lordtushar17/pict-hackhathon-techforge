import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Role = 'parent' | 'hospital';

interface RoleTabsProps {
  role: Role;
  onChangeRole: (role: Role) => void;
}

export default function RoleTabs({ role, onChangeRole }: RoleTabsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.tab, role === 'parent' && styles.tabActive]}
        onPress={() => onChangeRole('parent')}
      >
        <Text style={[styles.tabText, role === 'parent' && styles.tabTextActive]}>
          Parent / Caregiver
        </Text>
      </Pressable>

      <Pressable
        style={[styles.tab, role === 'hospital' && styles.tabActive]}
        onPress={() => onChangeRole('hospital')}
      >
        <Text style={[styles.tabText, role === 'hospital' && styles.tabTextActive]}>
          Hospital / Clinic
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
    padding: 4,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#C4B5FD',
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#111827',
  },
});
