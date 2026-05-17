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
import { Card, EmojiCircle, SectionPill, IconButton, Eyebrow } from '../components';
import Icon from '../components/Icon';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AIReader'>;

const AI_MEDS = [
  {
    name: 'Prednisolona 10mg',
    use: 'Reduz coceira e inflamação na pele.',
    dose: '1 comprimido · 2x ao dia · 7 dias',
    emoji: '💊', tint: T.tintLavender,
  },
  {
    name: 'Protetor hepático',
    use: 'Apoia o fígado durante o tratamento.',
    dose: '2.5ml · 2x ao dia · 14 dias',
    emoji: '🧴', tint: T.tintSky,
  },
];

const SCHEDULE = [
  { time: '07h', label: 'Manhã', emoji: '🌅', tint: T.tintPeach, med: 'Prednisolona' },
  { time: '15h', label: 'Tarde', emoji: '☀️', tint: T.tintCream, med: 'Prednisolona + Protetor' },
  { time: '23h', label: 'Noite', emoji: '🌙', tint: T.tintLavender, med: 'Protetor' },
];

export default function AIReaderScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <IconButton icon="chevL" onPress={() => navigation.goBack()} />
        <IconButton icon="more" />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow>com inteligência artificial</Eyebrow>
        <Text style={styles.heading}>
          Receita{'\n'}<Text style={styles.headingItalic}>inteligente</Text>
        </Text>
        <Text style={styles.subheading}>
          Lemos sua receita e organizamos os horários pra você.
        </Text>

        {/* document preview card */}
        <Card pad={14} radius={22} style={styles.docCard}>
          {/* striped placeholder */}
          <View style={styles.docThumb}>
            <Text style={styles.docThumbLabel}>RX</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.analyzingBadge}>
              <Text style={styles.analyzingText}>analisando ✨</Text>
            </View>
            <Text style={styles.docName}>receita-leia-12mai.pdf</Text>
            <Text style={styles.docMeta}>Dr. Henrique · CRMV 4821</Text>
            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: '72%' }]} />
              </View>
              <Text style={styles.progressLabel}>72%</Text>
            </View>
          </View>
        </Card>

        {/* identified meds */}
        <View style={{ marginTop: 24 }}>
          <SectionPill icon="💊" label="Identificados" count={2} tint={T.tintLavender} ink={T.tintLavenderInk} />
        </View>
        <View style={{ gap: 8, marginTop: 12 }}>
          {AI_MEDS.map((m, i) => (
            <Card key={i} pad={14} radius={20}>
              <View style={styles.medRow}>
                <EmojiCircle emoji={m.emoji} size={42} tint={m.tint} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.medName}>{m.name}</Text>
                  <Text style={styles.medDose}>{m.dose}</Text>
                </View>
              </View>
              <View style={styles.useBox}>
                <Text style={styles.useLabel}>para que serve</Text>
                <Text style={styles.useText}>{m.use}</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* schedule */}
        <View style={{ marginTop: 24 }}>
          <SectionPill icon="✨" label="Horários sugeridos" count={3} tint={T.tintCream} ink={T.tintCreamInk} />
        </View>
        <Card pad={16} radius={22} style={{ marginTop: 12 }}>
          {SCHEDULE.map((s, i) => (
            <View key={i} style={styles.scheduleRow}>
              {/* vertical line */}
              {i < SCHEDULE.length - 1 && <View style={styles.scheduleLineV} />}
              <View style={styles.scheduleIcon}>
                <EmojiCircle emoji={s.emoji} size={36} tint={s.tint} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
                  <Text style={styles.scheduleTime}>{s.time}</Text>
                  <Text style={styles.scheduleLabel}>· {s.label}</Text>
                </View>
                <Text style={styles.scheduleMed}>{s.med}</Text>
              </View>
            </View>
          ))}
        </Card>

        <TouchableOpacity
          onPress={() => navigation.navigate('Today')}
          style={styles.activateBtn}
          activeOpacity={0.85}
        >
          <Text style={styles.activateBtnText}>Ativar agenda completa</Text>
          <Icon name="arrow" size={16} color="#fff" strokeWidth={2} />
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Você pode ajustar horários a qualquer momento.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 8,
  },
  scroll: { padding: 24, paddingTop: 18, paddingBottom: 32 },
  heading: {
    fontFamily: FONT_DISPLAY, fontSize: 42, color: T.ink,
    letterSpacing: -0.5, lineHeight: 48, marginTop: 8,
  },
  headingItalic: { fontFamily: FONT_DISPLAY_ITALIC },
  subheading: {
    fontFamily: FONT_BODY, fontSize: 14, color: T.inkSoft,
    marginTop: 10, lineHeight: 21,
  },
  docCard: { flexDirection: 'row', gap: 14, alignItems: 'center', marginTop: 22 },
  docThumb: {
    width: 64, height: 82, borderRadius: 14,
    backgroundColor: T.bgWash,
    alignItems: 'center', justifyContent: 'center',
  },
  docThumbLabel: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 12,
    color: T.inkMute, letterSpacing: 0.8,
  },
  analyzingBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 99, backgroundColor: T.brandSoft,
  },
  analyzingText: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 10,
    letterSpacing: 1.2, textTransform: 'uppercase', color: T.brand,
  },
  docName: {
    fontFamily: FONT_BODY_BOLD, fontSize: 14, color: T.ink, marginTop: 6,
  },
  docMeta: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft, marginTop: 2 },
  progressRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10,
  },
  progressTrack: {
    flex: 1, height: 3, borderRadius: 99,
    backgroundColor: T.bgWash, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', backgroundColor: T.brand, borderRadius: 99,
  },
  progressLabel: { fontFamily: FONT_BODY_BOLD, fontSize: 11, color: T.inkSoft },
  medRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  medName: { fontFamily: FONT_BODY_BOLD, fontSize: 15, color: T.ink },
  medDose: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft, marginTop: 2 },
  useBox: {
    marginTop: 12, padding: 12, borderRadius: 14,
    backgroundColor: T.surfaceLo,
  },
  useLabel: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 10,
    letterSpacing: 1.2, textTransform: 'uppercase', color: T.inkMute, marginBottom: 4,
  },
  useText: { fontFamily: FONT_BODY, fontSize: 13, color: T.ink, lineHeight: 19 },
  scheduleRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingVertical: 8, position: 'relative',
  },
  scheduleLineV: {
    position: 'absolute', left: 17, top: 48, bottom: -8,
    width: 2, backgroundColor: T.inkFaint,
  },
  scheduleIcon: { zIndex: 1 },
  scheduleTime: {
    fontFamily: FONT_DISPLAY_MEDIUM, fontSize: 22, color: T.ink,
  },
  scheduleLabel: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft },
  scheduleMed: { fontFamily: FONT_BODY, fontSize: 13, color: T.inkSoft, marginTop: 2 },
  activateBtn: {
    marginTop: 22, height: 56, borderRadius: 99,
    backgroundColor: T.ink,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  activateBtnText: { fontFamily: FONT_BODY_SEMIBOLD, fontSize: 15, color: '#fff' },
  footerNote: {
    fontFamily: FONT_BODY, fontSize: 12, color: T.inkMute,
    textAlign: 'center', marginTop: 10,
  },
});
