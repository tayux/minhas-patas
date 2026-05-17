import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import {
  T, FONT_DISPLAY, FONT_DISPLAY_ITALIC,
  FONT_BODY, FONT_BODY_SEMIBOLD, FONT_BODY_BOLD,
} from '../theme';
import { Mascot } from '../components';
import Icon from '../components/Icon';
import Svg, { Path } from 'react-native-svg';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 7.9-21.1l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.3-.4-3.5z" />
      <Path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z" />
      <Path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5A20 20 0 0 0 24 44z" />
      <Path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C41 35.9 44 30.4 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </Svg>
  );
}

export default function OnboardingScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F6F3FF', '#EDE8FF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.hero}>
        <Mascot size={240} />
        <View style={styles.titleBlock}>
          <Text style={styles.title}>
            minhas<Text style={styles.titleItalic}>patas</Text>
          </Text>
          <Text style={styles.tagline}>
            A rotina do seu melhor amigo, organizada com calma.
          </Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.googleBtn}
          activeOpacity={0.85}
        >
          <GoogleIcon size={18} />
          <Text style={styles.googleBtnText}>Continuar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.emailBtn}
          activeOpacity={0.85}
        >
          <Icon name="mail" size={16} color="#fff" strokeWidth={2} />
          <Text style={styles.emailBtnText}>Continuar com e-mail</Text>
        </TouchableOpacity>

        <Text style={styles.loginHint}>
          Já tem conta?{' '}
          <Text style={{ color: T.ink, fontFamily: FONT_BODY_SEMIBOLD, textDecorationLine: 'underline' }}>
            Entrar
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 24, paddingBottom: 28 },
  hero: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28,
  },
  titleBlock: { alignItems: 'center' },
  title: {
    fontFamily: FONT_DISPLAY, fontSize: 48, letterSpacing: -1.4, color: T.ink,
  },
  titleItalic: { fontFamily: FONT_DISPLAY_ITALIC },
  tagline: {
    fontFamily: FONT_BODY, fontSize: 16,
    color: T.inkSoft, marginTop: 12,
    lineHeight: 24, textAlign: 'center', maxWidth: 280,
  },
  buttons: { gap: 10 },
  googleBtn: {
    height: 56, borderRadius: 99,
    backgroundColor: T.surface,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    shadowColor: '#14141E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 3,
  },
  googleBtnText: {
    fontFamily: FONT_BODY_SEMIBOLD, fontSize: 15, color: T.ink,
  },
  emailBtn: {
    height: 56, borderRadius: 99,
    backgroundColor: T.ink,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  emailBtnText: {
    fontFamily: FONT_BODY_SEMIBOLD, fontSize: 15, color: '#fff',
  },
  loginHint: {
    fontFamily: FONT_BODY, fontSize: 13,
    color: T.inkMute, textAlign: 'center', marginTop: 10,
  },
});
