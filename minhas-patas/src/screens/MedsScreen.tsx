import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import {
  T, FONT_BODY, FONT_BODY_BOLD, FONT_BODY_EXTRABOLD, FONT_BODY_SEMIBOLD,
  FONT_DISPLAY, FONT_DISPLAY_ITALIC,
} from '../theme';
import { Card, EmojiCircle, SectionPill, IconButton, Eyebrow, Toggle } from '../components';
import Icon from '../components/Icon';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Meds'>;

const INITIAL_MEDS = [
  { name: 'Prednisolona', dose: '10mg · 1x ao dia', next: '15:00', emoji: '💊', tint: T.tintLavender, on: true },
  { name: 'Apoquel', dose: '16mg · diário', next: '08:00', emoji: '💊', tint: T.tintLavender, on: true, late: true },
  { name: 'Protetor hepático', dose: '2.5ml · 2x ao dia', next: '21:00', emoji: '🧴', tint: T.tintSky, on: true },
  { name: 'Suplemento Ômega', dose: '1 cápsula · diário', next: '12:00', emoji: '🐟', tint: T.tintPeach, on: true },
  { name: 'Antibiótico', dose: '500mg · 3x ao dia', next: 'amanhã 07:00', emoji: '💊', tint: T.tintMint, on: false },
];

const FILTERS = [
  { l: 'Ativos', n: 5 },
  { l: 'Concluídos', n: 12 },
  { l: 'Todos', n: 17 },
];

export default function MedsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('Ativos');
  const [meds, setMeds] = useState(INITIAL_MEDS);

  const filtered = filter === 'Concluídos' ? [] : meds;

  const toggleMed = (i: number) =>
    setMeds(meds.map((m, idx) => idx === i ? { ...m, on: !m.on } : m));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* top bar */}
      <View style={styles.topBar}>
        <IconButton icon="chevL" onPress={() => navigation.goBack()} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.topBarEyebrow}>pet</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={styles.topBarPetName}>Leia</Text>
            <Icon name="chevD" size={12} color={T.inkSoft} strokeWidth={2.2} />
          </View>
        </View>
        <IconButton icon="plus" />
      </View>

      {/* heading */}
      <View style={styles.headingBlock}>
        <Eyebrow>Medicamentos</Eyebrow>
        <Text style={styles.heading}>
          Tratamento{'\n'}<Text style={styles.headingItalic}>da Leia</Text>
        </Text>
        <Text style={styles.subheading}>5 ativos · próxima dose às 15:00</Text>
      </View>

      {/* filter tabs */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((f, i) => {
          const active = filter === f.l;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => setFilter(f.l)}
              style={[styles.filterTab, active && styles.filterTabActive]}
              activeOpacity={0.75}
            >
              <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>{f.l}</Text>
              <View style={[styles.filterCount, active && styles.filterCountActive]}>
                <Text style={[styles.filterCountText, active && styles.filterCountTextActive]}>{f.n}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={{ paddingHorizontal: 24, marginBottom: 10 }}>
        <SectionPill icon="⏱️" label="Ativos" count={5} tint={T.tintLavender} ink={T.tintLavenderInk} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 40 }}>🎉</Text>
            <Text style={styles.emptyTitle}>Nenhum tratamento concluído</Text>
            <Text style={styles.emptyBody}>Medicamentos finalizados aparecerão aqui.</Text>
          </View>
        ) : (
          filtered.map((m, i) => (
            <Card key={i} pad={14} radius={20}>
              <View style={styles.medRow}>
                <EmojiCircle emoji={m.emoji} size={42} tint={m.tint} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <Text style={styles.medName}>{m.name}</Text>
                    {m.late && (
                      <View style={styles.lateBadge}>
                        <Text style={styles.lateBadgeText}>atrasado</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.medDose}>{m.dose}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 }}>
                    <Icon name="cal" size={12} color={m.late ? T.tintRoseInk : T.brand} strokeWidth={2} />
                    <Text style={[styles.medNext, { color: m.late ? T.tintRoseInk : T.brand }]}>
                      Próx · {m.next}
                    </Text>
                  </View>
                </View>
                <Toggle on={m.on} onToggle={() => toggleMed(i)} />
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AIReader')}
        style={[styles.fab, { bottom: insets.bottom + 24 }]}
        activeOpacity={0.85}
      >
        <Icon name="scan" size={22} color="#fff" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 8,
  },
  topBarEyebrow: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 11,
    color: T.inkMute, letterSpacing: 1.2, textTransform: 'uppercase',
  },
  topBarPetName: {
    fontFamily: FONT_BODY_BOLD, fontSize: 14, color: T.ink,
  },
  headingBlock: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 0 },
  heading: {
    fontFamily: FONT_DISPLAY, fontSize: 44, color: T.ink,
    letterSpacing: -0.5, lineHeight: 50, marginTop: 8,
  },
  headingItalic: { fontFamily: FONT_DISPLAY_ITALIC },
  subheading: { fontFamily: FONT_BODY, fontSize: 14, color: T.inkSoft, marginTop: 10 },
  filterRow: { paddingHorizontal: 24, paddingVertical: 22, gap: 8 },
  filterTab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
    backgroundColor: T.surface,
    shadowColor: '#14141E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  filterTabActive: { backgroundColor: T.ink },
  filterLabel: { fontFamily: FONT_BODY_SEMIBOLD, fontSize: 13, color: T.ink },
  filterLabelActive: { color: '#fff' },
  filterCount: {
    paddingHorizontal: 7, paddingVertical: 1, borderRadius: 99,
    backgroundColor: T.bgWash,
  },
  filterCountActive: { backgroundColor: 'rgba(255,255,255,0.18)' },
  filterCountText: { fontFamily: FONT_BODY, fontSize: 11, color: T.inkSoft },
  filterCountTextActive: { color: '#fff' },
  listContent: { paddingHorizontal: 24, paddingBottom: 100, gap: 8 },
  medRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  medName: { fontFamily: FONT_BODY_BOLD, fontSize: 15, color: T.ink },
  medDose: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft, marginTop: 2 },
  medNext: { fontFamily: FONT_BODY_BOLD, fontSize: 12 },
  lateBadge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99,
    backgroundColor: T.tintRose,
  },
  lateBadgeText: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 10,
    letterSpacing: 0.8, textTransform: 'uppercase', color: T.tintRoseInk,
  },
  emptyState: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: 20 },
  emptyTitle: { fontFamily: FONT_BODY_BOLD, fontSize: 16, color: T.ink, marginTop: 8 },
  emptyBody: { fontFamily: FONT_BODY, fontSize: 13, color: T.inkMute, marginTop: 4 },
  fab: {
    position: 'absolute', right: 22,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: T.ink,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#14141E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
});
