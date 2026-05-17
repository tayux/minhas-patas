import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

interface IconProps {
  name: keyof typeof PATHS;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const PATHS = {
  paw: 'paw',
  bell: 'bell',
  plus: 'plus',
  chevR: 'chevR',
  chevL: 'chevL',
  chevD: 'chevD',
  check: 'check',
  search: 'search',
  cal: 'cal',
  scan: 'scan',
  mail: 'mail',
  edit: 'edit',
  more: 'more',
  arrow: 'arrow',
  download: 'download',
  burger: 'burger',
} as const;

export default function Icon({ name, size = 22, color = '#1A1A1F', strokeWidth = 1.8 }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'paw':
      return (
        <Svg {...props}>
          <Circle cx="6" cy="11" r="2" />
          <Circle cx="10" cy="6" r="2" />
          <Circle cx="14" cy="6" r="2" />
          <Circle cx="18" cy="11" r="2" />
          <Path d="M8 17c0-2.5 1.8-4 4-4s4 1.5 4 4-1.8 4-4 4-4-1.5-4-4z" />
        </Svg>
      );
    case 'bell':
      return (
        <Svg {...props}>
          <Path d="M6 9a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8z" />
          <Path d="M10 21a2 2 0 0 0 4 0" />
        </Svg>
      );
    case 'plus':
      return (
        <Svg {...props}>
          <Path d="M12 5v14M5 12h14" />
        </Svg>
      );
    case 'chevR':
      return (
        <Svg {...props}>
          <Path d="M9 6l6 6-6 6" />
        </Svg>
      );
    case 'chevL':
      return (
        <Svg {...props}>
          <Path d="M15 6l-6 6 6 6" />
        </Svg>
      );
    case 'chevD':
      return (
        <Svg {...props}>
          <Path d="M6 9l6 6 6-6" />
        </Svg>
      );
    case 'check':
      return (
        <Svg {...props}>
          <Path d="M5 12l5 5L20 7" />
        </Svg>
      );
    case 'search':
      return (
        <Svg {...props}>
          <Circle cx="11" cy="11" r="7" />
          <Path d="M21 21l-4-4" />
        </Svg>
      );
    case 'cal':
      return (
        <Svg {...props}>
          <Rect x="3" y="5" width="18" height="16" rx="2" />
          <Path d="M3 9h18M8 3v4M16 3v4" />
        </Svg>
      );
    case 'scan':
      return (
        <Svg {...props}>
          <Path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
        </Svg>
      );
    case 'mail':
      return (
        <Svg {...props}>
          <Rect x="3" y="5" width="18" height="14" rx="2" />
          <Path d="M3 7l9 6 9-6" />
        </Svg>
      );
    case 'edit':
      return (
        <Svg {...props}>
          <Path d="M4 20h4l11-11-4-4L4 16v4z" />
          <Path d="M14 6l4 4" />
        </Svg>
      );
    case 'more':
      return (
        <Svg {...props} fill={color}>
          <Circle cx="6" cy="12" r="1.5" />
          <Circle cx="12" cy="12" r="1.5" />
          <Circle cx="18" cy="12" r="1.5" />
        </Svg>
      );
    case 'arrow':
      return (
        <Svg {...props}>
          <Path d="M5 12h14M13 6l6 6-6 6" />
        </Svg>
      );
    case 'download':
      return (
        <Svg {...props}>
          <Path d="M12 3v14M6 13l6 6 6-6M5 21h14" />
        </Svg>
      );
    case 'burger':
      return (
        <Svg {...props}>
          <Path d="M5 8h14M5 16h8" />
        </Svg>
      );
    default:
      return null;
  }
}
