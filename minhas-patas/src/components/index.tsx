import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { T, FONT_BODY, FONT_BODY_BOLD, FONT_BODY_EXTRABOLD, FONT_DISPLAY, FONT_DISPLAY_ITALIC, FONT_DISPLAY_MEDIUM, FONT_BODY_SEMIBOLD } from '../theme';
import Icon from './Icon';
import type { PATHS } from './Icon';

// ── EmojiCircle ──────────────────────────────────────────────────
interface EmojiCircleProps {
  emoji: string;
  size?: number;
  tint?: string;
  style?: ViewStyle;
}
export function EmojiCircle({ emoji, size = 44, tint = T.tintLavender, style }: EmojiCircleProps) {
  return (
    <View style={[{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: tint,
      alignItems: 'center', justifyContent: 'center',
    }, style]}>
      <Text style={{ fontSize: size * 0.46 }}>{emoji}</Text>
    </View>
  );
}

// ── CheckBubble ──────────────────────────────────────────────────
interface CheckBubbleProps {
  done?: boolean;
  size?: number;
  color?: string;
  onPress?: () => void;
}
export function CheckBubble({ done = false, size = 28, color = T.brand, onPress }: CheckBubbleProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: size, height: size, borderRadius: size / 2,
        borderWidth: done ? 0 : 2,
        borderColor: T.inkFaint,
        backgroundColor: done ? color : 'transparent',
        alignItems: 'center', justifyContent: 'center',
      }}
      activeOpacity={0.7}
    >
      {done && <Icon name="check" size={size * 0.55} color="#fff" strokeWidth={3} />}
    </TouchableOpacity>
  );
}

// ── Card ────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  pad?: number;
  radius?: number;
}
export function Card({ children, style, onPress, pad = 16, radius = 22 }: CardProps) {
  const cardStyle = {
    backgroundColor: T.surface,
    borderRadius: radius,
    padding: pad,
    shadowColor: '#14141E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  };
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[cardStyle, style]} activeOpacity={0.85}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[cardStyle, style]}>{children}</View>;
}

// ── SectionPill ─────────────────────────────────────────────────
interface SectionPillProps {
  icon?: string;
  label: string;
  count?: number;
  tint?: string;
  ink?: string;
  style?: ViewStyle;
}
export function SectionPill({ icon, label, count, tint = T.tintLavender, ink = T.tintLavenderInk, style }: SectionPillProps) {
  return (
    <View style={[{
      flexDirection: 'row', alignItems: 'center', gap: 6,
      paddingHorizontal: 14, paddingVertical: 8,
      borderRadius: 999, backgroundColor: tint,
      alignSelf: 'flex-start',
    }, style]}>
      {icon && <Text style={{ fontSize: 14 }}>{icon}</Text>}
      <Text style={{
        fontFamily: FONT_BODY_EXTRABOLD, fontSize: 11,
        letterSpacing: 1.2, textTransform: 'uppercase', color: ink,
      }}>
        {label}{count != null ? ` (${count})` : ''}
      </Text>
      <Icon name="chevD" size={12} color={ink} strokeWidth={2.2} />
    </View>
  );
}

// ── IconButton ───────────────────────────────────────────────────
interface IconButtonProps {
  icon: keyof typeof PATHS;
  onPress?: () => void;
  size?: number;
  style?: ViewStyle;
}
export function IconButton({ icon, onPress, size = 40, style }: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        width: size, height: size, borderRadius: size / 2,
        backgroundColor: T.surface,
        alignItems: 'center', justifyContent: 'center',
        shadowColor: '#14141E',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }, style]}
      activeOpacity={0.75}
    >
      <Icon name={icon} size={18} color={T.ink} strokeWidth={2} />
    </TouchableOpacity>
  );
}

// ── Display (serif heading) ──────────────────────────────────────
interface DisplayProps {
  children: React.ReactNode;
  size?: number;
  italic?: boolean;
  style?: TextStyle;
}
export function Display({ children, size = 44, italic = false, style }: DisplayProps) {
  return (
    <Text style={[{
      fontFamily: italic ? FONT_DISPLAY_ITALIC : FONT_DISPLAY,
      fontSize: size,
      lineHeight: size * 1.08,
      letterSpacing: -0.5,
      color: T.ink,
    }, style]}>
      {children}
    </Text>
  );
}

// ── Eyebrow ──────────────────────────────────────────────────────
interface EyebrowProps {
  children: React.ReactNode;
  color?: string;
  style?: TextStyle;
}
export function Eyebrow({ children, color = T.inkMute, style }: EyebrowProps) {
  return (
    <Text style={[{
      fontFamily: FONT_BODY_EXTRABOLD,
      fontSize: 11, letterSpacing: 1.4,
      textTransform: 'uppercase', color,
    }, style]}>
      {children}
    </Text>
  );
}

// ── Mascot (Leia photo in circular crop) ─────────────────────────
interface MascotProps {
  size?: number;
}
export function Mascot({ size = 200 }: MascotProps) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* glow */}
      <View style={{
        position: 'absolute',
        width: size * 0.92, height: size * 0.92,
        borderRadius: (size * 0.92) / 2,
        backgroundColor: T.brand,
        opacity: 0.30,
        top: '4%', left: '2%',
      }} />
      <View style={{
        width: size, height: size, borderRadius: size / 2,
        overflow: 'hidden',
        backgroundColor: '#F5C8DC',
        borderWidth: 4, borderColor: T.surface,
        shadowColor: '#14141E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
      }}>
        <Image
          source={require('../../assets/leia.jpg')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

// ── MascotAvatar (small) ────────────────────────────────────────
interface MascotAvatarProps {
  size?: number;
  photo?: boolean;
  hue?: number;
}
export function MascotAvatar({ size = 40, photo = false }: MascotAvatarProps) {
  if (photo) {
    return (
      <View style={{
        width: size, height: size, borderRadius: size / 2,
        overflow: 'hidden', backgroundColor: '#F5C8DC',
      }}>
        <Image
          source={require('../../assets/leia.jpg')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>
    );
  }
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: '#D8E8F5',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ fontSize: size * 0.5 }}>🐶</Text>
    </View>
  );
}

// ── UserAvatar ──────────────────────────────────────────────────
interface UserAvatarProps {
  size?: number;
  name?: string;
}
export function UserAvatar({ size = 40, name = 'T' }: UserAvatarProps) {
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: '#D4804A',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{
        fontFamily: FONT_BODY_EXTRABOLD,
        fontSize: size * 0.42, color: '#fff', letterSpacing: 0.3,
      }}>
        {(name[0] || 'T').toUpperCase()}
      </Text>
    </View>
  );
}

// ── Toggle ──────────────────────────────────────────────────────
interface ToggleProps {
  on: boolean;
  onToggle: () => void;
}
export function Toggle({ on, onToggle }: ToggleProps) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.8}
      style={{
        width: 44, height: 26, borderRadius: 13,
        backgroundColor: on ? T.brand : T.bgWash,
        justifyContent: 'center',
        paddingHorizontal: 3,
      }}
    >
      <View style={{
        width: 20, height: 20, borderRadius: 10,
        backgroundColor: '#fff',
        alignSelf: on ? 'flex-end' : 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      }} />
    </TouchableOpacity>
  );
}
