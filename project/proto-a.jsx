// MinhasPatas — Interactive prototype screens
// Each screen receives { nav, back, state, setState } via React context.

const { useState, useEffect, useRef, createContext, useContext } = React;

const NavCtx = createContext({});
const useNav = () => useContext(NavCtx);

// ── Slide-to-confirm (pointer drag) ─────────────────────────────
function SlideConfirm({ color, bg, label, onConfirm }) {
  const trackRef = useRef(null);
  const [x, setX] = useState(0);
  const [done, setDone] = useState(false);
  const drag = useRef({ active: false, start: 0, max: 0 });

  const start = (e) => {
    if (done) return;
    const track = trackRef.current;
    const trackWidth = track.getBoundingClientRect().width;
    drag.current = { active: true, start: e.clientX, max: trackWidth - 42 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    if (!drag.current.active) return;
    const dx = Math.max(0, Math.min(drag.current.max, e.clientX - drag.current.start));
    setX(dx);
  };
  const end = (e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    if (x > drag.current.max * 0.7) {
      setX(drag.current.max);
      setDone(true);
      setTimeout(() => { onConfirm && onConfirm(); }, 220);
    } else {
      setX(0);
    }
  };

  return (
    <div ref={trackRef} style={{
      marginTop: 12, height: 44, borderRadius: 99,
      background: done ? MP.mintSoft : bg, position:'relative',
      display:'flex', alignItems:'center', overflow:'hidden',
      transition: 'background 0.2s',
    }}>
      <div onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          background: done ? MP.mint : color,
          display:'flex', alignItems:'center', justifyContent:'center',
          marginLeft: 2, position:'absolute', left: x, top: 2,
          boxShadow: '0 4px 10px rgba(31,27,46,0.18)',
          touchAction: 'none', cursor: done ? 'default' : 'grab',
          transition: drag.current.active ? 'none' : 'left 0.22s, background 0.2s',
        }}>
        <Icon d={done ? I.check : I.chevR} size={done ? 20 : 18} color="#fff" stroke={2.6}/>
      </div>
      <div style={{
        flex:1, textAlign:'center', fontSize: 13, fontWeight: 700,
        color: done ? MP.mint : color, letterSpacing: 0.3,
        paddingRight: 42, paddingLeft: 42,
        opacity: 1 - (x / 220),
      }}>
        {done ? 'Confirmado ✓' : label}
      </div>
    </div>
  );
}
window.SlideConfirm = SlideConfirm;

// ── Status bar shared via window.StatusBar / Phone already

// ── Onboarding ─────────────────────────────────────────────────
function PrOnboarding() {
  const { nav } = useNav();
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column',
      background: `linear-gradient(180deg, ${MP.primarySofter} 0%, ${MP.bg} 70%)`,
      padding: '24px 28px 28px', position:'relative',
    }}>
      <div style={{position:'absolute', top:64, left:24, opacity:0.18}}><Icon d={I.paw} size={28} color={MP.primary}/></div>
      <div style={{position:'absolute', top:110, right:36, opacity:0.13}}><Icon d={I.paw} size={20} color={MP.primary}/></div>
      <div style={{position:'absolute', top:200, left:48, opacity:0.10}}><Icon d={I.paw} size={18} color={MP.primary}/></div>

      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:36, paddingTop: 20}}>
        <DogPortrait size={220}/>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize: 38, fontWeight: 800, letterSpacing: -1.2, color: MP.ink}}>
            Minhas<span style={{color:MP.primary}}>Patas</span>
          </div>
          <div style={{fontSize: 16, color: MP.inkSoft, marginTop: 8, lineHeight:1.45, maxWidth: 280, margin:'8px auto 0'}}>
            Cuidar da saúde do seu melhor amigo, com leveza e no seu tempo.
          </div>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:12, marginBottom: 8}}>
        <button onClick={() => nav('home')} style={btnSecondary}>
          <GoogleG size={20}/> Entrar com Google
        </button>
        <button onClick={() => nav('home')} style={btnPrimary}>
          <Icon d={I.mail} size={18} color="#fff"/> Entrar com e-mail
        </button>
        <div style={{textAlign:'center', fontSize: 13, color: MP.inkMute, marginTop: 6}}>
          Novo por aqui? <span style={{color: MP.primary, fontWeight: 700}}>Criar conta</span>
        </div>
      </div>
    </div>
  );
}

const btnPrimary = {
  height: 56, borderRadius: 18, border: 'none',
  background: MP.primary, color: '#fff', fontFamily: FONT,
  fontSize: 16, fontWeight: 700, display:'flex', alignItems:'center', justifyContent:'center',
  gap: 10, cursor:'pointer', boxShadow: '0 10px 24px -10px rgba(107,91,255,0.6)',
};
const btnSecondary = {
  height: 56, borderRadius: 18, border: `1.5px solid ${MP.hairline}`,
  background: MP.surface, color: MP.ink, fontFamily: FONT,
  fontSize: 16, fontWeight: 700, display:'flex', alignItems:'center', justifyContent:'center',
  gap: 12, cursor:'pointer',
};
window.btnPrimary = btnPrimary;
window.btnSecondary = btnSecondary;

// ── Home ───────────────────────────────────────────────────────
function PrHome() {
  const { nav, state, setState } = useNav();
  const pets = [
    { name: 'Leia', hue: 30 },
    { name: 'Filó', hue: 200 },
    { name: 'Fiapa',  hue: 340 },
  ];
  const tiles = [
    { label:'Saúde',        icon: I.heart,  bg: MP.coralSoft,  fg: MP.coral,   to: 'pet' },
    { label:'Medicamentos', icon: I.pill,   bg: MP.primarySoft,fg: MP.primary, to: 'meds' },
    { label:'Finanças',     icon: I.cash,   bg: MP.mintSoft,   fg: MP.mint,    to: 'finance' },
    { label:'Documentos',   icon: I.folder, bg: MP.amberSoft,  fg: MP.amber,   to: 'pet' },
  ];
  const upcoming = state.upcoming;
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg}}>
      <div style={{flex:1, overflow:'auto', padding:'8px 20px 16px'}} className="phone-scroll">
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 4}}>
          <div>
            <div style={{fontSize: 13, color: MP.inkMute, fontWeight: 600, letterSpacing: 0.3, textTransform:'uppercase'}}>Segunda, 14 mai</div>
            <div style={{fontSize: 26, fontWeight: 800, color: MP.ink, marginTop: 4, letterSpacing: -0.6}}>
              Olá, Taynara! <span style={{display:'inline-block', transform:'translateY(-2px)'}}>🐾</span>
            </div>
          </div>
          <div onClick={() => nav('pet')} style={{position:'relative', cursor:'pointer'}}>
            <Avatar size={48} hue={20} label="T"/>
            <div style={{position:'absolute', top:-2, right:-2, width:14, height:14, borderRadius:'50%', background: MP.coral, border:'2px solid #fff'}}/>
          </div>
        </div>

        <div style={{display:'flex', gap:8, marginTop: 18, overflowX:'auto', paddingBottom: 4}} className="phone-scroll">
          {pets.map((p,i)=>{
            const active = state.pet === i;
            return (
              <div key={i} onClick={() => setState({ pet: i })} style={{
                display:'flex', alignItems:'center', gap:8,
                padding:'6px 14px 6px 6px', borderRadius: 99,
                background: active ? MP.ink : MP.surface,
                color: active ? '#fff' : MP.ink,
                border: `1px solid ${active ? MP.ink : MP.hairline}`,
                fontWeight: 700, fontSize: 14, flexShrink: 0, cursor:'pointer',
                transition: 'background 0.15s, color 0.15s',
              }}>
                <DogAvatar size={30} hue={p.hue}/>
                <span>{p.name}</span>
              </div>
            );
          })}
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            padding:'6px 14px 6px 6px', borderRadius: 99,
            background: MP.surface, color: MP.ink,
            border: `1px dashed ${MP.lilac}`, fontWeight: 700, fontSize: 14, flexShrink: 0, cursor:'pointer',
          }}>
            <div style={{width:30, height:30, borderRadius:'50%', background: MP.primarySoft, color: MP.primary, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Icon d={I.plus} size={16} color={MP.primary}/>
            </div>
            <span>Adicionar</span>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop: 18}}>
          {tiles.map((t,i)=>(
            <Card key={i} pad={16} onClick={() => nav(t.to)} style={{display:'flex', flexDirection:'column', gap: 18, height: 108, cursor:'pointer'}}>
              <div style={{width:42, height:42, borderRadius: 14, background: t.bg, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Icon d={t.icon} size={22} color={t.fg}/>
              </div>
              <div style={{fontWeight: 800, color: MP.ink, fontSize: 16}}>{t.label}</div>
            </Card>
          ))}
        </div>

        <div style={{marginTop: 22, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontWeight: 800, fontSize: 17, color: MP.ink}}>Próximos medicamentos</div>
          <span onClick={() => nav('meds')} style={{fontSize: 13, color: MP.primary, fontWeight: 700, cursor:'pointer'}}>Ver todos</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap: 10, marginTop: 12}}>
          {upcoming.map((m,i)=>(
            <Card key={i} pad={14}>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <div style={{width:48, height:48, borderRadius:14, background: m.late ? MP.coralSoft : MP.primarySoft, display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
                  <Icon d={I.pill} size={22} color={m.late ? MP.coral : MP.primary}/>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:6}}>
                    <span style={{fontWeight: 800, fontSize: 15, color: MP.ink}}>{m.name}</span>
                    {m.late && <Pill color={MP.coral} bg={MP.coralSoft} size={10}>atrasado</Pill>}
                    {m.done && <Pill color={MP.mint} bg={MP.mintSoft} size={10}>ok</Pill>}
                  </div>
                  <div style={{fontSize: 12, color: MP.inkSoft, marginTop: 2, display:'flex', alignItems:'center', gap:6}}>
                    <span>{m.time}</span>
                    <span style={{width:3, height:3, borderRadius:'50%', background: MP.inkMute, display:'inline-block'}}/>
                    <span>{m.pet}</span>
                  </div>
                </div>
              </div>
              {!m.done && (
                <SlideConfirm color={m.late ? MP.coral : MP.primary} bg={m.late ? MP.coralSoft : MP.primarySoft}
                  label="Deslize para confirmar"
                  onConfirm={() => {
                    setState({ upcoming: state.upcoming.map((x, idx) => idx === i ? { ...x, done: true, late: false } : x) });
                  }}/>
              )}
            </Card>
          ))}
        </div>
      </div>

      <PrBottomNav active="home"/>
    </div>
  );
}

// ── Bottom Nav (interactive) ───────────────────────────────────
function PrBottomNav({ active }) {
  const { nav } = useNav();
  const items = [
    { id:'home',   icon: I.home,   label:'Início' },
    { id:'today',  icon: I.today,  label:'Hoje' },
    { id:'ai',     icon: I.plus,   label:'',   isFab: true },
    { id:'pet',    icon: I.paw,    label:'Pets' },
    { id:'finance',icon: I.user,   label:'Perfil' },
  ];
  return (
    <div style={{
      background: MP.surface, borderTop: `1px solid ${MP.hairline}`,
      padding: '10px 16px 6px', display:'flex', justifyContent:'space-between', alignItems:'flex-end',
    }}>
      {items.map(it => it.isFab ? (
        <button key={it.id} onClick={() => nav('ai')} style={{
          width: 54, height: 54, borderRadius: 18, border:'none',
          background: MP.primary, color:'#fff', marginTop: -22,
          boxShadow: '0 12px 24px -8px rgba(107,91,255,0.55)',
          display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
        }}>
          <Icon d={I.sparkle} size={24} color="#fff" fill="#fff"/>
        </button>
      ) : (
        <button key={it.id} onClick={() => nav(it.id)} style={{
          background:'none', border:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:3,
          color: active === it.id ? MP.primary : MP.inkMute, fontFamily: FONT, cursor:'pointer',
          padding: '4px 8px',
        }}>
          <Icon d={it.icon} size={22} color={active === it.id ? MP.primary : MP.inkMute} stroke={2}/>
          <span style={{fontSize: 11, fontWeight: 700}}>{it.label}</span>
        </button>
      ))}
    </div>
  );
}

// ── Meds list ──────────────────────────────────────────────────
function PrMeds() {
  const { nav, back, state, setState } = useNav();
  const filters = ['Ativos', 'Concluídos', 'Todos'];
  const counts = { 'Ativos': state.meds.filter(m=>m.on).length, 'Concluídos': 12, 'Todos': state.meds.length };
  const filtered = state.filter === 'Concluídos' ? [] : state.meds;

  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg, position:'relative'}}>
      <div style={{padding: '8px 20px 6px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div onClick={back} style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
          <Icon d="M15 6l-6 6 6 6" size={20} color={MP.ink} stroke={2.2}/>
        </div>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize: 11, color: MP.inkMute, fontWeight:700, letterSpacing: 0.6, textTransform:'uppercase'}}>Pet</div>
          <div style={{fontSize: 14, color: MP.ink, fontWeight: 800, display:'flex', alignItems:'center', gap:4}}>
            Leia <Icon d={I.chevD} size={12} color={MP.inkSoft} stroke={2.4}/>
          </div>
        </div>
        <div onClick={() => nav('ai')} style={{width:40, height:40, borderRadius:14, background: MP.primary, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 18px -6px rgba(107,91,255,0.55)', cursor:'pointer'}}>
          <Icon d={I.plus} size={20} color="#fff" stroke={2.6}/>
        </div>
      </div>

      <div style={{padding:'10px 20px 0'}}>
        <div style={{fontSize: 28, fontWeight: 800, letterSpacing: -0.7, color: MP.ink, lineHeight:1.1}}>
          Medicamentos<br/><span style={{color: MP.primary}}>da Leia</span>
        </div>
        <div style={{fontSize: 13, color: MP.inkSoft, marginTop: 6}}>
          {state.meds.filter(m=>m.on).length} ativos · 1 atrasado hoje
        </div>
      </div>

      <div style={{display:'flex', gap:8, padding:'18px 20px 4px', overflowX:'auto'}} className="phone-scroll">
        {filters.map((f,i)=>{
          const active = state.filter === f;
          return (
            <div key={i} onClick={() => setState({ filter: f })} style={{
              padding:'8px 14px', borderRadius: 99,
              background: active ? MP.ink : MP.surface, color: active ? '#fff' : MP.ink,
              border: `1px solid ${active ? MP.ink : MP.hairline}`,
              fontWeight: 700, fontSize: 13, display:'flex', alignItems:'center', gap:6,
              flexShrink: 0, cursor:'pointer', transition:'all 0.15s',
            }}>
              {f}
              <span style={{padding:'1px 8px', borderRadius:99, fontSize: 11,
                background: active ? 'rgba(255,255,255,0.18)' : MP.bgDeep,
                color: active ? '#fff' : MP.inkSoft}}>{counts[f]}</span>
            </div>
          );
        })}
      </div>

      <div style={{flex:1, overflow:'auto', padding:'12px 20px 90px', display:'flex', flexDirection:'column', gap: 10}} className="phone-scroll">
        {filtered.length === 0 ? (
          <div style={{textAlign:'center', padding:'60px 20px', color: MP.inkMute}}>
            <div style={{fontSize:48, opacity:0.6}}>🎉</div>
            <div style={{fontWeight:800, color:MP.ink, marginTop:8}}>Nenhum tratamento concluído</div>
            <div style={{fontSize:13, marginTop:4}}>Medicamentos finalizados aparecerão aqui.</div>
          </div>
        ) : filtered.map((m,i)=>(
          <Card key={i} pad={14}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{width:48, height:48, borderRadius:14, background:m.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                <Icon d={m.icon} size={22} color={m.color}/>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', alignItems:'center', gap:6, flexWrap:'wrap'}}>
                  <span style={{fontWeight:800, fontSize:15, color: MP.ink}}>{m.name}</span>
                  {m.late && <Pill color={MP.coral} bg={MP.coralSoft} size={10}>atrasado</Pill>}
                </div>
                <div style={{fontSize:12, color:MP.inkSoft, marginTop:2}}>{m.dose}</div>
                <div style={{fontSize:12, color: m.late ? MP.coral : MP.primary, marginTop:6, fontWeight: 700, display:'flex', alignItems:'center', gap:4}}>
                  <Icon d={I.cal} size={12} color={m.late ? MP.coral : MP.primary} stroke={2.2}/>
                  Próx. dose · {m.next}
                </div>
              </div>
              <div onClick={() => {
                setState({ meds: state.meds.map((x, idx) => idx === i ? { ...x, on: !x.on } : x) });
              }} style={{
                width: 42, height: 26, borderRadius: 99,
                background: m.on ? MP.primary : MP.bgDeep, position:'relative',
                cursor:'pointer', transition: 'background 0.18s',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius:'50%', background:'#fff',
                  position:'absolute', top: 2, left: m.on ? 18 : 2,
                  boxShadow: '0 1px 3px rgba(31,27,46,0.2)',
                  transition: 'left 0.18s',
                }}/>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <button onClick={() => nav('ai')} style={{
        position:'absolute', right: 22, bottom: 24,
        width: 60, height: 60, borderRadius: 22, border:'none',
        background: MP.primary, color:'#fff', cursor:'pointer',
        boxShadow: '0 14px 30px -8px rgba(107,91,255,0.55)',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <Icon d={I.scan} size={24} color="#fff" stroke={2.4}/>
      </button>
    </div>
  );
}

window.PrOnboarding = PrOnboarding;
window.PrHome = PrHome;
window.PrMeds = PrMeds;
window.PrBottomNav = PrBottomNav;
window.NavCtx = NavCtx;
window.useNav = useNav;
