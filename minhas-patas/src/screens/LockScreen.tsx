import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { T, FONT_DISPLAY, FONT_DISPLAY_ITALIC, FONT_BODY, FONT_BODY_BOLD, FONT_BODY_EXTRABOLD } from '../theme';
import Icon from '../components/Icon';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Lock'>;

export default function LockScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <LinearGradient
      colors={['#C9BEFF', '#B3A6FF', '#9E8FF7']}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 0.85, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* decorative blobs */}
      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

      {/* lock icon */}
      <View style={styles.lockWrap}>
        <Text style={styles.lockEmoji}>🔒</Text>
      </View>

      {/* time + date */}
      <View style={styles.timeBlock}>
        <Text style={styles.dateText}>segunda-feira, 14 de maio</Text>
        <Text style={styles.timeText}>15:00</Text>
      </View>

      {/* main notification card */}
      <View style={styles.notifArea}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.92}
          style={styles.notifCard}
        >
          <View style={styles.notifHeader}>
            <View style={styles.appIconWrap}>
              <Text style={{ fontSize: 12 }}>🐾</Text>
            </View>
            <Text style={styles.appName}>MINHASPATAS</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.notifTime}>agora</Text>
          </View>
          <Text style={styles.notifTitle}>
            Hora do remédio da <Text style={{ fontFamily: FONT_DISPLAY_ITALIC }}>Leia</Text>
          </Text>
          <Text style={styles.notifBody}>
            Prednisolona 10mg — dar com comida.{'\n'}Deslize para confirmar.
          </Text>
          <View style={styles.notifActions}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.confirmBtn}
              activeOpacity={0.8}
            >
              <Icon name="check" size={14} color="#fff" strokeWidth={3} />
              <Text style={styles.confirmBtnText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.snoozeBtn} activeOpacity={0.8}>
              <Text style={styles.snoozeBtnText}>Adiar 15min</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* secondary notification */}
        <View style={styles.secondaryNotif}>
          <View style={styles.secondaryIcon}>
            <Text style={{ fontSize: 10 }}>📅</Text>
          </View>
          <Text style={styles.secondaryLabel}>LEMBRETE</Text>
          <View style={{ flex: 1 }} />
          <Text style={styles.secondaryTime}>14:00</Text>
          <Text style={styles.secondaryTitle}>Passeio da Leia em 1h</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  blobTop: {
    position: 'absolute', top: -50, left: -40,
    width: 240, height: 240, borderRadius: 120,
    backgroundColor: 'rgba(255,236,210,0.4)',
  },
  blobBottom: {
    position: 'absolute', bottom: 140, right: -60,
    width: 280, height: 280, borderRadius: 140,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  lockWrap: {
    position: 'absolute', top: 56, alignSelf: 'center',
  },
  lockEmoji: { fontSize: 18, opacity: 0.6 },
  timeBlock: {
    alignItems: 'center',
    paddingTop: 92,
  },
  dateText: {
    fontFamily: FONT_DISPLAY_ITALIC,
    fontSize: 18, fontWeight: '400',
    color: T.ink, opacity: 0.75, letterSpacing: 0.2,
  },
  timeText: {
    fontFamily: FONT_DISPLAY,
    fontSize: 88, fontWeight: '300',
    lineHeight: 96, letterSpacing: -3,
    color: T.ink, marginTop: 4,
  },
  notifArea: {
    paddingHorizontal: 14, paddingTop: 32, gap: 8,
  },
  notifCard: {
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 22,
    padding: 14,
    paddingBottom: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.7)',
    shadowColor: '#140A28',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 30,
    elevation: 8,
  },
  notifHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  appIconWrap: {
    width: 22, height: 22, borderRadius: 6,
    backgroundColor: T.ink,
    alignItems: 'center', justifyContent: 'center',
  },
  appName: {
    fontFamily: FONT_BODY_EXTRABOLD,
    fontSize: 11, color: T.inkSoft, letterSpacing: 0.5,
  },
  notifTime: {
    fontFamily: FONT_BODY,
    fontSize: 12, color: T.inkSoft,
  },
  notifTitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: 19, fontWeight: '500',
    color: T.ink, lineHeight: 26,
  },
  notifBody: {
    fontFamily: FONT_BODY,
    fontSize: 13, color: T.inkSoft,
    marginTop: 4, lineHeight: 19,
  },
  notifActions: {
    flexDirection: 'row',
    gap: 8, marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  confirmBtn: {
    flex: 1, height: 38, borderRadius: 12,
    backgroundColor: T.ink,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  confirmBtnText: {
    fontFamily: FONT_BODY_BOLD, fontSize: 13, color: '#fff',
  },
  snoozeBtn: {
    flex: 1, height: 38, borderRadius: 12,
    backgroundColor: 'rgba(20,20,30,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  snoozeBtnText: {
    fontFamily: FONT_BODY_BOLD, fontSize: 13, color: T.ink,
  },
  secondaryNotif: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.35)',
    gap: 8,
  },
  secondaryIcon: {
    width: 18, height: 18, borderRadius: 5,
    backgroundColor: 'rgba(20,20,30,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  secondaryLabel: {
    fontFamily: FONT_BODY_EXTRABOLD,
    fontSize: 11, letterSpacing: 0.5, opacity: 0.7, color: T.ink,
  },
  secondaryTime: {
    fontFamily: FONT_BODY,
    fontSize: 11, opacity: 0.7, color: T.ink,
  },
  secondaryTitle: {
    fontFamily: FONT_BODY_BOLD,
    fontSize: 13, color: T.ink,
    width: '100%', marginTop: -4,
  },
});
