import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  T, FONT_BODY, FONT_BODY_BOLD, FONT_BODY_EXTRABOLD, FONT_BODY_SEMIBOLD,
  FONT_DISPLAY, FONT_DISPLAY_ITALIC,
} from '../theme';
import { Card, EmojiCircle, SectionPill, CheckBubble, IconButton } from '../components';
import BottomNav from '../components/BottomNav';
import Icon from '../components/Icon';

interface Event {
  s: string;
  time: string;
  emoji: string;
  tint: string;
  title: string;
  sub: string;
  done: boolean;
  late?: boolean;
}

const INITIAL_EVENTS: Event[] = [
  { s: 'm', time: '07:00', emoji: '🥣', tint: T.tintCream, title: 'Café da manhã', sub: 'Ração 80g', done: true },
  { s: 'm', time: '08:00', emoji: '💊', tint: T.tintLavender, title: 'Apoquel 16mg', sub: '1 comprimido', done: true },
  { s: 'a', time: '10:30', emoji: '🚶', tint: T.tintPeach, title: 'Passeio matinal', sub: '30 min · Parque', done: false, late: true },
  { s: 'a', time: '12:30', emoji: '🥗', tint: T.tintMint, title: 'Almoço da Leia', sub: 'Sachê de frango', done: false },
  { s: 'a', time: '15:00', emoji: '💊', tint: T.tintLavender, title: 'Prednisolona 10mg', sub: '1 comp · após refeição', done: false },
  { s: 'n', time: '18:00', emoji: '🦴', tint: T.tintPeach, title: 'Passeio da tarde', sub: '20 min', done: false },
  { s: 'n', time: '22:00', emoji: '🧴', tint: T.tintSky, title: 'Protetor hepático', sub: '2.5ml líquido', done: false },
];

interface TaskRowProps {
  time: string;
  emoji: string;
  tint: string;
  title: string;
  sub: string;
  done: boolean;
  late?: boolean;
  onToggle: () => void;
}

function TaskRow({ time, emoji, tint, title, sub, done, late, onToggle }: TaskRowProps) {
  return (
    <Card pad={14} radius={20} style={{ opacity: done ? 0.55 : 1 }}>
      <View style={styles.taskRow}>
        <EmojiCircle emoji={emoji} size={42} tint={tint} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Text style={[styles.taskTitle, done && styles.taskTitleDone]}>{title}</Text>
            {late && !done && (
              <View style={styles.lateBadge}>
                <Text style={styles.lateBadgeText}>atrasado</Text>
              </View>
            )}
          </View>
          <Text style={styles.taskSub}>{time} · {sub}</Text>
        </View>
        <CheckBubble done={done} onPress={onToggle} />
      </View>
    </Card>
  );
}

export default function TodayScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const toggle = (i: number) =>
    setEvents(events.map((e, idx) =>
      idx === i ? { ...e, done: !e.done, late: e.done ? e.late : false } : e
    ) as Event[]);

  const morning = events.map((e, i) => ({ ...e, i })).filter(e => e.s === 'm');
  const afternoon = events.map((e, i) => ({ ...e, i })).filter(e => e.s === 'a');
  const night = events.map((e, i) => ({ ...e, i })).filter(e => e.s === 'n');
  const done = events.filter(e => e.done).length;
  const total = events.length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* top row */}
      <View style={styles.topBar}>
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>🎉 {done}/{total}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <IconButton icon="more" />
          <IconButton icon="plus" />
        </View>
      </View>

      {/* date display */}
      <View style={styles.dateBlock}>
        <Icon name="chevL" size={22} color={T.inkFaint} strokeWidth={2} />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.dayText}>Segunda</Text>
          <Text style={styles.dateText}>14 de maio, 2026</Text>
        </View>
        <Icon name="chevR" size={22} color={T.inkFaint} strokeWidth={2} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* anytime */}
        <SectionPill icon="🕘" label="Em qualquer hora" count={0} tint={T.bgWash} ink={T.inkSoft} />
        <View style={styles.anytimeBox}>
          <Text style={styles.anytimeText}>Qualquer hora cai bem</Text>
          <Icon name="plus" size={16} color={T.inkMute} strokeWidth={2} />
        </View>

        {/* morning */}
        <SectionPill icon="🌅" label="Manhã" count={morning.length} tint={T.tintPeach} ink={T.tintPeachInk} />
        <View style={{ gap: 8, marginTop: 12, marginBottom: 22 }}>
          {morning.map(e => <TaskRow key={e.i} {...e} onToggle={() => toggle(e.i)} />)}
        </View>

        {/* afternoon */}
        <SectionPill icon="☀️" label="Tarde" count={afternoon.length} tint={T.tintLavender} ink={T.tintLavenderInk} />
        <View style={{ gap: 8, marginTop: 12, marginBottom: 22 }}>
          {afternoon.map(e => <TaskRow key={e.i} {...e} onToggle={() => toggle(e.i)} />)}
        </View>

        {/* night */}
        <SectionPill icon="🌙" label="Noite" count={night.length} tint={T.tintSky} ink={T.tintSkyInk} />
        <View style={{ gap: 8, marginTop: 12 }}>
          {night.map(e => <TaskRow key={e.i} {...e} onToggle={() => toggle(e.i)} />)}
        </View>
      </ScrollView>

      <BottomNav active="today" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 8,
  },
  progressBadge: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 99, backgroundColor: T.surface,
    shadowColor: '#14141E',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  progressText: { fontFamily: FONT_BODY_BOLD, fontSize: 13, color: T.ink },
  dateBlock: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingTop: 30, paddingBottom: 0,
  },
  dayText: {
    fontFamily: FONT_DISPLAY, fontSize: 56, color: T.ink,
    lineHeight: 62, letterSpacing: -0.5,
  },
  dateText: { fontFamily: FONT_BODY, fontSize: 16, color: T.inkSoft, marginTop: 6 },
  scroll: { padding: 24, paddingTop: 22, paddingBottom: 16, gap: 0 },
  anytimeBox: {
    marginTop: 10, marginBottom: 18,
    padding: 18, borderRadius: 18,
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: T.hairlineStrong,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  anytimeText: { fontFamily: FONT_BODY, fontSize: 14, color: T.inkMute },
  taskRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  taskTitle: { fontFamily: FONT_BODY_BOLD, fontSize: 15, color: T.ink },
  taskTitleDone: { textDecorationLine: 'line-through' },
  taskSub: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft, marginTop: 2 },
  lateBadge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 99,
    backgroundColor: T.tintRose,
  },
  lateBadgeText: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 10,
    letterSpacing: 0.8, textTransform: 'uppercase', color: T.tintRoseInk,
  },
});
