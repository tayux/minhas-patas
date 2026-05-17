import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation';
import {
  T, FONT_DISPLAY, FONT_DISPLAY_ITALIC,
  FONT_BODY, FONT_BODY_BOLD, FONT_BODY_EXTRABOLD, FONT_BODY_SEMIBOLD,
} from '../theme';
import {
  Card, EmojiCircle, SectionPill, CheckBubble,
  IconButton, Display, Eyebrow, MascotAvatar, UserAvatar,
} from '../components';
import BottomNav from '../components/BottomNav';
import Icon from '../components/Icon';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const TILES = [
  { label: 'Saúde', emoji: '🩺', tint: T.tintRose, ink: T.tintRoseInk, sub: 'em dia', to: 'Pet' },
  { label: 'Medicamentos', emoji: '💊', tint: T.tintLavender, ink: T.tintLavenderInk, sub: '5 ativos', to: 'Meds' },
  { label: 'Finanças', emoji: '🪙', tint: T.tintMint, ink: T.tintMintInk, sub: 'R$ 1.247', to: 'Finance' },
  { label: 'Documentos', emoji: '📁', tint: T.tintCream, ink: T.tintCreamInk, sub: '8 itens', to: 'Pet' },
] as const;

const UPCOMING = [
  { time: '15:00', emoji: '💊', tint: T.tintLavender, title: 'Prednisolona', sub: '10mg · após o almoço', done: false },
  { time: '17:30', emoji: '🚶', tint: T.tintPeach, title: 'Passeio da tarde', sub: '20 min · Leia', done: false, late: true },
];

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [doneStates, setDoneStates] = React.useState([false, false]);

  const toggle = (i: number) =>
    setDoneStates(s => s.map((v, idx) => (idx === i ? !v : v)));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <View style={styles.headerRow}>
          <IconButton icon="burger" />
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <IconButton icon="bell" />
            <UserAvatar size={40} name="Taynara" />
          </View>
        </View>

        {/* greeting */}
        <View style={styles.greetingBlock}>
          <Eyebrow>Segunda · 14 maio</Eyebrow>
          <Text style={styles.greeting}>
            Olá, <Text style={styles.greetingItalic}>Taynara</Text>
          </Text>
        </View>

        {/* pet selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.petScroll}
          contentContainerStyle={{ gap: 8, paddingRight: 24 }}
        >
          {[
            { n: 'Leia', active: true, photo: true },
            { n: 'Filó', photo: false },
            { n: 'Fiapa', photo: false },
          ].map((p, i) => (
            <View
              key={i}
              style={[styles.petPill, p.active && styles.petPillActive]}
            >
              <MascotAvatar size={28} photo={p.photo} />
              <Text style={[styles.petName, p.active && styles.petNameActive]}>{p.n}</Text>
            </View>
          ))}
          <View style={styles.addPetPill}>
            <Icon name="plus" size={14} color={T.inkSoft} strokeWidth={2} />
            <Text style={styles.addPetText}>Adicionar</Text>
          </View>
        </ScrollView>

        {/* 2x2 tiles */}
        <View style={styles.tileGrid}>
          {TILES.map((t, i) => (
            <Card
              key={i}
              pad={16}
              radius={22}
              onPress={() => navigation.navigate(t.to as any)}
              style={styles.tile}
            >
              <EmojiCircle emoji={t.emoji} size={36} tint={t.tint} />
              <View style={{ marginTop: 16 }}>
                <Text style={styles.tileLabel}>{t.label}</Text>
                <Text style={styles.tileSub}>{t.sub}</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* upcoming */}
        <View style={styles.sectionHeader}>
          <SectionPill icon="⏰" label="Próximas doses" count={2} tint={T.tintLavender} ink={T.tintLavenderInk} />
          <TouchableOpacity onPress={() => navigation.navigate('Meds')}>
            <Text style={styles.seeAll}>Ver todas →</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 8 }}>
          {UPCOMING.map((m, i) => (
            <Card key={i} pad={14} radius={20}>
              <View style={styles.upcomingRow}>
                <EmojiCircle emoji={m.emoji} size={42} tint={m.tint} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <Text style={styles.upcomingTitle}>{m.title}</Text>
                    {m.late && (
                      <View style={styles.lateBadge}>
                        <Text style={styles.lateBadgeText}>atrasado</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.upcomingSub}>{m.time} · {m.sub}</Text>
                </View>
                <CheckBubble done={doneStates[i]} onPress={() => toggle(i)} />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      <BottomNav active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  scroll: { paddingHorizontal: 24, paddingBottom: 16 },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 8,
  },
  greetingBlock: { marginTop: 32, alignItems: 'center' },
  greeting: {
    fontFamily: FONT_DISPLAY, fontSize: 46, color: T.ink,
    letterSpacing: -0.5, lineHeight: 52, marginTop: 8,
  },
  greetingItalic: { fontFamily: FONT_DISPLAY_ITALIC },
  petScroll: { marginTop: 28 },
  petPill: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingLeft: 5, paddingRight: 14, paddingVertical: 5,
    borderRadius: 99, backgroundColor: T.surface,
    shadowColor: '#14141E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  petPillActive: { backgroundColor: T.ink },
  petName: {
    fontFamily: FONT_BODY_SEMIBOLD, fontSize: 13, color: T.ink,
  },
  petNameActive: { color: '#fff' },
  addPetPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingLeft: 8, paddingRight: 14, paddingVertical: 5,
    borderRadius: 99,
    borderWidth: 1, borderStyle: 'dashed', borderColor: T.hairlineStrong,
  },
  addPetText: {
    fontFamily: FONT_BODY_SEMIBOLD, fontSize: 13, color: T.inkSoft,
  },
  tileGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24,
  },
  tile: { width: '47.5%', height: 112, justifyContent: 'space-between' },
  tileLabel: { fontFamily: FONT_BODY_BOLD, fontSize: 15, color: T.ink },
  tileSub: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft, marginTop: 2 },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 28, marginBottom: 14,
  },
  seeAll: { fontFamily: FONT_BODY_SEMIBOLD, fontSize: 12, color: T.inkSoft },
  upcomingRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  upcomingTitle: { fontFamily: FONT_BODY_BOLD, fontSize: 15, color: T.ink },
  upcomingSub: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft, marginTop: 2 },
  lateBadge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99,
    backgroundColor: T.tintRose,
  },
  lateBadgeText: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 10,
    letterSpacing: 0.8, textTransform: 'uppercase', color: T.tintRoseInk,
  },
});
