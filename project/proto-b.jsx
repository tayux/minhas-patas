// MinhasPatas — Prototype screens part B: AI, Today, Pet, Finance, Lock + App shell

// ── AI Reader ──────────────────────────────────────────────────
function PrAIReader() {
  const { nav, back } = useNav();
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    if (!analyzing) return;
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setAnalyzing(false); return 100; }
        return p + 4;
      });
    }, 80);
    return () => clearInterval(t);
  }, [analyzing]);

  const identified = [
    { name: 'Prednisolona 10 mg', use:'Anti-inflamatório para reduzir alergia e coceira na pele.',
      dose:'1 comprimido • 2x ao dia • por 7 dias', icon: I.pill, color: MP.primary, bg: MP.primarySoft },
    { name: 'Protetor Hepático', use:'Apoia o fígado durante o uso de outros remédios.',
      dose:'2.5 ml • 2x ao dia • por 14 dias', icon: I.bottle, color: MP.sky, bg: MP.skySoft },
  ];
  const schedule = [
    { time:'07h', label:'Manhã', icon: I.sun,  med:'Prednisolona' },
    { time:'15h', label:'Tarde', icon: I.noon, med:'Prednisolona + Protetor' },
    { time:'23h', label:'Noite', icon: I.moon, med:'Protetor' },
  ];

  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg}}>
      <div style={{padding:'8px 20px 6px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div onClick={back} style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
          <Icon d="M15 6l-6 6 6 6" size={20} color={MP.ink} stroke={2.2}/>
        </div>
        <div style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Icon d={I.more} size={18} color={MP.ink}/>
        </div>
      </div>

      <div style={{flex:1, overflow:'auto', padding:'10px 20px 24px'}} className="phone-scroll">
        <div style={{fontSize: 28, fontWeight: 800, letterSpacing: -0.6, color: MP.ink, lineHeight:1.15}}>
          Receita<br/>Inteligente <span style={{display:'inline-block', marginLeft:4}}>🤖</span>
        </div>
        <div style={{fontSize: 13, color: MP.inkSoft, marginTop: 6}}>
          Lemos sua receita e organizamos tudo pra você.
        </div>

        <Card pad={14} style={{marginTop: 18, display:'flex', gap:14, alignItems:'center'}}>
          <Stripe w={68} h={86} label="RX" radius={12}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{display:'flex', alignItems:'center', gap:6}}>
              <Icon d={I.sparkle} size={14} color={MP.primary} fill={MP.primary}/>
              <span style={{fontSize:12, color: MP.primary, fontWeight: 800, letterSpacing: 0.3, textTransform:'uppercase'}}>
                {analyzing ? <>Analisando com IA<Dots/></> : 'Análise concluída'}
              </span>
            </div>
            <div style={{fontWeight: 800, fontSize: 14, color: MP.ink, marginTop: 4}}>
              receita-leia-12mai.pdf
            </div>
            <div style={{fontSize: 12, color: MP.inkSoft, marginTop: 2}}>Dr. Henrique Vasconcelos · CRMV 4821</div>
            <div style={{display:'flex', alignItems:'center', gap: 6, marginTop: 10}}>
              <div style={{flex:1, height: 4, borderRadius: 99, background: MP.primarySoft, overflow:'hidden'}}>
                <div style={{width: progress+'%', height:'100%', background: MP.primary, borderRadius: 99, transition:'width 0.2s'}}/>
              </div>
              <span style={{fontSize:11, color: MP.inkSoft, fontWeight:700}}>{progress}%</span>
            </div>
          </div>
        </Card>

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 22}}>
          <div style={{fontWeight: 800, fontSize: 16, color: MP.ink}}>Medicamentos identificados</div>
          <Pill color={MP.mint} bg={MP.mintSoft} size={10}>2 itens</Pill>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:12}}>
          {identified.map((m,i)=>(
            <Card key={i} pad={14} style={{opacity: progress < 50 ? 0.5 : 1, transition:'opacity 0.3s'}}>
              <div style={{display:'flex', alignItems:'flex-start', gap:12}}>
                <div style={{width:42, height:42, borderRadius:12, background:m.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  <Icon d={m.icon} size={20} color={m.color}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight: 800, fontSize: 15, color: MP.ink}}>{m.name}</div>
                  <div style={{fontSize: 12, color: MP.inkSoft, marginTop: 2}}>{m.dose}</div>
                </div>
              </div>
              <div style={{marginTop: 12, padding: '12px 14px', background: MP.primarySofter, borderRadius: 14, borderLeft: `3px solid ${MP.primary}`}}>
                <div style={{fontSize: 11, color: MP.primary, fontWeight: 800, letterSpacing: 0.4, textTransform:'uppercase', marginBottom: 4}}>Para que serve</div>
                <div style={{fontSize: 13, color: MP.ink, lineHeight: 1.45}}>{m.use}</div>
              </div>
            </Card>
          ))}
        </div>

        <div style={{marginTop: 22, display:'flex', alignItems:'center', gap:6}}>
          <Icon d={I.sparkle} size={16} color={MP.primary} fill={MP.primary}/>
          <span style={{fontWeight: 800, fontSize: 16, color: MP.ink}}>Horários sugeridos pela IA</span>
        </div>
        <Card pad={18} style={{marginTop:12, opacity: progress < 80 ? 0.4 : 1, transition:'opacity 0.3s'}}>
          <div style={{position:'relative', paddingLeft: 32}}>
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

        <button disabled={analyzing} onClick={() => nav('today')} style={{
          marginTop: 20, width:'100%', height: 56, borderRadius: 18, border:'none',
          background: analyzing ? MP.bgDeep : MP.primary, color: analyzing ? MP.inkMute : '#fff',
          fontFamily: FONT, fontSize: 16, fontWeight: 800,
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          cursor: analyzing ? 'not-allowed' : 'pointer',
          boxShadow: analyzing ? 'none' : '0 12px 26px -10px rgba(107,91,255,0.6)',
          transition:'all 0.3s',
        }}>
          <Icon d={I.sparkle} size={18} color={analyzing ? MP.inkMute : '#fff'} fill={analyzing ? MP.inkMute : '#fff'}/>
          {analyzing ? 'Analisando...' : 'Ativar agenda completa'}
        </button>
        <div style={{textAlign:'center', fontSize: 12, color: MP.inkMute, marginTop: 10, lineHeight:1.5}}>
          Você pode ajustar horários a qualquer momento.
        </div>
      </div>
    </div>
  );
}

function Dots() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN(x => (x+1)%4), 400);
    return () => clearInterval(t);
  }, []);
  return <span style={{display:'inline-block', width: 18, textAlign:'left'}}>{'.'.repeat(n)}</span>;
}

// ── Today ──────────────────────────────────────────────────────
function PrToday() {
  const { nav, state, setState } = useNav();
  const dates = [
    { d:'sab', n:12 }, { d:'dom', n:13 }, { d:'seg', n:14, p:true },
    { d:'ter', n:15 }, { d:'qua', n:16 }, { d:'qui', n:17 }, { d:'sex', n:18 },
  ];
  const events = state.events;
  const doneCount = events.filter(e => e.done).length;

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

      <div style={{display:'flex', gap:8, padding:'14px 20px 6px', overflowX:'auto'}} className="phone-scroll">
        {dates.map((d,i)=>{
          const active = state.date === d.n;
          return (
            <div key={i} onClick={() => setState({ date: d.n })} style={{
              width: 50, padding:'10px 0', textAlign:'center', borderRadius: 16, flexShrink: 0,
              background: active ? MP.primary : MP.surface,
              color: active ? '#fff' : MP.ink,
              border: `1px solid ${active ? MP.primary : MP.hairline}`,
              boxShadow: active ? '0 8px 18px -8px rgba(107,91,255,0.55)' : 'none',
              cursor:'pointer', transition:'all 0.18s',
            }}>
              <div style={{fontSize: 11, fontWeight: 700, opacity: active ? 0.85 : 0.6, textTransform:'uppercase'}}>{d.d}</div>
              <div style={{fontSize: 18, fontWeight: 800, marginTop: 2}}>{d.n}</div>
              <div style={{height: 4, marginTop: 6, display:'flex', justifyContent:'center', gap: 2}}>
                {d.p && <div style={{width:4, height:4, borderRadius:'50%', background: active ? '#fff' : MP.primary}}/>}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{padding: '8px 20px 0'}}>
        <Card pad={14} style={{display:'flex', alignItems:'center', gap: 12, background: MP.ink, border: 'none'}}>
          <div style={{
            width:46, height:46, borderRadius:'50%', position:'relative',
            background: `conic-gradient(${MP.mint} 0 ${(doneCount/events.length)*360}deg, rgba(255,255,255,0.18) 0)`,
            transition: 'background 0.4s',
          }}>
            <div style={{position:'absolute', inset: 5, borderRadius:'50%', background: MP.ink,
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight: 800, fontSize: 13}}>{doneCount}/{events.length}</div>
          </div>
          <div style={{flex:1}}>
            <div style={{color:'#fff', fontWeight: 800, fontSize: 14}}>
              {doneCount === events.length ? 'Rotina completa! 🎉' : (doneCount > events.length/2 ? 'Quase lá 💪' : 'Boa rotina hoje')}
            </div>
            <div style={{color:'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 2}}>{doneCount} de {events.length} atividades concluídas</div>
          </div>
          {events.some(e => e.late && !e.done) && <Pill color="#fff" bg="rgba(255,255,255,0.14)" size={10}>1 atrasada</Pill>}
        </Card>
      </div>

      <div style={{flex:1, overflow:'auto', padding:'14px 20px 24px'}} className="phone-scroll">
        <div style={{position:'relative', paddingLeft: 64}}>
          <div style={{position:'absolute', left: 56, top: 8, bottom: 8, width: 2, background: MP.hairline}}/>
          {events.map((e,i)=>(
            <div key={i} style={{position:'relative', marginBottom: 12}}>
              <div style={{position:'absolute', left: -64, top: 14, width: 50, textAlign:'right',
                fontSize: 13, fontWeight: 800, color: e.done ? MP.inkMute : MP.ink}}>{e.time}</div>
              <div style={{
                position:'absolute', left: -14, top: 14, width: 14, height: 14, borderRadius:'50%',
                background: e.done ? MP.mint : (e.late ? MP.coral : MP.surface),
                border: e.done ? `3px solid ${MP.mint}` : `3px solid ${e.late ? MP.coral : MP.lilac}`,
                boxShadow: '0 0 0 3px '+MP.bg,
                transition:'background 0.2s, border 0.2s',
              }}/>
              <Card pad={14} style={{opacity: e.done ? 0.65 : 1, transition:'opacity 0.2s'}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:40, height:40, borderRadius:12, background: e.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                    <Icon d={e.icon} size={20} color={e.color}/>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{display:'flex', alignItems:'center', gap:6, flexWrap:'wrap'}}>
                      <span style={{fontWeight: 800, fontSize: 14, color: MP.ink,
                        textDecoration: e.done ? 'line-through' : 'none'}}>{e.title}</span>
                      {e.late && !e.done && <Pill color={MP.coral} bg={MP.coralSoft} size={10}>atrasado</Pill>}
                    </div>
                    <div style={{fontSize: 12, color: MP.inkSoft, marginTop: 2}}>{e.sub}</div>
                  </div>
                  <div onClick={() => {
                    setState({ events: state.events.map((x, idx) => idx === i ? { ...x, done: !x.done, late: x.done ? x.late : false } : x) });
                  }} style={{
                    width: 32, height: 32, borderRadius:'50%', flexShrink: 0,
                    background: e.done ? MP.mint : 'transparent',
                    border: e.done ? 'none' : `2px solid ${e.late ? MP.coral : MP.hairline}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer', transition:'all 0.18s',
                  }}>
                    {e.done && <Icon d={I.check} size={16} color="#fff" stroke={3}/>}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <PrBottomNav active="today"/>
    </div>
  );
}

// ── Pet Profile ────────────────────────────────────────────────
function PrPet() {
  const { nav, back } = useNav();
  const rows = [
    { label:'Histórico de saúde',    icon: I.heart,    bg: MP.coralSoft,   fg: MP.coral,   meta:'12 registros',     to:'pet' },
    { label:'Medicamentos ativos',   icon: I.pill,     bg: MP.primarySoft, fg: MP.primary, meta:'5 ativos', dot:true, to:'meds' },
    { label:'Consultas',             icon: I.cal,      bg: MP.skySoft,     fg: MP.sky,     meta:'Próxima · 22 mai', to:'today' },
    { label:'Documentos',            icon: I.folder,   bg: MP.amberSoft,   fg: MP.amber,   meta:'8 arquivos',       to:'pet' },
    { label:'Vacinas',               icon: I.shield,   bg: MP.mintSoft,    fg: MP.mint,    meta:'Em dia',           to:'pet' },
    { label:'Diário & comportamento',icon: I.notebook, bg: '#F1E9FF',      fg: '#8C5BFF',  meta:'3 notas esta semana', to:'pet' },
  ];
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg, position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute', top: 0, left:0, right:0, height: 240,
        background: `radial-gradient(120% 80% at 50% 0%, ${MP.primarySoft} 0%, ${MP.bg} 70%)`}}/>

      <div style={{padding:'8px 20px 6px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative'}}>
        <div onClick={back} style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
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

      <div style={{flex:1, overflow:'auto', padding: '8px 20px 24px', position:'relative'}} className="phone-scroll">
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', marginTop: 12}}>
          <DogPortrait size={140}/>
          <div style={{marginTop: 16, fontSize: 30, fontWeight: 800, letterSpacing:-0.7, color: MP.ink}}>Leia</div>
          <div style={{fontSize: 14, color: MP.inkSoft, marginTop: 2}}>SRD · fêmea · castrada</div>
          <div style={{display:'flex', gap: 8, marginTop: 16}}>
            {[{l:'8 anos', s:'idade'},{l:'12.3 kg', s:'peso'},{l:'SRD', s:'raça'}].map((c,i)=>(
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

        <Card pad={0} style={{marginTop: 22, overflow:'hidden'}}>
          {rows.map((r,i)=>(
            <div key={i} onClick={() => nav(r.to)} style={{
              display:'flex', alignItems:'center', gap:14, padding: '14px 16px',
              borderBottom: i < rows.length - 1 ? `1px solid ${MP.hairline}` : 'none',
              cursor:'pointer', transition:'background 0.12s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = MP.surfaceTint}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
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
      <PrBottomNav active="pet"/>
    </div>
  );
}

// ── Finance ────────────────────────────────────────────────────
function PrFinance() {
  const { nav, back } = useNav();
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
  const r = 56, c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column', background: MP.bg}}>
      <div style={{padding:'8px 20px 0', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize: 28, fontWeight: 800, letterSpacing:-0.6, color: MP.ink}}>Finanças</div>
          <div style={{marginTop: 4, display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 12px', borderRadius: 99, background: MP.surface, border:`1px solid ${MP.hairline}`,
            fontSize: 12, color: MP.ink, fontWeight: 700, cursor:'pointer'}}>
            Maio 2026 <Icon d={I.chevD} size={12} color={MP.inkSoft} stroke={2.4}/>
          </div>
        </div>
        <div onClick={back} style={{width:40, height:40, borderRadius:14, background: MP.surface, border:`1px solid ${MP.hairline}`, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>
          <Icon d={I.search} size={18} color={MP.ink}/>
        </div>
      </div>

      <div style={{flex:1, overflow:'auto', padding: '16px 20px 24px'}} className="phone-scroll">
        <Card pad={20} style={{
          background: `linear-gradient(135deg, ${MP.primary} 0%, ${MP.primaryDeep} 100%)`,
          border:'none', color: '#fff', position:'relative', overflow:'hidden',
        }}>
          <div style={{position:'absolute', right: -16, bottom: -20, opacity: 0.10}}>
            <Icon d={I.paw} size={140} color="#fff"/>
          </div>
          <div>
            <div style={{fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 700, letterSpacing: 0.4, textTransform:'uppercase'}}>Total no mês</div>
            <div style={{fontSize: 38, fontWeight: 800, marginTop: 6, letterSpacing: -1.2}}>
              <span style={{fontSize: 18, opacity: 0.7, marginRight: 4, fontWeight: 700}}>R$</span>1.247<span style={{fontSize: 24}}>,80</span>
            </div>
            <div style={{fontSize: 13, color:'rgba(255,255,255,0.78)', marginTop: 6}}>este mês com a <strong>Leia</strong></div>
          </div>
          <div style={{marginTop: 14, display:'flex', alignItems:'center', gap: 8,
            padding:'8px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.15)', width:'fit-content'}}>
            <div style={{width:6, height:6, borderRadius:'50%', background: '#7CE3B5'}}/>
            <span style={{fontSize: 12, fontWeight: 700}}>12% menos que abril</span>
          </div>
        </Card>

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
                    transform="rotate(-90 65 65)"/>
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

        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 22}}>
          <div style={{fontWeight: 800, fontSize: 16, color: MP.ink}}>Gastos recentes</div>
          <span style={{fontSize: 12, color: MP.primary, fontWeight: 700, cursor:'pointer'}}>Ver tudo</span>
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
      <PrBottomNav active="finance"/>
    </div>
  );
}

// ── Lock screen ────────────────────────────────────────────────
function PrLock() {
  const { nav } = useNav();
  const [time, setTime] = useState('15:00');
  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 5));
    }, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      height:'100%', position:'relative', overflow:'hidden',
      background: `linear-gradient(160deg, #2A1F4A 0%, #4A3580 35%, #6B5BFF 100%)`,
    }}>
      <div style={{position:'absolute', top:-60, left:-50, width: 240, height: 240, borderRadius:'50%',
        background: 'radial-gradient(circle, rgba(255,175,200,0.55), transparent 70%)', filter:'blur(20px)'}}/>
      <div style={{position:'absolute', bottom:80, right:-40, width: 260, height: 260, borderRadius:'50%',
        background: 'radial-gradient(circle, rgba(124,107,255,0.55), transparent 70%)', filter:'blur(30px)'}}/>
      <div style={{position:'absolute', top:280, right:-80, width: 200, height: 200, borderRadius:'50%',
        background: 'radial-gradient(circle, rgba(244,196,74,0.30), transparent 70%)', filter:'blur(30px)'}}/>

      <div style={{position:'absolute', top: 56, left: '50%', transform:'translateX(-50%)', color:'rgba(255,255,255,0.6)'}}>
        <svg width="14" height="18" viewBox="0 0 14 18">
          <path d="M3 8V5a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.6" fill="none"/>
          <rect x="1" y="8" width="12" height="9" rx="2" fill="currentColor"/>
        </svg>
      </div>

      <div style={{textAlign:'center', color:'#fff', paddingTop: 92}}>
        <div style={{fontSize: 16, fontWeight: 600, opacity: 0.85, letterSpacing: 0.5}}>segunda-feira, 14 de maio</div>
        <div style={{fontSize: 90, fontWeight: 200, lineHeight: 1, marginTop: 4, letterSpacing: -3}}>{time}</div>
      </div>

      <div style={{padding: '38px 14px 0'}}>
        <div onClick={() => nav('home')} style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.6)',
          borderRadius: 22, padding: '12px 14px 8px',
          boxShadow: '0 10px 40px rgba(20,10,40,0.25)',
          color: MP.ink, cursor:'pointer',
        }}>
          <div style={{display:'flex', alignItems:'center', gap: 8, marginBottom: 6}}>
            <div style={{
              width:22, height:22, borderRadius: 6, background: MP.primary,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <Icon d={I.paw} size={14} color="#fff" stroke={2.2}/>
            </div>
            <span style={{fontSize: 12, fontWeight: 700, color: MP.inkSoft, letterSpacing: 0.3, textTransform:'uppercase'}}>MinhasPatas</span>
            <span style={{flex:1}}/>
            <span style={{fontSize: 12, color: MP.inkSoft, fontWeight: 600}}>agora</span>
          </div>
          <div style={{fontSize: 15, fontWeight: 800, color: MP.ink, letterSpacing: -0.2}}>💊 Hora do remédio da Leia!</div>
          <div style={{fontSize: 13, color: MP.inkSoft, marginTop: 4, lineHeight: 1.45}}>
            Prednisolona 10mg — Dar com comida.<br/>Deslize para confirmar.
          </div>
          <div style={{display:'flex', gap:8, marginTop: 12, paddingTop: 10, borderTop:`1px solid ${MP.hairline}`}}>
            <button onClick={(e) => { e.stopPropagation(); nav('home'); }} style={{
              flex: 1, height: 38, borderRadius: 12, border:'none',
              background: MP.primary, color:'#fff', fontFamily: FONT, fontWeight: 800, fontSize: 13,
              display:'flex', alignItems:'center', justifyContent:'center', gap:6, cursor:'pointer',
            }}>
              <Icon d={I.check} size={14} color="#fff" stroke={3}/> Confirmar
            </button>
            <button onClick={(e) => e.stopPropagation()} style={{
              flex: 1, height: 38, borderRadius: 12,
              background: 'rgba(31,27,46,0.06)', color: MP.ink,
              border: 'none', fontFamily: FONT, fontWeight: 800, fontSize: 13, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:6,
            }}>
              ⏰ Adiar 15min
            </button>
          </div>
        </div>

        <div style={{marginTop: 8, padding:'10px 14px', borderRadius: 18,
          background: 'rgba(255,255,255,0.20)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', color:'#fff'}}>
          <div style={{display:'flex', alignItems:'center', gap: 8}}>
            <div style={{width:18, height:18, borderRadius: 5, background:'rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Icon d={I.cal} size={12} color="#fff" stroke={2}/>
            </div>
            <span style={{fontSize: 11, fontWeight:700, letterSpacing:0.3, textTransform:'uppercase', opacity: 0.85}}>Lembrete</span>
            <span style={{flex:1}}/>
            <span style={{fontSize: 11, opacity: 0.75}}>14:00</span>
          </div>
          <div style={{fontSize: 13, fontWeight: 700, marginTop: 4}}>Passeio da Leia em 1h</div>
        </div>
      </div>

      {/* Tap to unlock hint */}
      <div onClick={() => nav('onboarding')} style={{
        position:'absolute', bottom: 100, left: 0, right: 0, textAlign:'center',
        color:'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, cursor:'pointer',
      }}>
        Deslize para cima para abrir
      </div>
    </div>
  );
}

window.PrAIReader = PrAIReader;
window.PrToday = PrToday;
window.PrPet = PrPet;
window.PrFinance = PrFinance;
window.PrLock = PrLock;
