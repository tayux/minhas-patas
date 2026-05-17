import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { T, FONT_BODY_BOLD } from '../theme';
import Icon from './Icon';
import Svg, { Circle, Path } from 'react-native-svg';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type ActiveTab = 'home' | 'today' | 'pet' | 'finance';

interface BottomNavProps {
  active: ActiveTab;
}

function PersonIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="8" r="4" />
      <Path d="M4 21a8 8 0 0 1 16 0" />
    </Svg>
  );
}

function CardIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 6h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      <Circle cx="12" cy="12" r="2.5" />
    </Svg>
  );
}

export default function BottomNav({ active }: BottomNavProps) {
  const navigation = useNavigation<Nav>();

  const items = [
    { id: 'home' as ActiveTab, label: 'Início', iconEl: (color: string) => <Icon name="paw" size={20} color={color} strokeWidth={active === 'home' ? 2.2 : 1.8} /> },
    { id: 'today' as ActiveTab, label: 'Hoje', iconEl: (color: string) => <Icon name="cal" size={20} color={color} strokeWidth={active === 'today' ? 2.2 : 1.8} /> },
    { id: 'pet' as ActiveTab, label: 'Perfil', iconEl: (color: string) => <PersonIcon color={color} size={20} /> },
    { id: 'finance' as ActiveTab, label: 'Finanças', iconEl: (color: string) => <CardIcon color={color} size={20} /> },
  ];

  const navMap: Record<ActiveTab, keyof RootStackParamList> = {
    home: 'Home',
    today: 'Today',
    pet: 'Pet',
    finance: 'Finance',
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.pill}>
        {items.map((item) => {
          const isActive = item.id === active;
          const color = isActive ? T.brand : T.inkSoft;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate(navMap[item.id] as any)}
              style={[styles.tab, isActive && styles.tabActive]}
              activeOpacity={0.7}
            >
              {item.iconEl(color)}
              <Text style={[styles.tabLabel, { color }]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingBottom: 20, paddingTop: 10 },
  pill: {
    backgroundColor: T.surface,
    borderRadius: 99,
    padding: 6,
    flexDirection: 'row',
    shadowColor: '#14141E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 4,
  },
  tab: {
    flex: 1, paddingVertical: 10, borderRadius: 99,
    alignItems: 'center', justifyContent: 'center', gap: 3,
  },
  tabActive: {
    backgroundColor: T.brandSoft,
  },
  tabLabel: {
    fontFamily: FONT_BODY_BOLD, fontSize: 10.5, letterSpacing: 0.2,
  },
});
