// Screens 5-8 — Today, Pet Profile, Finance, Lock Screen Notif

// ── SCREEN 5 — Today / Daily Agenda ───────────────────────────
function ScreenToday() {
  const dates = [
    { d:'sab', n:12, p:false },
    { d:'dom', n:13, p:false },
    { d:'seg', n:14, active:true, p:true },
    { d:'ter', n:15, p:false },
    { d:'qua', n:16, p:false },
    { d:'qui', n:17, p:false },
    { d:'sex', n:18, p:false },
  ];
  const events = [
    { time:'07:00', icon: I.bowl, color: MP.amber,   bg: MP.amberSoft, title:'Café da manhã',         sub:'Ração 80g · Leia', done:true },
    { time:'08:00', icon: I.pill, color: MP.primary, bg: MP.primarySoft, title:'Apoquel 16mg',         sub:'1 comprimido com comida', done:true },
    { time:'10:30', icon: I.walk, color: MP.mint,    bg: MP.mintSoft, title:'Passeio matinal',         sub:'30 min · Parque Ibirapuera', done:false, late:true },
    { time:'12:30', icon: I.bowl, color: MP.amber,   bg: MP.amberSoft, title:'Almoço da Leia',        sub:'Ração úmida · Sachê de frango', done:false },
    { time:'15:00', icon: I.pill, color: MP.primary, bg: MP.primarySoft, title:'Prednisolona 10mg',   sub:'1 comprimido após refeição', done:false },
    { time:'18:00', icon: I.walk, color: MP.mint,    bg: MP.mintSoft, title:'Passeio da tarde',       sub:'20 min · Volta no quarteirão', done:false },
    { time:'22:00', icon: I.bottle, color: MP.sky,   bg: MP.skySoft, title:'Protetor Hepático',       sub:'2.5ml líquido · Leia', done:false },
  ];

  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg}}>
      <div style={{padding:'8px 20px 4px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize: 11, color: MP.inkMute, fontWeight:700, letterSpacing: 0.5, textTransform:'uppercase'}}>14 de maio</div>
          <div style={{fontSize: 26, fontWeight: 800, letterSpacing:-0.6, color: MP.ink, marginTop: 2}}>Hoje, segunda 🐾</div>
        </div>
        <div style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Icon d={I.search} size={18} color={MP.ink}/>
        </div>
      </div>

      {/* Date strip */}
      <div style={{display:'flex', gap:8, padding:'14px 20px 6px', overflowX:'auto'}}>
        {dates.map((d,i)=>(
          <div key={i} style={{
            width: 50, padding:'10px 0', textAlign:'center', borderRadius: 16, flexShrink: 0,
            background: d.active ? MP.primary : MP.surface,
            color: d.active ? '#fff' : MP.ink,
            border: `1px solid ${d.active ? MP.primary : MP.hairline}`,
            boxShadow: d.active ? '0 8px 18px -8px rgba(107,91,255,0.55)' : 'none',
          }}>
            <div style={{fontSize: 11, fontWeight: 700, opacity: d.active ? 0.85 : 0.6, textTransform:'uppercase'}}>{d.d}</div>
            <div style={{fontSize: 18, fontWeight: 800, marginTop: 2}}>{d.n}</div>
            <div style={{height: 4, marginTop: 6, display:'flex', justifyContent:'center', gap: 2}}>
              {d.p && <div style={{width:4, height:4, borderRadius:'50%', background: d.active ? '#fff' : MP.primary}}/>}
            </div>
          </div>
        ))}
      </div>

      {/* Progress summary */}
      <div style={{padding: '8px 20px 0'}}>
        <Card pad={14} style={{display:'flex', alignItems:'center', gap: 12, background: MP.ink, border: 'none'}}>
          <div style={{
            width:46, height:46, borderRadius:'50%', position:'relative',
            background: `conic-gradient(${MP.mint} 0 ${(2/7)*360}deg, rgba(255,255,255,0.18) 0)`,
          }}>
            <div style={{position:'absolute', inset: 5, borderRadius:'50%', background: MP.ink,
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight: 800, fontSize: 13}}>2/7</div>
          </div>
          <div style={{flex:1}}>
            <div style={{color:'#fff', fontWeight: 800, fontSize: 14}}>Boa rotina hoje 💪</div>
            <div style={{color:'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 2}}>2 de 7 atividades concluídas</div>
          </div>
          <Pill color="#fff" bg="rgba(255,255,255,0.14)" size={10}>1 atrasada</Pill>
        </Card>
      </div>

      {/* Timeline */}
      <div style={{flex:1, overflow:'auto', padding:'14px 20px 24px'}}>
        <div style={{position:'relative', paddingLeft: 64}}>
          {/* vertical line */}
          <div style={{position:'absolute', left: 56, top: 8, bottom: 8, width: 2, background: MP.hairline}}/>
          {events.map((e,i)=>(
            <div key={i} style={{position:'relative', marginBottom: 12}}>
              <div style={{position:'absolute', left: -64, top: 14, width: 50, textAlign:'right',
                fontSize: 13, fontWeight: 800, color: e.done ? MP.inkMute : MP.ink}}>{e.time}</div>
              {/* node */}
              <div style={{
                position:'absolute', left: -14, top: 14, width: 14, height: 14, borderRadius:'50%',
                background: e.done ? MP.mint : (e.late ? MP.coral : MP.surface),
                border: e.done ? `3px solid ${MP.mint}` : `3px solid ${e.late ? MP.coral : MP.lilac}`,
                boxShadow: '0 0 0 3px '+MP.bg,
              }}/>
              <Card pad={14} style={{opacity: e.done ? 0.65 : 1}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:40, height:40, borderRadius:12, background: e.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                    <Icon d={e.icon} size={20} color={e.color}/>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', alignItems:'center', gap:6, flexWrap:'wrap'}}>
                      <span style={{
                        fontWeight: 800, fontSize: 14, color: MP.ink,
                        textDecoration: e.done ? 'line-through' : 'none',
                      }}>{e.title}</span>
                      {e.late && <Pill color={MP.coral} bg={MP.coralSoft} size={10}>atrasado</Pill>}
                    </div>
                    <div style={{fontSize: 12, color: MP.inkSoft, marginTop: 2}}>{e.sub}</div>
                  </div>
                  {/* check button */}
                  <div style={{
                    width: 32, height: 32, borderRadius:'50%', flexShrink: 0,
                    background: e.done ? MP.mint : 'transparent',
                    border: e.done ? 'none' : `2px solid ${e.late ? MP.coral : MP.hairline}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    {e.done && <Icon d={I.check} size={16} color="#fff" stroke={3}/>}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="today"/>
    </div>
  );
}
window.ScreenToday = ScreenToday;

// ── SCREEN 6 — Pet Profile ────────────────────────────────────
function ScreenPet() {
  const rows = [
    { label:'Histórico de saúde',    icon: I.heart,    bg: MP.coralSoft,   fg: MP.coral,   meta:'12 registros' },
    { label:'Medicamentos ativos',   icon: I.pill,     bg: MP.primarySoft, fg: MP.primary, meta:'5 ativos', dot:true },
    { label:'Consultas',             icon: I.cal,      bg: MP.skySoft,     fg: MP.sky,     meta:'Próxima · 22 mai' },
    { label:'Documentos',            icon: I.folder,   bg: MP.amberSoft,   fg: MP.amber,   meta:'8 arquivos' },
    { label:'Vacinas',               icon: I.shield,   bg: MP.mintSoft,    fg: MP.mint,    meta:'Em dia' },
    { label:'Diário & comportamento',icon: I.notebook, bg: '#F1E9FF',      fg: '#8C5BFF',  meta:'3 notas esta semana' },
  ];
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg, position:'relative', overflow:'hidden'}}>
      {/* purple wash at top */}
      <div style={{position:'absolute', top: 0, left:0, right:0, height: 240,
        background: `radial-gradient(120% 80% at 50% 0%, ${MP.primarySoft} 0%, ${MP.bg} 70%)`}}/>

      <div style={{padding:'8px 20px 6px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative'}}>
        <div style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Icon d="M15 6l-6 6 6 6" size={20} color={MP.ink} stroke={2.2}/>
        </div>
        <div style={{display:'flex', gap:8}}>
          <div style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon d={I.bell} size={18} color={MP.ink}/>
          </div>
          <div style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon d={I.more} size={18} color={MP.ink}/>
          </div>
        </div>
      </div>

      <div style={{flex:1, overflow:'auto', padding: '8px 20px 24px', position:'relative'}}>
        {/* Pet hero */}
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', marginTop: 12}}>
          <DogPortrait size={140}/>
          <div style={{marginTop: 16, fontSize: 30, fontWeight: 800, letterSpacing:-0.7, color: MP.ink}}>Leia</div>
          <div style={{fontSize: 14, color: MP.inkSoft, marginTop: 2}}>SRD · fêmea · castrada</div>
          {/* chips */}
          <div style={{display:'flex', gap: 8, marginTop: 16}}>
            {[
              {l:'8 anos',  s:'idade'},
              {l:'12.3 kg', s:'peso'},
              {l:'SRD',     s:'raça'},
            ].map((c,i)=>(
              <div key={i} style={{
                padding:'8px 14px', borderRadius: 16, background: MP.surface,
                border: `1px solid ${MP.hairline}`, boxShadow:'0 2px 6px rgba(31,27,46,0.04)',
                textAlign:'left',
              }}>
                <div style={{fontSize: 10, color: MP.inkMute, fontWeight:700, letterSpacing:0.4, textTransform:'uppercase'}}>{c.s}</div>
                <div style={{fontSize: 14, fontWeight: 800, color: MP.ink, marginTop: 1}}>{c.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section list */}
        <Card pad={0} style={{marginTop: 22, overflow:'hidden'}}>
          {rows.map((r,i)=>(
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:14, padding: '14px 16px',
              borderBottom: i < rows.length - 1 ? `1px solid ${MP.hairline}` : 'none',
            }}>
              <div style={{width:40, height:40, borderRadius:12, background: r.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                <Icon d={r.icon} size={20} color={r.fg}/>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', alignItems:'center', gap:6}}>
                  <span style={{fontWeight: 800, fontSize: 14, color: MP.ink}}>{r.label}</span>
                  {r.dot && <span style={{width:6, height:6, borderRadius:'50%', background: MP.coral, display:'inline-block'}}/>}
                </div>
                <div style={{fontSize: 12, color: MP.inkSoft, marginTop: 2}}>{r.meta}</div>
              </div>
              <Icon d={I.chevR} size={18} color={MP.inkMute}/>
            </div>
          ))}
        </Card>

        <button style={{
          marginTop: 16, width:'100%', height: 52, borderRadius: 16,
          background: 'transparent', color: MP.primary,
          border: `1.5px solid ${MP.primary}`, fontFamily: FONT, fontSize: 15, fontWeight: 800,
          display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer',
        }}>
          <Icon d={I.edit} size={16} color={MP.primary} stroke={2.2}/>
          Editar perfil
        </button>
      </div>
    </div>
  );
}
window.ScreenPet = ScreenPet;

// ── SCREEN 7 — Financial Dashboard ────────────────────────────
function ScreenFinance() {
  const segments = [
    { label:'Medicamentos', value: 542.30, pct: 43.5, color: MP.primary },
    { label:'Consultas',    value: 380.00, pct: 30.5, color: MP.sky },
    { label:'Alimentação',  value: 245.50, pct: 19.7, color: MP.amber },
    { label:'Outros',       value:  80.00, pct:  6.3, color: MP.mint },
  ];
  const expenses = [
    { name:'Veterinário Dr. Henrique', cat:'Consulta',     icon: I.heart,  bg: MP.skySoft, fg: MP.sky,     date:'12 mai', val: 280.00 },
    { name:'Prednisolona 10mg',        cat:'Medicamento',  icon: I.pill,   bg: MP.primarySoft, fg: MP.primary, date:'12 mai', val:  68.40 },
    { name:'Ração Premier sênior',     cat:'Alimentação',  icon: I.bowl,   bg: MP.amberSoft,   fg: MP.amber,  date:'09 mai', val: 145.90 },
    { name:'Protetor hepático',        cat:'Medicamento',  icon: I.bottle, bg: MP.primarySoft, fg: MP.primary, date:'07 mai', val:  92.50 },
    { name:'Banho & tosa',             cat:'Outros',       icon: I.paw,    bg: MP.mintSoft,    fg: MP.mint,   date:'04 mai', val:  80.00 },
  ];

  // donut – stroked circle, drawn with offsets
  const r = 56, c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg}}>
      <div style={{padding:'8px 20px 0', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize: 28, fontWeight: 800, letterSpacing:-0.6, color: MP.ink}}>Finanças</div>
          <div style={{marginTop: 4, display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 12px', borderRadius: 99, background: MP.surface, border:`1px solid ${MP.hairline}`,
            fontSize: 12, color: MP.ink, fontWeight: 700}}>
            Maio 2026 <Icon d={I.chevD} size={12} color={MP.inkSoft} stroke={2.4}/>
          </div>
        </div>
        <div style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Icon d={I.search} size={18} color={MP.ink}/>
        </div>
      </div>

      <div style={{flex:1, overflow:'auto', padding: '16px 20px 24px'}}>
        {/* Hero summary */}
        <Card pad={20} style={{
          background: `linear-gradient(135deg, ${MP.primary} 0%, ${MP.primaryDeep} 100%)`,
          border:'none', color: '#fff', position:'relative', overflow:'hidden',
        }}>
          {/* decorative paw */}
          <div style={{position:'absolute', right: -16, bottom: -20, opacity: 0.10}}>
            <Icon d={I.paw} size={140} color="#fff"/>
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div>
              <div style={{fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 700, letterSpacing: 0.4, textTransform:'uppercase'}}>Total no mês</div>
              <div style={{fontSize: 38, fontWeight: 800, marginTop: 6, letterSpacing: -1.2}}>
                <span style={{fontSize: 18, opacity: 0.7, marginRight: 4, fontWeight: 700}}>R$</span>1.247<span style={{fontSize: 24}}>,80</span>
              </div>
              <div style={{fontSize: 13, color:'rgba(255,255,255,0.78)', marginTop: 6, display:'flex', alignItems:'center', gap:6}}>
                este mês com a <strong>Leia</strong>
              </div>
            </div>
          </div>
          <div style={{
            marginTop: 14, display:'flex', alignItems:'center', gap: 8,
            padding:'8px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.15)',
            width:'fit-content',
          }}>
            <div style={{width:6, height:6, borderRadius:'50%', background: '#7CE3B5'}}/>
            <span style={{fontSize: 12, fontWeight: 700}}>12% menos que abril</span>
          </div>
        </Card>

        {/* Donut */}
        <Card pad={18} style={{marginTop: 14, display:'flex', alignItems:'center', gap: 16}}>
          <div style={{position:'relative', width: 130, height: 130, flexShrink: 0}}>
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r={r} fill="none" stroke={MP.bgDeep} strokeWidth="14"/>
              {segments.map((s,i) => {
                const len = (s.pct / 100) * c;
                const off = c - acc;
                acc += len;
                return (
                  <circle key={i} cx="65" cy="65" r={r} fill="none"
                    stroke={s.color} strokeWidth="14"
                    strokeDasharray={`${len} ${c}`}
                    strokeDashoffset={off}
                    transform="rotate(-90 65 65)"
                    strokeLinecap="butt"/>
                );
              })}
            </svg>
            <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <div style={{fontSize: 11, color: MP.inkMute, fontWeight: 700, textTransform:'uppercase', letterSpacing: 0.4}}>Categorias</div>
              <div style={{fontSize: 22, fontWeight: 800, color: MP.ink, marginTop: 2}}>4</div>
            </div>
          </div>
          <div style={{flex:1, display:'flex', flexDirection:'column', gap: 8}}>
            {segments.map((s,i)=>(
              <div key={i} style={{display:'flex', alignItems:'center', gap: 8}}>
                <div style={{width: 10, height: 10, borderRadius: 3, background: s.color}}/>
                <span style={{flex:1, fontSize: 12, color: MP.ink, fontWeight: 700}}>{s.label}</span>
                <span style={{fontSize: 12, color: MP.inkSoft, fontWeight: 700}}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent expenses */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 22}}>
          <div style={{fontWeight: 800, fontSize: 16, color: MP.ink}}>Gastos recentes</div>
          <span style={{fontSize: 12, color: MP.primary, fontWeight: 700}}>Ver tudo</span>
        </div>
        <Card pad={0} style={{marginTop: 12, overflow:'hidden'}}>
          {expenses.map((e,i)=>(
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
              borderBottom: i < expenses.length - 1 ? `1px solid ${MP.hairline}` : 'none',
            }}>
              <div style={{width:38, height:38, borderRadius:12, background: e.bg, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Icon d={e.icon} size={18} color={e.fg}/>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontWeight: 700, fontSize: 14, color: MP.ink, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{e.name}</div>
                <div style={{fontSize: 11, color: MP.inkSoft, marginTop: 1}}>{e.cat} · {e.date}</div>
              </div>
              <div style={{fontSize: 14, fontWeight: 800, color: MP.ink}}>
                R$ {e.val.toFixed(2).replace('.', ',')}
              </div>
            </div>
          ))}
        </Card>

        {/* Action buttons */}
        <div style={{display:'flex', gap: 10, marginTop: 18}}>
          <button style={{
            flex:1, height: 52, borderRadius: 16, background: 'transparent',
            color: MP.ink, border: `1.5px solid ${MP.hairline}`,
            fontFamily: FONT, fontSize: 14, fontWeight: 800, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap: 6,
          }}>
            <Icon d={I.export} size={16} color={MP.ink} stroke={2.2}/>
            Exportar PDF
          </button>
          <button style={{
            flex:1.2, height: 52, borderRadius: 16, background: MP.primary,
            color: '#fff', border: 'none',
            fontFamily: FONT, fontSize: 14, fontWeight: 800, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap: 6,
            boxShadow: '0 10px 22px -10px rgba(107,91,255,0.55)',
          }}>
            <Icon d={I.plus} size={16} color="#fff" stroke={2.6}/>
            Adicionar gasto
          </button>
        </div>
      </div>
    </div>
  );
}
window.ScreenFinance = ScreenFinance;

// ── SCREEN 8 — Lock Screen Notification ───────────────────────
function ScreenLockNotif() {
  return (
    <div style={{
      height:'100%', position:'relative', overflow:'hidden',
      background: `linear-gradient(160deg, #2A1F4A 0%, #4A3580 35%, #6B5BFF 100%)`,
    }}>
      {/* blurred orbs in bg */}
      <div style={{position:'absolute', top:-60, left:-50, width: 240, height: 240, borderRadius:'50%',
        background: 'radial-gradient(circle, rgba(255,175,200,0.55), transparent 70%)', filter:'blur(20px)'}}/>
      <div style={{position:'absolute', bottom:80, right:-40, width: 260, height: 260, borderRadius:'50%',
        background: 'radial-gradient(circle, rgba(124,107,255,0.55), transparent 70%)', filter:'blur(30px)'}}/>
      <div style={{position:'absolute', top:280, right:-80, width: 200, height: 200, borderRadius:'50%',
        background: 'radial-gradient(circle, rgba(244,196,74,0.30), transparent 70%)', filter:'blur(30px)'}}/>

      {/* Lock indicator */}
      <div style={{position:'absolute', top: 56, left: '50%', transform:'translateX(-50%)', color:'rgba(255,255,255,0.6)'}}>
        <svg width="14" height="18" viewBox="0 0 14 18">
          <path d="M3 8V5a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.6" fill="none"/>
          <rect x="1" y="8" width="12" height="9" rx="2" fill="currentColor"/>
        </svg>
      </div>

      {/* Time + date */}
      <div style={{textAlign:'center', color:'#fff', paddingTop: 92}}>
        <div style={{fontSize: 16, fontWeight: 600, opacity: 0.85, letterSpacing: 0.5}}>segunda-feira, 14 de maio</div>
        <div style={{
          fontSize: 90, fontWeight: 200, lineHeight: 1, marginTop: 4,
          letterSpacing: -3,
        }}>15:00</div>
      </div>

      {/* Notification card */}
      <div style={{padding: '38px 14px 0'}}>
        <div style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.6)',
          borderRadius: 22, padding: '12px 14px 8px',
          boxShadow: '0 10px 40px rgba(20,10,40,0.25)',
          color: MP.ink,
        }}>
          {/* Header line */}
          <div style={{display:'flex', alignItems:'center', gap: 8, marginBottom: 6}}>
            <div style={{
              width:22, height:22, borderRadius: 6, background: MP.primary,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <Icon d={I.paw} size={14} color="#fff" stroke={2.2}/>
            </div>
            <span style={{fontSize: 12, fontWeight: 700, color: MP.inkSoft, letterSpacing: 0.3, textTransform:'uppercase'}}>
              MinhasPatas
            </span>
            <span style={{flex:1}}/>
            <span style={{fontSize: 12, color: MP.inkSoft, fontWeight: 600}}>agora</span>
          </div>
          <div style={{fontSize: 15, fontWeight: 800, color: MP.ink, letterSpacing: -0.2}}>
            💊 Hora do remédio da Leia!
          </div>
          <div style={{fontSize: 13, color: MP.inkSoft, marginTop: 4, lineHeight: 1.45}}>
            Prednisolona 10mg — Dar com comida.<br/>Deslize para confirmar.
          </div>

          {/* Action row */}
          <div style={{display:'flex', gap:8, marginTop: 12, paddingTop: 10, borderTop:`1px solid ${MP.hairline}`}}>
            <button style={{
              flex: 1, height: 38, borderRadius: 12, border:'none',
              background: MP.primary, color:'#fff', fontFamily: FONT, fontWeight: 800, fontSize: 13,
              display:'flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer',
            }}>
              <Icon d={I.check} size={14} color="#fff" stroke={3}/> Confirmar
            </button>
            <button style={{
              flex: 1, height: 38, borderRadius: 12,
              background: 'rgba(31,27,46,0.06)', color: MP.ink,
              border: 'none', fontFamily: FONT, fontWeight: 800, fontSize: 13, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:6,
            }}>
              ⏰ Adiar 15min
            </button>
          </div>
        </div>

        {/* Second muted notification */}
        <div style={{
          marginTop: 8, padding:'10px 14px', borderRadius: 18,
          background: 'rgba(255,255,255,0.20)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color:'#fff',
        }}>
          <div style={{display:'flex', alignItems:'center', gap: 8}}>
            <div style={{
              width:18, height:18, borderRadius: 5, background:'rgba(255,255,255,0.25)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <Icon d={I.cal} size={12} color="#fff" stroke={2}/>
            </div>
            <span style={{fontSize: 11, fontWeight:700, letterSpacing:0.3, textTransform:'uppercase', opacity: 0.85}}>Lembrete</span>
            <span style={{flex:1}}/>
            <span style={{fontSize: 11, opacity: 0.75}}>14:00</span>
          </div>
          <div style={{fontSize: 13, fontWeight: 700, marginTop: 4}}>Passeio da Leia em 1h</div>
        </div>
      </div>

      {/* Camera + flashlight buttons */}
      <div style={{
        position:'absolute', bottom: 48, left: 0, right: 0,
        display:'flex', justifyContent:'space-between', padding:'0 32px',
      }}>
        {[1,2].map(k => (
          <div key={k} style={{
            width: 50, height: 50, borderRadius:'50%',
            background:'rgba(31,27,46,0.45)', backdropFilter:'blur(16px)',
            WebkitBackdropFilter:'blur(16px)',
            display:'flex', alignItems:'center', justifyContent:'center', color:'#fff',
          }}>
            {k === 1 ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#fff"><path d="M10 4l1.5-2h5l1.5 2A2 2 0 0119 6v9a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 011-1.7L5 4z"/><circle cx="10" cy="11" r="3" fill="#2A1F4A"/></svg>
            ) : (
              <Icon d={I.scan} size={20} color="#fff" stroke={2.2}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
window.ScreenLockNotif = ScreenLockNotif;
