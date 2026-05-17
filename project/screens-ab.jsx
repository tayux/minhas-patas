// Screens 1-4 — Onboarding, Home, Meds, AI Reader

// ── SCREEN 1 — Onboarding / Login ─────────────────────────────
function ScreenOnboarding() {
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column',
      background: `linear-gradient(180deg, ${MP.primarySofter} 0%, ${MP.bg} 70%)`,
      padding: '24px 28px 28px',
    }}>
      {/* decorative paws */}
      <div style={{position:'absolute', top:64, left:24, opacity:0.18}}>
        <Icon d={I.paw} size={28} color={MP.primary}/>
      </div>
      <div style={{position:'absolute', top:110, right:36, opacity:0.13}}>
        <Icon d={I.paw} size={20} color={MP.primary}/>
      </div>
      <div style={{position:'absolute', top:200, left:48, opacity:0.10}}>
        <Icon d={I.paw} size={18} color={MP.primary}/>
      </div>

      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:36, paddingTop: 20}}>
        <DogPortrait size={220}/>
        <div style={{textAlign:'center'}}>
          <div style={{
            fontSize: 38, fontWeight: 800, letterSpacing: -1.2, color: MP.ink,
            fontFamily: FONT,
          }}>Minhas<span style={{color:MP.primary}}>Patas</span></div>
          <div style={{fontSize: 16, color: MP.inkSoft, marginTop: 8, lineHeight:1.45, maxWidth: 280}}>
            Cuidar da saúde do seu melhor amigo, com leveza e no seu tempo.
          </div>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:12, marginBottom: 8}}>
        <button style={{
          height: 56, borderRadius: 18, border: `1.5px solid ${MP.hairline}`,
          background: MP.surface, color: MP.ink, fontFamily: FONT,
          fontSize: 16, fontWeight: 700, display:'flex', alignItems:'center', justifyContent:'center',
          gap: 12, cursor:'pointer',
        }}>
          <GoogleG size={20}/> Entrar com Google
        </button>
        <button style={{
          height: 56, borderRadius: 18, border: 'none',
          background: MP.primary, color: '#fff', fontFamily: FONT,
          fontSize: 16, fontWeight: 700, display:'flex', alignItems:'center', justifyContent:'center',
          gap: 10, cursor:'pointer',
          boxShadow: '0 10px 24px -10px rgba(107,91,255,0.6)',
        }}>
          <Icon d={I.mail} size={18} color="#fff"/> Entrar com e-mail
        </button>
        <div style={{textAlign:'center', fontSize: 13, color: MP.inkMute, marginTop: 6}}>
          Novo por aqui? <span style={{color: MP.primary, fontWeight: 700}}>Criar conta</span>
        </div>
      </div>
    </div>
  );
}
window.ScreenOnboarding = ScreenOnboarding;

// ── SCREEN 2 — Home / Dashboard ───────────────────────────────
function ScreenHome() {
  const pets = [
    { name: 'Leia', active: true, hue: 30 },
    { name: 'Filó', active: false, hue: 200 },
    { name: 'Fiapa',  active: false, hue: 340 },
    { name: '+', active: false, isAdd: true },
  ];
  const tiles = [
    { label:'Saúde',        icon: I.heart,  bg: MP.coralSoft,  fg: MP.coral },
    { label:'Medicamentos', icon: I.pill,   bg: MP.primarySoft,fg: MP.primary },
    { label:'Finanças',     icon: I.cash,   bg: MP.mintSoft,   fg: MP.mint },
    { label:'Documentos',   icon: I.folder, bg: MP.amberSoft,  fg: MP.amber },
  ];
  const upcoming = [
    { time:'15:00', name:'Prednisolona 10mg', pet:'Leia', late:false },
    { time:'17:30', name:'Vermífugo',         pet:'Filó', late:true },
  ];
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg}}>
      <div style={{flex:1, overflow:'auto', padding:'8px 20px 16px'}}>
        {/* Greeting */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 4}}>
          <div>
            <div style={{fontSize: 13, color: MP.inkMute, fontWeight: 600, letterSpacing: 0.3, textTransform:'uppercase'}}>Segunda, 14 mai</div>
            <div style={{fontSize: 26, fontWeight: 800, color: MP.ink, marginTop: 4, letterSpacing: -0.6}}>
              Olá, Taynara! <span style={{display:'inline-block', transform:'translateY(-2px)'}}>🐾</span>
            </div>
          </div>
          <div style={{position:'relative'}}>
            <Avatar size={48} hue={20} label="T"/>
            <div style={{position:'absolute', top:-2, right:-2, width:14, height:14, borderRadius:'50%', background: MP.coral, border:'2px solid #fff'}}/>
          </div>
        </div>

        {/* Pet selector */}
        <div style={{display:'flex', gap:8, marginTop: 18, overflowX:'auto', paddingBottom: 4}}>
          {pets.map((p,i)=>(
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'6px 14px 6px 6px', borderRadius: 99,
              background: p.active ? MP.ink : MP.surface,
              color: p.active ? '#fff' : MP.ink,
              border: `1px solid ${p.active ? MP.ink : MP.hairline}`,
              fontWeight: 700, fontSize: 14, flexShrink: 0,
            }}>
              {p.isAdd ? (
                <div style={{width:30, height:30, borderRadius:'50%', background: MP.primarySoft, color: MP.primary, display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <Icon d={I.plus} size={16} color={MP.primary}/>
                </div>
              ) : <DogAvatar size={30} hue={p.hue}/>}
              <span style={{paddingRight: p.isAdd ? 4 : 0}}>{p.isAdd ? 'Adicionar' : p.name}</span>
            </div>
          ))}
        </div>

        {/* 2x2 tiles */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop: 18}}>
          {tiles.map((t,i)=>(
            <Card key={i} pad={16} style={{display:'flex', flexDirection:'column', gap: 18, height: 108}}>
              <div style={{
                width:42, height:42, borderRadius: 14, background: t.bg,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <Icon d={t.icon} size={22} color={t.fg}/>
              </div>
              <div style={{fontWeight: 800, color: MP.ink, fontSize: 16}}>{t.label}</div>
            </Card>
          ))}
        </div>

        {/* Upcoming meds */}
        <div style={{marginTop: 22, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div style={{fontWeight: 800, fontSize: 17, color: MP.ink}}>Próximos medicamentos</div>
          <span style={{fontSize: 13, color: MP.primary, fontWeight: 700}}>Ver todos</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap: 10, marginTop: 12}}>
          {upcoming.map((m,i)=>(
            <Card key={i} pad={14}>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <div style={{
                  width:48, height:48, borderRadius:14, background: m.late ? MP.coralSoft : MP.primarySoft,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
                }}>
                  <Icon d={I.pill} size={22} color={m.late ? MP.coral : MP.primary}/>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:6}}>
                    <span style={{fontWeight: 800, fontSize: 15, color: MP.ink}}>{m.name}</span>
                    {m.late && <Pill color={MP.coral} bg={MP.coralSoft} size={10}>atrasado</Pill>}
                  </div>
                  <div style={{fontSize: 12, color: MP.inkSoft, marginTop: 2, display:'flex', alignItems:'center', gap:6}}>
                    <span>{m.time}</span>
                    <span style={{width:3, height:3, borderRadius:'50%', background: MP.inkMute, display:'inline-block'}}/>
                    <span>{m.pet}</span>
                  </div>
                </div>
              </div>
              {/* Slide to confirm */}
              <div style={{
                marginTop: 12, height: 44, borderRadius: 99,
                background: m.late ? MP.coralSoft : MP.primarySoft, position:'relative',
                display:'flex', alignItems:'center',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: m.late ? MP.coral : MP.primary,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  marginLeft: 2, flexShrink: 0,
                  boxShadow: '0 4px 10px rgba(31,27,46,0.18)',
                }}>
                  <Icon d={I.chevR} size={18} color="#fff" stroke={2.6}/>
                </div>
                <div style={{flex:1, textAlign:'center', fontSize: 13, fontWeight: 700,
                  color: m.late ? MP.coral : MP.primaryDeep, letterSpacing: 0.3,
                  paddingRight: 42,
                }}>
                  Deslize para confirmar
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav active="home"/>
    </div>
  );
}
window.ScreenHome = ScreenHome;

function BottomNav({ active = 'home' }) {
  const items = [
    { id:'home',   icon: I.home,   label:'Início' },
    { id:'today',  icon: I.today,  label:'Hoje' },
    { id:'add',    icon: I.plus,   label:'',   isFab: true },
    { id:'pets',   icon: I.paw,    label:'Pets' },
    { id:'me',     icon: I.user,   label:'Perfil' },
  ];
  return (
    <div style={{
      background: MP.surface, borderTop: `1px solid ${MP.hairline}`,
      padding: '10px 16px 6px',
      display:'flex', justifyContent:'space-between', alignItems:'flex-end',
    }}>
      {items.map(it => it.isFab ? (
        <button key={it.id} style={{
          width: 54, height: 54, borderRadius: 18, border:'none',
          background: MP.primary, color:'#fff', marginTop: -22,
          boxShadow: '0 12px 24px -8px rgba(107,91,255,0.55)',
          display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
        }}>
          <Icon d={it.icon} size={26} color="#fff" stroke={2.4}/>
        </button>
      ) : (
        <button key={it.id} style={{
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
window.BottomNav = BottomNav;

// ── SCREEN 3 — Medications List ───────────────────────────────
function ScreenMeds() {
  const meds = [
    { name:'Prednisolona', dose:'10 mg • 1x ao dia', next:'15:00', icon: I.pill, color: MP.primary, bg: MP.primarySoft, on: true },
    { name:'Apoquel',      dose:'16 mg • diário',    next:'08:00', icon: I.pill, color: MP.primary, bg: MP.primarySoft, on: true, late: true },
    { name:'Protetor Hepático', dose:'2.5 ml líquido • 2x ao dia', next:'21:00', icon: I.bottle, color: MP.sky, bg: MP.skySoft, on: true },
    { name:'Antibiótico',  dose:'500 mg • 3x ao dia', next:'amanhã 07:00', icon: I.pill, color: MP.amber, bg: MP.amberSoft, on: false },
    { name:'Suplemento Ômega 3', dose:'1 cápsula • diário', next:'12:00', icon: I.pill, color: MP.mint, bg: MP.mintSoft, on: true },
  ];
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg, position:'relative'}}>
      {/* Header */}
      <div style={{padding: '8px 20px 6px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Icon d="M15 6l-6 6 6 6" size={20} color={MP.ink} stroke={2.2}/>
        </div>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize: 11, color: MP.inkMute, fontWeight:700, letterSpacing: 0.6, textTransform:'uppercase'}}>Pet</div>
          <div style={{fontSize: 14, color: MP.ink, fontWeight: 800, display:'flex', alignItems:'center', gap:4}}>
            Leia <Icon d={I.chevD} size={12} color={MP.inkSoft} stroke={2.4}/>
          </div>
        </div>
        <div style={{width:40, height:40, borderRadius:14, background: MP.primary, display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 8px 18px -6px rgba(107,91,255,0.55)'}}>
          <Icon d={I.plus} size={20} color="#fff" stroke={2.6}/>
        </div>
      </div>

      <div style={{padding:'10px 20px 0'}}>
        <div style={{fontSize: 28, fontWeight: 800, letterSpacing: -0.7, color: MP.ink}}>Medicamentos<br/><span style={{color: MP.primary}}>da Leia</span></div>
        <div style={{fontSize: 13, color: MP.inkSoft, marginTop: 6}}>5 ativos • 1 atrasado hoje</div>
      </div>

      {/* Filter tabs */}
      <div style={{display:'flex', gap:8, padding:'18px 20px 4px', overflowX:'auto'}}>
        {[{l:'Ativos', n:5, a:true},{l:'Concluídos', n:12},{l:'Todos', n:17}].map((t,i)=>(
          <div key={i} style={{
            padding:'8px 14px', borderRadius: 99,
            background: t.a ? MP.ink : MP.surface, color: t.a ? '#fff' : MP.ink,
            border: `1px solid ${t.a ? MP.ink : MP.hairline}`,
            fontWeight: 700, fontSize: 13, display:'flex', alignItems:'center', gap:6,
            flexShrink: 0,
          }}>
            {t.l}
            <span style={{
              padding:'1px 8px', borderRadius:99, fontSize: 11,
              background: t.a ? 'rgba(255,255,255,0.18)' : MP.bgDeep,
              color: t.a ? '#fff' : MP.inkSoft,
            }}>{t.n}</span>
          </div>
        ))}
      </div>

      {/* List */}
      <div style={{flex:1, overflow:'auto', padding:'12px 20px 90px', display:'flex', flexDirection:'column', gap: 10}}>
        {meds.map((m,i)=>(
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
              {/* Toggle */}
              <div style={{
                width: 42, height: 26, borderRadius: 99,
                background: m.on ? MP.primary : MP.bgDeep, position:'relative',
                transition: '0.2s',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius:'50%', background:'#fff',
                  position:'absolute', top: 2, left: m.on ? 18 : 2,
                  boxShadow: '0 1px 3px rgba(31,27,46,0.2)',
                }}/>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* FAB */}
      <button style={{
        position:'absolute', right: 22, bottom: 24,
        width: 60, height: 60, borderRadius: 22, border:'none',
        background: MP.primary, color:'#fff', cursor:'pointer',
        boxShadow: '0 14px 30px -8px rgba(107,91,255,0.55)',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <Icon d={I.plus} size={28} color="#fff" stroke={2.5}/>
      </button>
    </div>
  );
}
window.ScreenMeds = ScreenMeds;

// ── SCREEN 4 — AI Prescription Reader ─────────────────────────
function ScreenAIReader() {
  const identified = [
    { name: 'Prednisolona 10 mg', use:'Anti-inflamatório para reduzir alergia e coceira na pele.',
      dose:'1 comprimido • 2x ao dia • por 7 dias', icon: I.pill, color: MP.primary, bg: MP.primarySoft },
    { name: 'Protetor Hepático', use:'Apoia o fígado durante o uso de outros remédios.',
      dose:'2.5 ml • 2x ao dia • por 14 dias', icon: I.bottle, color: MP.sky, bg: MP.skySoft },
  ];
  const schedule = [
    { time:'07h', label:'Manhã',     icon: I.sun,  med:'Prednisolona' },
    { time:'15h', label:'Tarde',     icon: I.noon, med:'Prednisolona + Protetor' },
    { time:'23h', label:'Noite',     icon: I.moon, med:'Protetor' },
  ];
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg}}>
      <div style={{padding:'8px 20px 6px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Icon d="M15 6l-6 6 6 6" size={20} color={MP.ink} stroke={2.2}/>
        </div>
        <div style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Icon d={I.more} size={18} color={MP.ink}/>
        </div>
      </div>

      <div style={{flex:1, overflow:'auto', padding:'10px 20px 24px'}}>
        <div style={{fontSize: 28, fontWeight: 800, letterSpacing: -0.6, color: MP.ink, lineHeight:1.15}}>
          Receita<br/>Inteligente <span style={{display:'inline-block', marginLeft:4}}>🤖</span>
        </div>
        <div style={{fontSize: 13, color: MP.inkSoft, marginTop: 6}}>
          Lemos sua receita e organizamos tudo pra você.
        </div>

        {/* Document preview */}
        <Card pad={14} style={{marginTop: 18, display:'flex', gap:14, alignItems:'center'}}>
          <Stripe w={68} h={86} label="RX" radius={12}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{display:'flex', alignItems:'center', gap:6}}>
              <Icon d={I.sparkle} size={14} color={MP.primary} fill={MP.primary}/>
              <span style={{fontSize:12, color: MP.primary, fontWeight: 800, letterSpacing: 0.3, textTransform:'uppercase'}}>Analisando com IA</span>
            </div>
            <div style={{fontWeight: 800, fontSize: 14, color: MP.ink, marginTop: 4}}>
              receita-leia-12mai.pdf
            </div>
            <div style={{fontSize: 12, color: MP.inkSoft, marginTop: 2}}>Dr. Henrique Vasconcelos · CRMV 4821</div>
            {/* progress dots */}
            <div style={{display:'flex', alignItems:'center', gap: 6, marginTop: 10}}>
              <div style={{flex:1, height: 4, borderRadius: 99, background: MP.primarySoft, overflow:'hidden'}}>
                <div style={{width:'72%', height:'100%', background: MP.primary, borderRadius: 99}}/>
              </div>
              <span style={{fontSize:11, color: MP.inkSoft, fontWeight:700}}>72%</span>
            </div>
          </div>
        </Card>

        {/* Identified meds */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 22}}>
          <div style={{fontWeight: 800, fontSize: 16, color: MP.ink}}>Medicamentos identificados</div>
          <Pill color={MP.mint} bg={MP.mintSoft} size={10}>2 itens</Pill>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:12}}>
          {identified.map((m,i)=>(
            <Card key={i} pad={14}>
              <div style={{display:'flex', alignItems:'flex-start', gap:12}}>
                <div style={{width:42, height:42, borderRadius:12, background:m.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  <Icon d={m.icon} size={20} color={m.color}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight: 800, fontSize: 15, color: MP.ink}}>{m.name}</div>
                  <div style={{fontSize: 12, color: MP.inkSoft, marginTop: 2}}>{m.dose}</div>
                </div>
              </div>
              <div style={{
                marginTop: 12, padding: '12px 14px',
                background: MP.primarySofter, borderRadius: 14,
                borderLeft: `3px solid ${MP.primary}`,
              }}>
                <div style={{fontSize: 11, color: MP.primary, fontWeight: 800, letterSpacing: 0.4, textTransform:'uppercase', marginBottom: 4}}>Para que serve</div>
                <div style={{fontSize: 13, color: MP.ink, lineHeight: 1.45}}>{m.use}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Schedule timeline */}
        <div style={{marginTop: 22, display:'flex', alignItems:'center', gap:6}}>
          <Icon d={I.sparkle} size={16} color={MP.primary} fill={MP.primary}/>
          <span style={{fontWeight: 800, fontSize: 16, color: MP.ink}}>Horários sugeridos pela IA</span>
        </div>
        <Card pad={18} style={{marginTop:12}}>
          <div style={{position:'relative', paddingLeft: 32}}>
            {/* vertical line */}
            <div style={{position:'absolute', left:14, top: 14, bottom: 14, width: 2,
              background: `repeating-linear-gradient(180deg, ${MP.lilac} 0 4px, transparent 4px 8px)`}}/>
            {schedule.map((s,i)=>(
              <div key={i} style={{display:'flex', alignItems:'center', gap:14, padding: '10px 0', position:'relative'}}>
                <div style={{
                  position:'absolute', left: -32, width: 30, height: 30, borderRadius:'50%',
                  background: MP.primary, color:'#fff',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow: '0 0 0 4px '+MP.bg,
                }}>
                  <Icon d={s.icon} size={16} color="#fff" stroke={2}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{display:'flex', alignItems:'baseline', gap:6}}>
                    <span style={{fontWeight:800, fontSize:16, color: MP.ink}}>{s.time}</span>
                    <span style={{fontSize: 12, color: MP.inkSoft}}>· {s.label}</span>
                  </div>
                  <div style={{fontSize: 13, color: MP.inkSoft, marginTop: 2}}>{s.med}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <button style={{
          marginTop: 20, width:'100%', height: 56, borderRadius: 18, border:'none',
          background: MP.primary, color:'#fff', fontFamily: FONT, fontSize: 16, fontWeight: 800,
          display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer',
          boxShadow: '0 12px 26px -10px rgba(107,91,255,0.6)',
        }}>
          <Icon d={I.sparkle} size={18} color="#fff" fill="#fff"/>
          Ativar agenda completa
        </button>
        <div style={{textAlign:'center', fontSize: 12, color: MP.inkMute, marginTop: 10, lineHeight:1.5}}>
          Você pode ajustar horários a qualquer momento.
        </div>
      </div>
    </div>
  );
}
window.ScreenAIReader = ScreenAIReader;
