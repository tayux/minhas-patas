// MinhasPatas — design tokens, icons, shared components

const MP = {
  // Brand & semantic colors
  primary: '#6B5BFF',           // violet, brand
  primaryDeep: '#4B3FD9',
  primarySoft: '#EFEBFF',
  primarySofter: '#F7F5FF',
  lilac: '#C5B8FF',
  // Cream / neutrals
  bg: '#FBF8F3',                // warm cream background
  bgDeep: '#F4EFE6',
  surface: '#FFFFFF',
  surfaceTint: '#FAF7F1',
  // Text
  ink: '#1F1B2E',
  inkSoft: '#5C5670',
  inkMute: '#9A95AC',
  hairline: 'rgba(31,27,46,0.08)',
  // Accents
  coral: '#FF6F8B',             // overdue / warning
  coralSoft: '#FFE5EC',
  amber: '#F0A93B',
  amberSoft: '#FFF2DA',
  mint: '#3CC591',
  mintSoft: '#DFF6EB',
  sky: '#4FB7F0',
  skySoft: '#E1F2FC',
  // Pet card category colors
  health: '#FF6F8B',
  meds: '#6B5BFF',
  finance: '#3CC591',
  docs: '#F0A93B',
};
window.MP = MP;

// Palettes for mood-swap tweak. Each entry overrides MP at runtime; missing
// keys inherit from the base above so we can keep adding palettes safely.
const PALETTES = {
  lavanda: {}, // base — defined inline by applyPalette
  salvia: {
    primary: '#5C8B6E', primaryDeep: '#3F6B52',
    primarySoft: '#E5F0E8', primarySofter: '#F4F8F5', lilac: '#B7D4BE',
    bg: '#FAF8F1', bgDeep: '#EDE7D6', surface: '#FFFFFF', surfaceTint: '#F6F2E8',
    ink: '#1E2A22', inkSoft: '#566858', inkMute: '#94A294',
    hairline: 'rgba(30,42,34,0.08)',
    coral: '#E07A5F', coralSoft: '#FBE6DC',
    amber: '#D4A93A', amberSoft: '#FBF1D4',
    mint:  '#5C8B6E', mintSoft: '#E5F0E8',
    sky:   '#6FA8C9', skySoft: '#E1EEF5',
    meds:  '#5C8B6E', health:'#E07A5F', finance:'#5C8B6E', docs:'#D4A93A',
  },
  coral: {
    primary: '#E26D4F', primaryDeep: '#B84A2E',
    primarySoft: '#FBE3D7', primarySofter: '#FBF1EA', lilac: '#F4B89F',
    bg: '#FBF5EE', bgDeep: '#F2E2CF', surface: '#FFFBF6', surfaceTint: '#FAF1E5',
    ink: '#2A1810', inkSoft: '#6E5448', inkMute: '#AC9686',
    hairline: 'rgba(42,24,16,0.09)',
    coral: '#D43A5A', coralSoft: '#FBDFE5',
    amber: '#E89A2E', amberSoft: '#FBEED4',
    mint:  '#5BA890', mintSoft: '#DDF0E8',
    sky:   '#5390B0', skySoft: '#DDEAF1',
    meds:  '#E26D4F', health:'#D43A5A', finance:'#5BA890', docs:'#E89A2E',
  },
  noite: {
    primary: '#9A8AFF', primaryDeep: '#7A6BFF',
    primarySoft: '#251F4D', primarySofter: '#1B173D', lilac: '#5A4DC4',
    bg: '#0E0B22', bgDeep: '#171336', surface: '#1A1638', surfaceTint: '#221C45',
    ink: '#F2EEFF', inkSoft: '#B8AEE0', inkMute: '#6F66A8',
    hairline: 'rgba(255,255,255,0.08)',
    coral: '#FF8AA8', coralSoft: '#3A1F30',
    amber: '#FFC56B', amberSoft: '#3D2D17',
    mint:  '#5DD7A8', mintSoft: '#163328',
    sky:   '#6FC9F5', skySoft: '#16293A',
    meds:  '#9A8AFF', health:'#FF8AA8', finance:'#5DD7A8', docs:'#FFC56B',
  },
};
window.PALETTES = PALETTES;

// Mutate MP in place so existing screens reading window.MP keep working,
// then trigger a re-render via window.__themeBump (host setState).
const MP_BASE = JSON.parse(JSON.stringify(MP));
function applyPalette(name) {
  const overlay = PALETTES[name] || {};
  Object.keys(MP_BASE).forEach(k => { MP[k] = overlay[k] || MP_BASE[k]; });
  MP._isDark = name === 'noite';
  window.__paletteName = name;
  if (window.__themeBump) window.__themeBump();
}
window.applyPalette = applyPalette;

window.DOG_STYLE = window.DOG_STYLE || 'cheia';
function setDogStyle(s) {
  window.DOG_STYLE = s;
  if (window.__themeBump) window.__themeBump();
}
window.setDogStyle = setDogStyle;

const FONT = `'Plus Jakarta Sans', -apple-system, system-ui, sans-serif`;
window.FONT = FONT;

// ── Icon helpers ────────────────────────────────────────────────
const Icon = ({ d, size = 24, color = 'currentColor', stroke = 2, fill = 'none', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {typeof d === 'string' ? <path d={d}/> : d}
  </svg>
);

// catalog – minimal, on-brand
const I = {
  paw: <><circle cx="6" cy="11" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="11" r="2"/><path d="M8 17c0-2.5 1.8-4 4-4s4 1.5 4 4-1.8 4-4 4-4-1.5-4-4z"/></>,
  pill: <><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="M8.5 7l7 7" /></>,
  bottle: <><path d="M9 3h6v3h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V3z"/><path d="M9 12h6"/></>,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>,
  doc: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/>,
  notebook: <><path d="M6 4h11a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V4z"/><path d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2"/><path d="M10 8h6M10 12h6"/></>,
  cal: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></>,
  cash: <><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v.01M18 15v.01"/></>,
  bowl: <><path d="M3 11h18a8 8 0 0 1-16 0"/><path d="M3 11l-1-1M21 11l1-1"/><circle cx="10" cy="5" r="1.5"/><circle cx="14" cy="6.5" r="1.2"/></>,
  walk: <><circle cx="13" cy="4" r="1.6"/><path d="M9 21l2-6 3 2 1 4M10 11l3-3 3 2 2 4M5 14l4-3"/></>,
  home: <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2v-9z"/>,
  today: <><rect x="3" y="5" width="18" height="16" rx="2"/><circle cx="12" cy="14" r="3"/></>,
  agenda: <><path d="M4 6h16M4 12h16M4 18h10"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  bell: <><path d="M6 9a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></>,
  chevR: <path d="M9 6l6 6-6 6"/>,
  chevD: <path d="M6 9l6 6 6-6"/>,
  check: <path d="M5 12l5 5L20 7"/>,
  alert: <><path d="M12 9v4M12 17v.01"/><path d="M10.3 3.6L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z"/></>,
  google: 'google', // special render
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>,
  ai: <><circle cx="12" cy="12" r="9"/><path d="M8 12h.01M16 12h.01M9 16c1 1 2 1.5 3 1.5s2-.5 3-1.5"/></>,
  scan: <><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M8 12h8"/></>,
  qr: <><rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></>,
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6 6 0 0 0 10.5 10.5z"/>,
  noon: <><circle cx="12" cy="14" r="3"/><path d="M12 8v1M6 14h1M17 14h1M8 10l.7.7M15.3 10.7l.7-.7M3 18h18"/></>,
  edit: <><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 6l4 4"/></>,
  export: <><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 21h14"/></>,
  toggle: <></>,
  download: <><path d="M12 3v14"/><path d="M6 13l6 6 6-6"/><path d="M5 21h14"/></>,
  more: <><circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/></>,
};
window.I = I;
window.Icon = Icon;

// Google "G" logo (multi-color)
const GoogleG = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 7.9-21.1l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.3-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5A20 20 0 0 0 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C41 35.9 44 30.4 44 24c0-1.2-.1-2.3-.4-3.5z"/>
  </svg>
);
window.GoogleG = GoogleG;

// ── Building blocks ─────────────────────────────────────────────

const Card = ({ children, style, onClick, pad = 16, radius = 22 }) => (
  <div onClick={onClick} style={{
    background: MP.surface, borderRadius: radius, padding: pad,
    boxShadow: '0 1px 0 rgba(31,27,46,0.04), 0 4px 14px rgba(31,27,46,0.05)',
    border: `1px solid ${MP.hairline}`,
    ...style,
  }}>{children}</div>
);
window.Card = Card;

const Pill = ({ children, color = MP.primary, bg = MP.primarySoft, size = 12, style }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '4px 10px', borderRadius: 999, fontSize: size, fontWeight: 700,
    background: bg, color, letterSpacing: 0.4, textTransform: 'uppercase',
    ...style,
  }}>{children}</span>
);
window.Pill = Pill;

const Avatar = ({ size = 44, hue = 30, label = 'L', src }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: src ? `center/cover no-repeat url(${src})` :
      `linear-gradient(135deg, oklch(86% 0.07 ${hue}), oklch(72% 0.13 ${hue + 20}))`,
    color: '#fff', fontWeight: 800, fontSize: size * 0.42,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, border: '2px solid #fff',
    boxShadow: '0 2px 8px rgba(31,27,46,0.10)',
  }}>{!src && label}</div>
);
window.Avatar = Avatar;

// Simulated dog photo via SVG illustration. Three styles, switched at runtime
// via window.DOG_STYLE — 'cheia' (full color), 'geometrica' (shapes only),
// 'linha' (line drawing on cream).
const DogPortrait = ({ size = 200, ring = true }) => {
  const style = window.DOG_STYLE || 'cheia';
  const collarColor = MP.primary;
  const tagColor = '#F4C44A';
  const ringStyle = ring
    ? `0 0 0 6px ${MP.surface}, 0 0 0 8px ${MP.primarySoft}, 0 20px 40px rgba(75,63,217,0.18)`
    : 'none';

  // ── Cheia (full-color portrait) ──────────────────────────────
  if (style === 'cheia') {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'radial-gradient(120% 120% at 30% 25%, #FBE7C6 0%, #E9C28C 50%, #B27744 100%)',
        position: 'relative', overflow: 'hidden',
        boxShadow: ringStyle, flexShrink: 0,
      }}>
        <svg width={size} height={size} viewBox="0 0 200 200" style={{position:'absolute',inset:0}}>
          <ellipse cx="100" cy="118" rx="58" ry="54" fill="#C58A52"/>
          <path d="M52 80 Q40 60 56 50 Q70 60 70 88 Z" fill="#8B5A2B"/>
          <path d="M148 80 Q160 60 144 50 Q130 60 130 88 Z" fill="#8B5A2B"/>
          <ellipse cx="100" cy="138" rx="28" ry="22" fill="#F4DBB4"/>
          <ellipse cx="100" cy="124" rx="9" ry="7" fill="#2B1B12"/>
          <ellipse cx="80" cy="108" rx="6" ry="7" fill="#2B1B12"/>
          <ellipse cx="120" cy="108" rx="6" ry="7" fill="#2B1B12"/>
          <circle cx="82" cy="106" r="1.6" fill="#fff"/>
          <circle cx="122" cy="106" r="1.6" fill="#fff"/>
          <path d="M88 148 Q100 158 112 148" stroke="#2B1B12" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M100 132 V146" stroke="#2B1B12" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M97 152 Q100 158 103 152 Z" fill="#FF8AA6"/>
          <path d="M40 170 Q100 195 160 170 L160 182 Q100 208 40 182 Z" fill={collarColor}/>
          <circle cx="100" cy="190" r="9" fill={tagColor}/>
          <text x="100" y="194" textAnchor="middle" fontSize="9" fontWeight="800" fill={collarColor} fontFamily={FONT}>L</text>
          <ellipse cx="65" cy="128" rx="7" ry="4" fill="#E89B7A" opacity="0.45"/>
          <ellipse cx="135" cy="128" rx="7" ry="4" fill="#E89B7A" opacity="0.45"/>
        </svg>
      </div>
    );
  }

  // ── Geométrica (shapes-only, minimalist) ────────────────────
  if (style === 'geometrica') {
    return (
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: `radial-gradient(120% 120% at 30% 25%, ${MP.primarySofter}, ${MP.primarySoft})`,
        position: 'relative', overflow: 'hidden',
        boxShadow: ringStyle, flexShrink: 0,
      }}>
        <svg width={size} height={size} viewBox="0 0 200 200" style={{position:'absolute',inset:0}}>
          {/* simplified shapes */}
          <circle cx="100" cy="108" r="56" fill={MP.primary}/>
          {/* ears: triangles */}
          <path d="M55 70 L48 105 L82 88 Z" fill={MP.primaryDeep}/>
          <path d="M145 70 L152 105 L118 88 Z" fill={MP.primaryDeep}/>
          {/* muzzle: rounded rect */}
          <rect x="72" y="118" width="56" height="40" rx="20" fill={MP.primarySoft}/>
          {/* eyes: simple dots */}
          <circle cx="80" cy="100" r="5" fill={MP.surface}/>
          <circle cx="120" cy="100" r="5" fill={MP.surface}/>
          {/* nose: triangle */}
          <path d="M92 122 L108 122 L100 134 Z" fill={MP.surface}/>
          {/* collar: bold band */}
          <rect x="30" y="170" width="140" height="14" rx="7" fill={tagColor}/>
          {/* tag */}
          <circle cx="100" cy="177" r="11" fill={MP.surface}/>
          <text x="100" y="181" textAnchor="middle" fontSize="11" fontWeight="800" fill={MP.primary} fontFamily={FONT}>L</text>
        </svg>
      </div>
    );
  }

  // ── Linha (editorial line drawing) ───────────────────────────
  const lineColor = MP.ink;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: MP.surfaceTint,
      position: 'relative', overflow: 'hidden',
      boxShadow: ringStyle, flexShrink: 0,
    }}>
      <svg width={size} height={size} viewBox="0 0 200 200" style={{position:'absolute',inset:0}}
        fill="none" stroke={lineColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="100" cy="118" rx="58" ry="54"/>
        <path d="M52 80 Q40 60 56 50 Q70 60 70 88"/>
        <path d="M148 80 Q160 60 144 50 Q130 60 130 88"/>
        <ellipse cx="100" cy="138" rx="28" ry="22"/>
        <ellipse cx="100" cy="124" rx="7" ry="5" fill={lineColor}/>
        <circle cx="80" cy="108" r="3" fill={lineColor} stroke="none"/>
        <circle cx="120" cy="108" r="3" fill={lineColor} stroke="none"/>
        <path d="M88 148 Q100 158 112 148"/>
        <path d="M100 132 V146"/>
        {/* collar */}
        <path d="M40 170 Q100 195 160 170" stroke={collarColor} strokeWidth="6"/>
        <circle cx="100" cy="190" r="8" fill={collarColor} stroke="none"/>
        <text x="100" y="193" textAnchor="middle" fontSize="9" fontWeight="800" fill={MP.surface} stroke="none" fontFamily={FONT}>L</text>
      </svg>
    </div>
  );
};
window.DogPortrait = DogPortrait;

// Tiny dog avatar (used in lists)
const DogAvatar = ({ size = 44, hue = 30 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: `radial-gradient(120% 120% at 30% 25%, oklch(90% 0.05 ${hue}), oklch(70% 0.1 ${hue}))`,
    position: 'relative', overflow: 'hidden', flexShrink: 0,
    border: '2px solid #fff', boxShadow: '0 2px 6px rgba(31,27,46,0.10)',
  }}>
    <svg width={size} height={size} viewBox="0 0 44 44">
      <ellipse cx="22" cy="26" rx="13" ry="12" fill="#C58A52"/>
      <path d="M11 17 Q8 12 13 10 Q17 13 17 19 Z" fill="#8B5A2B"/>
      <path d="M33 17 Q36 12 31 10 Q27 13 27 19 Z" fill="#8B5A2B"/>
      <ellipse cx="22" cy="30" rx="6" ry="5" fill="#F4DBB4"/>
      <ellipse cx="22" cy="27" rx="2" ry="1.6" fill="#2B1B12"/>
      <circle cx="18" cy="23" r="1.4" fill="#2B1B12"/>
      <circle cx="26" cy="23" r="1.4" fill="#2B1B12"/>
    </svg>
  </div>
);
window.DogAvatar = DogAvatar;

// Status bar (compact)
const StatusBar = ({ dark = false, time = '9:41' }) => {
  const c = dark ? '#fff' : MP.ink;
  return (
    <div style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'14px 28px 6px', fontFamily: FONT, fontWeight: 700, fontSize: 15, color: c,
    }}>
      <span>{time}</span>
      <span style={{display:'flex', gap:6, alignItems:'center'}}>
        <svg width="17" height="11" viewBox="0 0 17 11"><path d="M1 9h2v1H1zm3-2h2v3H4zm3-2h2v5H7zm3-2h2v7h-2zm3-2h2v9h-2z" fill={c}/></svg>
        <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 2.5C9.5 2.5 11.4 3.3 12.7 4.6L13.7 3.6C12 2 9.9 1 7.5 1S3 2 1.3 3.6l1 1C3.6 3.3 5.5 2.5 7.5 2.5zm0 3.5c1.1 0 2 .4 2.7 1.1l1-1C10.2 5 8.9 4.5 7.5 4.5S4.8 5 3.8 6.1l1 1C5.5 6.4 6.4 6 7.5 6zm0 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill={c}/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" fill="none" stroke={c} opacity="0.5"/><rect x="2" y="2" width="17" height="7" rx="1.2" fill={c}/><path d="M22 3.5v4c0.7-0.3 1.2-1 1.2-2s-0.5-1.7-1.2-2z" fill={c} opacity="0.5"/></svg>
      </span>
    </div>
  );
};
window.StatusBar = StatusBar;

// Home indicator
const HomeBar = ({ dark = false }) => (
  <div style={{display:'flex', justifyContent:'center', padding:'8px 0 10px'}}>
    <div style={{width:120, height:5, borderRadius:99, background: dark ? 'rgba(255,255,255,0.85)' : 'rgba(31,27,46,0.30)'}}/>
  </div>
);
window.HomeBar = HomeBar;

// Phone frame for screens (simplified, focuses on content)
const Phone = ({ children, dark, bg, label }) => {
  const isDark = dark ?? !!MP._isDark;
  return (
  <div style={{
    width: 390, height: 844, borderRadius: 48,
    background: isDark ? (MP.bg || '#0F0B1A') : (bg || MP.bg),
    overflow: 'hidden', position: 'relative', fontFamily: FONT,
    color: isDark ? MP.ink : MP.ink,
    boxShadow: isDark
      ? '0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
      : '0 30px 60px -20px rgba(31,27,46,0.22), 0 0 0 1px rgba(31,27,46,0.08)',
    display:'flex', flexDirection:'column',
  }}>
    {/* dynamic island */}
    <div style={{position:'absolute', top:11, left:'50%', transform:'translateX(-50%)',
      width:118, height:34, borderRadius:24, background:'#000', zIndex:60}}/>
    <StatusBar dark={isDark}/>
    <div style={{flex:1, overflow:'hidden', position:'relative'}}>{children}</div>
    <HomeBar dark={isDark}/>
  </div>
  );
};
window.Phone = Phone;

// Subtle striped placeholder (e.g. prescription image)
const Stripe = ({ w = '100%', h = 100, radius = 14, label, dark = false }) => (
  <div style={{
    width: w, height: h, borderRadius: radius,
    background: `repeating-linear-gradient(135deg, ${dark?'#1a1530':'#F0EBE0'} 0 12px, ${dark?'#221A3D':'#E6E0D3'} 12px 24px)`,
    display:'flex', alignItems:'center', justifyContent:'center',
    color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(31,27,46,0.45)',
    fontFamily: 'ui-monospace, SF Mono, monospace', fontSize: 11, letterSpacing: 0.8,
    textTransform: 'uppercase',
  }}>{label}</div>
);
window.Stripe = Stripe;
