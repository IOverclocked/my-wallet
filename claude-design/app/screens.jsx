/* my-wallet prototype — main screens */

// ---------- Top bar ----------
function TopBar({ title, S, lang, setLang, dark, toggleTheme, onMenu }) {
  return (
    <div className="topbar" style={{ paddingTop: 54, alignItems: 'center' }}>
      <span className="topbar__title">{title}</span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <button className="chip" style={{ height: 38, width: 44, justifyContent: 'center', padding: 0 }} onClick={() => setLang(lang === 'en' ? 'pl' : 'en')}>{lang.toUpperCase()}</button>
        <button className="btn btn--secondary btn--icon btn--sm" onClick={toggleTheme}><Icon n={dark ? 'sun' : 'moon'} /></button>
        <button className="btn btn--secondary btn--icon btn--sm" onClick={onMenu}><Icon n="settings" /></button>
      </div>
    </div>
  );
}

// =====================================================================
// DASHBOARD
// =====================================================================
function Dashboard({ S, txs, currency, go }) {
  const total = ACCOUNTS.reduce((a, x) => a + x.balance, 0);
  const inc = sum(txs.filter(t => t.amount > 0), t => t.amount);
  const exp = sum(txs.filter(t => t.amount < 0), t => Math.abs(t.amount));
  const recent = txs.slice(0, 4);
  const spend = spendingByCat(txs).slice(0, 4);

  return (
    <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <p style={{ color: 'var(--text-muted)', margin: '0', fontSize: 'var(--text-sm)' }}>{S.goodEve}, <strong style={{ color: 'var(--text)' }}>Anna</strong> 👋</p>

      {/* balance hero */}
      <div className="balance-card">
        <span className="eyebrow">{S.balance}</span>
        <div style={{ margin: '8px 0 14px' }}><Amount v={total} currency={currency} size="var(--text-4xl)" weight={700} showCur sign={false} tone="neutral" /></div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--income-soft)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
            <span className="cat cat--savings cat--sm" style={{ background: 'var(--income-soft)', color: 'var(--income-fg)' }}><Icon n="arrowUp" s={16} /></span>
            <div><div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{S.income}</div><Amount v={inc} showCur={false} size="var(--text-sm)" /></div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--expense-soft)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
            <span className="cat cat--health cat--sm" style={{ background: 'var(--expense-soft)', color: 'var(--expense-fg)' }}><Icon n="arrowDown" s={16} /></span>
            <div><div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{S.expense}</div><Amount v={-exp} showCur={false} size="var(--text-sm)" /></div>
          </div>
        </div>
      </div>

      {/* accounts strip */}
      <div style={{ display: 'flex', gap: 'var(--space-3)', overflowX: 'auto', margin: '0 -20px', padding: '0 20px 4px' }}>
        {ACCOUNTS.map(a => (
          <div key={a.id} onClick={() => go('accounts')} style={{ flexShrink: 0, minWidth: 150, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', cursor: 'pointer' }}>
            <span className={`cat cat--${a.cls} cat--sm`}><Icon n={a.icon} /></span>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 10 }}>{a.name}</div>
            <Amount v={a.balance} showCur={false} size="var(--text-lg)" tone="neutral" />
          </div>
        ))}
      </div>

      {/* mini spending */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>{S.byCategory}</span>
          <button className="btn btn--ghost btn--sm" onClick={() => go('insights')} style={{ padding: '0 8px' }}>{S.seeAll} <Icon n="chevronRight" s={14} /></button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <Donut data={spend} size={120} stroke={18} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {spend.map(d => (
              <div key={d.cat} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: `var(--c-cat-${(CATS[d.cat] || {}).cls})` }} />
                <span style={{ flex: 1, color: 'var(--text-muted)' }}>{S.cats[d.cat]}</span>
                <span className="amount" style={{ fontSize: 'var(--text-xs)' }}>{fmt(d.val)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* recent */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>{S.recent}</span>
          <button className="btn btn--ghost btn--sm" onClick={() => go('activity')} style={{ padding: '0 8px' }}>{S.seeAll} <Icon n="chevronRight" s={14} /></button>
        </div>
        <div className="list">{recent.map(t => <TxRow key={t.id} t={t} S={S} />)}</div>
      </div>
    </div>
  );
}

// =====================================================================
// ACTIVITY (transaction list + filters)
// =====================================================================
function Activity({ S, txs, currency }) {
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const filters = ['all', 'food', 'transport', 'home', 'shopping', 'fun', 'bills'];
  let list = txs.filter(t => (filter === 'all' || t.cat === filter) && (!q || t.title.toLowerCase().includes(q.toLowerCase())));
  // group by day
  const groups = {};
  list.forEach(t => { (groups[t.day] = groups[t.day] || []).push(t); });

  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div className="input-group" style={{ marginBottom: 'var(--space-3)' }}>
        <span className="input-prefix"><Icon n="search" /></span>
        <input className="input" placeholder={S.search} value={q} onChange={e => setQ(e.target.value)} style={{ height: 46 }} />
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -20px', padding: '0 20px 12px' }}>
        {filters.map(f => (
          <button key={f} className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)} style={{ flexShrink: 0 }}>
            {f === 'all' ? S.all : S.cats[f]}
          </button>
        ))}
      </div>
      {Object.entries(groups).map(([day, items]) => (
        <div key={day}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="list-group__label">{day}</div>
            <span className="amount" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-subtle)' }}>{fmt(sum(items, t => t.amount), { sign: true })}</span>
          </div>
          <div className="list">{items.map(t => <TxRow key={t.id} t={t} S={S} />)}</div>
        </div>
      ))}
      {list.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-subtle)', padding: 'var(--space-10)' }}>—</p>}
    </div>
  );
}

// =====================================================================
// INSIGHTS
// =====================================================================
function Insights({ S, txs, currency }) {
  const spend = spendingByCat(txs);
  const totalSpend = spend.reduce((a, d) => a + d.val, 0);
  const inc = sum(txs.filter(t => t.amount > 0), t => t.amount);
  const net = inc - totalSpend;
  return (
    <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
        <div className="card"><span className="eyebrow">{S.netWorth}</span><div style={{ marginTop: 6 }}><Amount v={net} currency={currency} size="var(--text-xl)" showCur /></div></div>
        <div className="card"><span className="eyebrow">{S.expense}</span><div style={{ marginTop: 6 }}><Amount v={-totalSpend} currency={currency} size="var(--text-xl)" showCur={false} /></div></div>
      </div>

      <div className="card">
        <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>{S.trend}</span>
        <div style={{ marginTop: 'var(--space-4)' }}><FlowChart data={FLOW} /></div>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--income)' }} /> {S.income}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: 'var(--expense)' }} /> {S.expense}</span>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)' }}>{S.byCategory}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
          <Donut data={spend} size={150} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {spend.slice(0, 4).map(d => (
              <div key={d.cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: 4 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{S.cats[d.cat]}</span>
                  <span style={{ fontWeight: 600 }}>{Math.round(d.val / totalSpend * 100)}%</span>
                </div>
                <div className="progress" style={{ height: 6 }}><div className="progress__bar" style={{ width: `${d.val / totalSpend * 100}%`, background: `var(--c-cat-${(CATS[d.cat] || {}).cls})` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <span style={{ fontWeight: 700, fontFamily: 'var(--font-display)', display: 'block', marginBottom: 8 }}>{S.topCats}</span>
        <div className="list">
          {spend.slice(0, 5).map(d => (
            <div className="row" key={d.cat}>
              <CatTile cat={d.cat} />
              <div className="row__body"><div className="row__title">{S.cats[d.cat]}</div><div className="row__meta">{Math.round(d.val / totalSpend * 100)}% {S.spent}</div></div>
              <Amount v={-d.val} showCur={false} size="var(--text-md)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// ACCOUNTS
// =====================================================================
function Accounts({ S, currency }) {
  const total = ACCOUNTS.reduce((a, x) => a + x.balance, 0);
  return (
    <div style={{ padding: '0 20px 16px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div className="balance-card">
        <span className="eyebrow">{S.netWorth}</span>
        <div style={{ marginTop: 6 }}><Amount v={total} currency={currency} size="var(--text-3xl)" weight={700} tone="neutral" /></div>
      </div>
      {ACCOUNTS.map(a => (
        <div className="account" key={a.id} style={{ cursor: 'pointer' }}>
          <span className={`cat cat--${a.cls} cat--lg`}><Icon n={a.icon} /></span>
          <div className="row__body">
            <div className="row__title">{a.name}</div>
            <div className="row__meta">{a.sub}</div>
            {a.goal && <div className="progress" style={{ marginTop: 8, height: 6 }}><div className="progress__bar" style={{ width: `${a.balance / a.goal * 100}%` }} /></div>}
          </div>
          <div style={{ textAlign: 'right' }}>
            <Amount v={a.balance} showCur={false} size="var(--text-lg)" tone="neutral" />
            {a.goal && <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-subtle)', marginTop: 2 }}>{S.goal} {a.goal.toLocaleString()}</div>}
          </div>
        </div>
      ))}
      <button className="btn btn--secondary btn--lg btn--full" style={{ borderStyle: 'dashed' }}><Icon n="plus" /> {S.addAccount}</button>
    </div>
  );
}

// =====================================================================
// CATEGORIES
// =====================================================================
function Categories({ S }) {
  const ent = Object.keys(CATS).filter(c => c !== 'salary');
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 0 }}>{S.manageCats}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
        {ent.map(c => (
          <div key={c} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'var(--space-4)' }}>
            <CatTile cat={c} />
            <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{S.cats[c]}</span>
            <Icon n="chevronRight" s={16} />
          </div>
        ))}
        <button className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: '1px dashed var(--border-strong)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }}>
          <Icon n="plus" /> {S.category}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { TopBar, Dashboard, Activity, Insights, Accounts, Categories });
