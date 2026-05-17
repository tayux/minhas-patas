import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import {
  T, FONT_BODY, FONT_BODY_BOLD, FONT_BODY_EXTRABOLD, FONT_BODY_SEMIBOLD,
  FONT_DISPLAY, FONT_DISPLAY_ITALIC, FONT_DISPLAY_MEDIUM,
} from '../theme';
import { Card, EmojiCircle, SectionPill, IconButton, Eyebrow } from '../components';
import BottomNav from '../components/BottomNav';
import Icon from '../components/Icon';

const FIN_MONTHS = [
  { key: 'dez', label: 'Dez', short: 'Dez 2025', total: 980.00, vs: -8 },
  { key: 'jan', label: 'Jan', short: 'Jan 2026', total: 1120.30, vs: 14 },
  { key: 'fev', label: 'Fev', short: 'Fev 2026', total: 1890.40, vs: 69, peak: true },
  { key: 'mar', label: 'Mar', short: 'Mar 2026', total: 1050.00, vs: -44 },
  { key: 'abr', label: 'Abr', short: 'Abr 2026', total: 1418.40, vs: 35 },
  { key: 'mai', label: 'Mai', short: 'Mai 2026', total: 1247.80, vs: -12, current: true },
];

const SEGMENTS = [
  { label: 'Medicamentos', pct: 43.5, color: T.brand },
  { label: 'Consultas', pct: 30.5, color: '#5390B0' },
  { label: 'Alimentação', pct: 19.7, color: '#D4A93A' },
  { label: 'Outros', pct: 6.3, color: '#5BA890' },
];

const EXPENSES = [
  { name: 'Veterinário Dr. Henrique', cat: 'Consulta', emoji: '🩺', tint: T.tintRose, date: '12 mai', val: 280.00 },
  { name: 'Prednisolona 10mg', cat: 'Medicamento', emoji: '💊', tint: T.tintLavender, date: '12 mai', val: 68.40 },
  { name: 'Ração Premier sênior', cat: 'Alimentação', emoji: '🥣', tint: T.tintCream, date: '09 mai', val: 145.90 },
  { name: 'Protetor hepático', cat: 'Medicamento', emoji: '🧴', tint: T.tintSky, date: '07 mai', val: 92.50 },
  { name: 'Banho & tosa', cat: 'Outros', emoji: '🛁', tint: T.tintMint, date: '04 mai', val: 80.00 },
];

const fmtBR = (v: number) =>
  v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function DonutChart() {
  const r = 46;
  const circ = 2 * Math.PI * r;
  let acc = 0;
  const segments = SEGMENTS.map(s => {
    const len = (s.pct / 100) * circ;
    const off = circ - acc;
    acc += len;
    return { ...s, len, off };
  });

  return (
    <View style={{ width: 110, height: 110 }}>
      <Svg width="110" height="110" viewBox="0 0 110 110">
        <Circle cx="55" cy="55" r={r} fill="none" stroke={T.bgWash} strokeWidth="12" />
        {segments.map((s, i) => (
          <Circle
            key={i} cx="55" cy="55" r={r}
            fill="none" stroke={s.color} strokeWidth="12"
            strokeDasharray={`${s.len - 2} ${circ}`}
            strokeDashoffset={s.off}
            transform="rotate(-90 55 55)"
            strokeLinecap="butt"
          />
        ))}
      </Svg>
      <View style={styles.donutCenter}>
        <Text style={styles.donutNum}>4</Text>
        <Text style={styles.donutLabel}>categorias</Text>
      </View>
    </View>
  );
}

function BarChart({ selectedKey, onSelect }: { selectedKey: string; onSelect: (k: string) => void }) {
  const max = Math.max(...FIN_MONTHS.map(m => m.total));
  const chartH = 130;
  const peak = FIN_MONTHS.reduce((a, b) => b.total > a.total ? b : a, FIN_MONTHS[0]);

  return (
    <View style={{ marginTop: 16 }}>
      <View style={{ height: chartH, flexDirection: 'row', alignItems: 'flex-end' }}>
        {FIN_MONTHS.map((m, i) => {
          const h = Math.max(6, (m.total / max) * (chartH - 14));
          const isSelected = m.key === selectedKey;
          const isPeak = m.key === peak.key;
          const color = isSelected ? T.ink : isPeak ? T.brand : T.bgWash;
          return (
            <TouchableOpacity
              key={m.key}
              onPress={() => onSelect(m.key)}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}
              activeOpacity={0.7}
            >
              {isPeak && !isSelected && (
                <View style={styles.peakBadge}>
                  <Text style={styles.peakBadgeText}>pico</Text>
                </View>
              )}
              {isSelected && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedBadgeText}>
                    R$ {Math.round(m.total / 100) / 10}k
                  </Text>
                </View>
              )}
              <View style={[styles.bar, { height: h, backgroundColor: color }]} />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        {FIN_MONTHS.map(m => (
          <TouchableOpacity
            key={m.key}
            onPress={() => onSelect(m.key)}
            style={{ flex: 1, alignItems: 'center' }}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.barLabel,
              m.key === selectedKey && styles.barLabelActive,
            ]}>{m.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function FinanceScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedKey, setSelectedKey] = useState('mai');

  const selected = FIN_MONTHS.find(m => m.key === selectedKey)!;
  const prevIdx = FIN_MONTHS.findIndex(m => m.key === selectedKey) - 1;
  const previous = prevIdx >= 0 ? FIN_MONTHS[prevIdx] : null;
  const peak = FIN_MONTHS.reduce((a, b) => b.total > a.total ? b : a, FIN_MONTHS[0]);
  const avg = FIN_MONTHS.reduce((s, m) => s + m.total, 0) / FIN_MONTHS.length;

  const valParts = fmtBR(selected.total).split(',');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <IconButton icon="chevL" onPress={() => navigation.goBack()} />
        <IconButton icon="search" />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Eyebrow>panorama com a Leia</Eyebrow>
        <Text style={styles.heading}>Finanças</Text>

        <View style={styles.subheadRow}>
          <View style={styles.yearPill}>
            <Text style={styles.yearText}>2026</Text>
            <Icon name="chevD" size={12} color={T.inkSoft} strokeWidth={2.2} />
          </View>
          <Text style={styles.avgText}>
            média mensal{' '}
            <Text style={{ color: T.ink, fontFamily: FONT_BODY_BOLD }}>R$ {fmtBR(avg)}</Text>
          </Text>
        </View>

        {/* bar chart card */}
        <Card pad={18} radius={24} style={{ marginTop: 18 }}>
          <View style={styles.chartHeader}>
            <View>
              <Eyebrow>{selected.short}</Eyebrow>
              <View style={styles.totalRow}>
                <Text style={styles.totalCurrency}>R$</Text>
                <Text style={styles.totalInt}>{valParts[0]}</Text>
                <Text style={styles.totalDec}>,{valParts[1]}</Text>
              </View>
              <Text style={styles.tapHint}>toque numa barra para comparar</Text>
            </View>
            <View style={[
              styles.vsBadge,
              { backgroundColor: selected.vs <= 0 ? T.tintMint : T.tintRose }
            ]}>
              <Text style={[
                styles.vsText,
                { color: selected.vs <= 0 ? T.tintMintInk : T.tintRoseInk }
              ]}>
                {selected.vs <= 0 ? '↓' : '↑'} {Math.abs(selected.vs)}%
              </Text>
            </View>
          </View>

          <BarChart selectedKey={selectedKey} onSelect={setSelectedKey} />

          <View style={styles.peakCallout}>
            <Text style={{ fontSize: 18 }}>📈</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.peakCalloutText}>
                <Text style={{ color: T.ink, fontFamily: FONT_BODY_BOLD }}>{peak.short}</Text>
                {' '}foi seu mês mais caro
              </Text>
              <Text style={styles.peakCalloutSub}>
                R$ {fmtBR(peak.total)} · +{Math.round((peak.total / avg - 1) * 100)}% da média
              </Text>
            </View>
          </View>
        </Card>

        {/* comparison */}
        {previous && (
          <Card pad={16} radius={22} style={{ marginTop: 12 }}>
            <Eyebrow>comparativo</Eyebrow>
            <View style={styles.compareRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.compareMonth}>{selected.short}</Text>
                <Text style={styles.compareVal}>
                  R$ {fmtBR(selected.total).split(',')[0]}
                  <Text style={styles.compareValDec}>,{fmtBR(selected.total).split(',')[1]}</Text>
                </Text>
              </View>
              <View style={styles.compareDivider} />
              <View style={{ flex: 1 }}>
                <Text style={styles.compareMonth}>{previous.short}</Text>
                <Text style={[styles.compareVal, { color: T.inkSoft }]}>
                  R$ {fmtBR(previous.total).split(',')[0]}
                  <Text style={styles.compareValDec}>,{fmtBR(previous.total).split(',')[1]}</Text>
                </Text>
              </View>
            </View>
            <Text style={styles.compareSummary}>
              {selected.total < previous.total ? (
                <>Você economizou{' '}
                  <Text style={{ color: T.tintMintInk, fontFamily: FONT_BODY_BOLD }}>
                    R$ {fmtBR(previous.total - selected.total)}
                  </Text>
                  {' '}em relação ao mês anterior 👏</>
              ) : (
                <>Você gastou{' '}
                  <Text style={{ color: T.tintRoseInk, fontFamily: FONT_BODY_BOLD }}>
                    R$ {fmtBR(selected.total - previous.total)}
                  </Text>
                  {' '}a mais que no mês anterior.</>
              )}
            </Text>
          </Card>
        )}

        {/* donut */}
        <View style={{ marginTop: 24 }}>
          <SectionPill icon="🧭" label={`Categorias · ${selected.label}`} tint={T.tintLavender} ink={T.tintLavenderInk} />
        </View>
        <Card pad={20} radius={22} style={styles.donutCard}>
          <DonutChart />
          <View style={{ flex: 1, gap: 8 }}>
            {SEGMENTS.map((s, i) => (
              <View key={i} style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: s.color }]} />
                <Text style={styles.legendLabel}>{s.label}</Text>
                <Text style={styles.legendPct}>{s.pct}%</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* expenses */}
        <View style={{ marginTop: 26 }}>
          <SectionPill icon="📋" label="Gastos recentes" count={5} tint={T.tintCream} ink={T.tintCreamInk} />
        </View>
        <Card pad={0} radius={22} style={{ marginTop: 12, overflow: 'hidden' }}>
          {EXPENSES.map((e, i) => (
            <View
              key={i}
              style={[styles.expenseRow, i < EXPENSES.length - 1 && styles.expenseBorder]}
            >
              <EmojiCircle emoji={e.emoji} size={36} tint={e.tint} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.expenseName} numberOfLines={1}>{e.name}</Text>
                <Text style={styles.expenseMeta}>{e.cat} · {e.date}</Text>
              </View>
              <Text style={styles.expenseVal}>{e.val.toFixed(2).replace('.', ',')}</Text>
            </View>
          ))}
        </Card>

        {/* actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.exportBtn} activeOpacity={0.8}>
            <Icon name="download" size={16} color={T.ink} strokeWidth={2} />
            <Text style={styles.exportBtnText}>Exportar PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
            <Icon name="plus" size={16} color="#fff" strokeWidth={2.4} />
            <Text style={styles.addBtnText}>Adicionar gasto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav active="finance" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: T.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 8,
  },
  scroll: { padding: 24, paddingTop: 18, paddingBottom: 16 },
  heading: {
    fontFamily: FONT_DISPLAY, fontSize: 42, color: T.ink,
    letterSpacing: -0.5, lineHeight: 48, marginTop: 8,
  },
  subheadRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12, flexWrap: 'wrap' },
  yearPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 99,
    backgroundColor: T.surface,
    shadowColor: '#14141E', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  yearText: { fontFamily: FONT_BODY_SEMIBOLD, fontSize: 13, color: T.ink },
  avgText: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft },
  chartHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  totalRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2, marginTop: 6 },
  totalCurrency: { fontFamily: FONT_DISPLAY, fontSize: 14, color: T.inkSoft },
  totalInt: { fontFamily: FONT_DISPLAY, fontSize: 30, color: T.ink, letterSpacing: -0.6, marginLeft: 4 },
  totalDec: { fontFamily: FONT_DISPLAY, fontSize: 16, color: T.inkSoft },
  tapHint: { fontFamily: FONT_BODY, fontSize: 11, color: T.inkMute, marginTop: 4 },
  vsBadge: {
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99, flexShrink: 0,
  },
  vsText: { fontFamily: FONT_BODY_EXTRABOLD, fontSize: 11, letterSpacing: 0.3 },
  peakBadge: {
    position: 'absolute', top: -20,
    paddingHorizontal: 7, paddingVertical: 3,
    borderRadius: 99, backgroundColor: T.brand,
  },
  peakBadgeText: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 9,
    letterSpacing: 0.6, textTransform: 'uppercase', color: '#fff',
  },
  selectedBadge: {
    position: 'absolute', top: -24,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 99, backgroundColor: T.ink,
  },
  selectedBadgeText: { fontFamily: FONT_BODY_BOLD, fontSize: 10, color: '#fff' },
  bar: { width: '78%', maxWidth: 32, borderRadius: 8 },
  barLabel: {
    fontFamily: FONT_BODY_BOLD, fontSize: 11, color: T.inkMute,
  },
  barLabelActive: { color: T.ink },
  peakCallout: {
    marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 10, borderRadius: 14, backgroundColor: T.surfaceLo,
  },
  peakCalloutText: { fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft, lineHeight: 17 },
  peakCalloutSub: { fontFamily: FONT_BODY, fontSize: 11, color: T.inkMute, marginTop: 2 },
  compareRow: { flexDirection: 'row', alignItems: 'stretch', gap: 12, marginTop: 10 },
  compareMonth: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 11, color: T.inkMute,
    textTransform: 'uppercase', letterSpacing: 0.6,
  },
  compareVal: {
    fontFamily: FONT_DISPLAY, fontSize: 24, color: T.ink,
    marginTop: 4, letterSpacing: -0.4,
  },
  compareValDec: { fontFamily: FONT_DISPLAY, fontSize: 14, color: T.inkSoft },
  compareDivider: { width: 1, backgroundColor: T.hairline },
  compareSummary: {
    fontFamily: FONT_BODY, fontSize: 12, color: T.inkSoft,
    lineHeight: 18, marginTop: 12,
  },
  donutCard: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 12 },
  donutCenter: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
  },
  donutNum: { fontFamily: FONT_DISPLAY_MEDIUM, fontSize: 22, color: T.ink },
  donutLabel: {
    fontFamily: FONT_BODY_EXTRABOLD, fontSize: 9,
    letterSpacing: 1.2, textTransform: 'uppercase', color: T.inkMute, marginTop: 2,
  },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 3 },
  legendLabel: { flex: 1, fontFamily: FONT_BODY_SEMIBOLD, fontSize: 12, color: T.ink },
  legendPct: { fontFamily: FONT_BODY_BOLD, fontSize: 12, color: T.inkSoft },
  expenseRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingHorizontal: 14 },
  expenseBorder: { borderBottomWidth: 1, borderBottomColor: T.hairline },
  expenseName: { fontFamily: FONT_BODY_BOLD, fontSize: 14, color: T.ink },
  expenseMeta: { fontFamily: FONT_BODY, fontSize: 11, color: T.inkSoft, marginTop: 1 },
  expenseVal: { fontFamily: FONT_DISPLAY_MEDIUM, fontSize: 17, color: T.ink },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
  exportBtn: {
    flex: 1, height: 52, borderRadius: 99,
    backgroundColor: T.surface,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    shadowColor: '#14141E', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  exportBtnText: { fontFamily: FONT_BODY_SEMIBOLD, fontSize: 14, color: T.ink },
  addBtn: {
    flex: 1.2, height: 52, borderRadius: 99,
    backgroundColor: T.ink,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  addBtnText: { fontFamily: FONT_BODY_SEMIBOLD, fontSize: 14, color: '#fff' },
});
