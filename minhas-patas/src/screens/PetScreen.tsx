import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import {
  T, FONT_BODY, FONT_BODY_BOLD, FONT_BODY_EXTRABOLD, FONT_BODY_SEMIBOLD,
  FONT_DISPLAY, FONT_DISPLAY_ITALIC, FONT_DISPLAY_MEDIUM,
} from '../theme';
import { Card, EmojiCircle, Mascot, Eyebrow, IconButton } from '../components';
import BottomNav from '../components/BottomNav';
import Icon from '../components/Icon';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Pet'>;

interface PetRow {
  label: string;
  emoji: string;
  tint: string;
  meta: string;
  to: string;
  dot?: boolean;
}

const ROWS: PetRow[] = [
  { label: 'Histórico de saúde', emoji: '❤️', tint: T.tintRose, meta: '12 registros', to: 'Pet' },
  { label: 'Medicamentos ativos', emoji: '💊', tint: T.tintLavender, meta: '5 ativos', dot: true, to: 'Meds' },
  { label: 'Consultas', emoji: '📅', tint: T.tintSky, meta: 'Próxima · 22 mai', to: 'Today' },
  { label: 'Documentos', emoji: '📁', tint: T.tintCream, meta: '8 arquivos', to: 'Pet' },
  { label: 'Vacinas', emoji: '🛡️', tint: T.tintMint, meta: 'Em dia', to: 'Pet' },
  { label: 'Diário & comportamento', emoji: '📓', tint: T.tintPeach, meta: '3 notas esta semana', to: 'Pet' },
];

const STATS = [
  { l: '8', u: 'anos', k: 'idade' },
  { l: '12.3', u: 'kg', k: 'peso' },
  { l: '2018', u: '', k: 'nascimento' },
];

export default function PetScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* lavender gradient header */}
      <View style={styles.gradientBg} />

      {/* top bar */}
      <View style={styles.topBar}>
        <IconButton icon="chevL" onPress={() => navigation.goBack()} />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <IconButton icon="bell" />
          <IconButton icon="more" />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* hero */}
        <View style={styles.heroBlock}>
          <Mascot size={150} />
          <Eyebrow style={{ marginTop: 12 }}>fêmea · castrada · SRD</Eyebrow>
          <Text style={styles.petName}>
            <Text style={styles.petNameItalic}>Leia</Text>
          </Text>

          {/* stat chips */}
          <View style={styles.statsRow}>
            {STATS.map((c, i) => (
              <View key={i} style={styles.statChip}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                  <Text style={styles.statValue}>{c.l}</Text>
                  {c.u ? <Text style={styles.statUnit}>{c.u}</Text> : null}
                </View>
                <Text style={styles.statKey}>{c.k}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* section list */}
        <Card pad={0} radius={22} style={{ overflow: 'hidden', marginTop: 26 }}>
          {ROWS.map((r, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate(r.to as any)}
              style={[styles.listRow, i < ROWS.length - 1 && styles.listRowBorder]}
              activeOpacity={0.7}
            >
              <EmojiCircle emoji={r.emoji} size={38} tint={r.tint} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={styles.rowLabel}>{r.label}</Text>
                  {r.dot && (
                    <View style={{
                      width: 6, height: 6, borderRadius: 3,
                      backgroundColor: T.brand,
                    }} />
                  )}
                </View>
                <Text style={styles.rowMeta}>{r.meta}</Text>
              </View>
              <Icon name="chevR" size={18} color={T.inkMute} strokeWidth={2} />
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
          <Icon name="edit" size={16} color={T.ink} strokeWidth={2} />
          <Text style={styles.editBtnText}>Editar perfil</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav active="pet" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  gradientBg: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 280,
    backgroundColor: T.brandSoft, opacity: 0.4,
    borderBottomLeftRadius: 40, borderBottomRightRadius: 40,
  },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 8,
  },
  scroll: { paddingHorizontal: 24, paddingBottom: 24 },
  heroBlock: { alignItems: 'center', paddingTop: 16, paddingBottom: 0 },
  petName: {
    fontFamily: FONT_DISPLAY, fontSize: 52, color: T.ink,
    lineHeight: 58, marginTop: 6,
  },
  petNameItalic: { fontFamily: FONT_DISPLAY_ITALIC },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 18 },
  statChip: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16,
    backgroundColor: T.surface, alignItems: 'center', minWidth: 70,
    shadowColor: '#14141E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  statValue: {
    fontFamily: FONT_DISPLAY_MEDIUM, fontSize: 22, color: T.ink, lineHeight: 26,
  },
  statUnit: {
    fontFamily: FONT_BODY_SEMIBOLD, fontSize: 12, color: T.inkSoft, marginLeft: 2,
  },
  statKey: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 10,
    color: T.inkMute, letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 4,
  },
  listRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 14, padding: 14, paddingHorizontal: 16,
  },
  listRowBorder: { borderBottomWidth: 1, borderBottomColor: T.hairline },
  rowLabel: { fontFamily: FONT_BODY_BOLD, fontSize: 15, color: T.ink },
  rowMeta: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft, marginTop: 2 },
  editBtn: {
    marginTop: 14, height: 52, borderRadius: 99,
    backgroundColor: T.surface,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: '#14141E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  editBtnText: { fontFamily: FONT_BODY_SEMIBOLD, fontSize: 14, color: T.ink },
});
