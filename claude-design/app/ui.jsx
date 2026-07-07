/* my-wallet prototype — shared UI, charts, Login, Add sheet */
const { useState, useEffect, useRef } = React;

// ---------- Icon ----------
function Icon({ n, s }) {
  return <svg className="ico" style={s ? { width: s, height: s } : undefined}><use href={`#i-${n}`} /></svg>;
}

// ---------- Amount ----------
function Amount({ v, currency = 'PLN', size, weight = 600, showCur = true, sign, tone }) {
  const cls = tone === 'neutral' ? '' : v > 0 ? 'amount--income' : v < 0 ? 'amount--expense' : '';
  return (
    <span className={`amount ${cls}`} style={{ fontSize: size, fontWeight: weight, whiteSpace: 'nowrap' }}>
      {fmt(v, { sign })}
      {showCur && <span style={{ color: 'var(--text-subtle)', fontWeight: 500, marginLeft: 4, fontSize: '0.7em' }}>{currency}</span>}
    </span>
  );
}

// ---------- Category tile ----------
function CatTile({ cat, size }) {
  const meta = CATS[cat] || { cls: '', icon: 'tag' };
  return (
    <span className={`cat cat--${meta.cls}${size ? ' cat--' + size : ''}`}>
      <Icon n={meta.icon} />
    </span>
  );
}

// ---------- Transaction row ----------
function TxRow({ t, S, onClick }) {
  return (
    <div className="row" onClick={onClick}>
      <CatTile cat={t.cat} />
      <div className="row__body">
        <div className="row__title">{t.title}{t.rec && <span className="badge badge--accent" style={{ marginLeft: 8, verticalAlign: 'middle' }}><Icon n="repeat" s={11} /></span>}</div>
        <div className="row__meta">{S.cats[t.cat] || t.cat} · {t.time}</div>
      </div>
      <Amount v={t.amount} showCur={false} size="var(--text-md)" sign />
    </div>
  );
}

// ---------- Donut chart ----------
function Donut({ data, size = 168, stroke = 22 }) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const total = data.reduce((a, d) => a + d.val, 0) || 1;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
      {data.map((d, i) => {
        const len = (d.val / total) * C;
        const off = -acc;
        acc += len;
        const cls = (CATS[d.cat] || {}).cls || '';
        return (
          <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={`var(--c-cat-${cls})`} strokeWidth={stroke}
            strokeDasharray={`${Math.max(len - 3, 0)} ${C - Math.max(len - 3, 0)}`}
            strokeDashoffset={off} strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

// ---------- Flow bar chart ----------
function FlowChart({ data }) {
  const max = Math.max(...data.flatMap(d => [d.inc, d.exp]));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-3)', height: 150, padding: '0 2px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 120, width: '100%', justifyContent: 'center' }}>
            <div style={{ width: '38%', height: `${(d.inc / max) * 100}%`, background: 'var(--income)', borderRadius: '4px 4px 0 0', opacity: 0.92 }} title="income" />
            <div style={{ width: '38%', height: `${(d.exp / max) * 100}%`, background: 'var(--expense)', borderRadius: '4px 4px 0 0', opacity: 0.92 }} title="expense" />
          </div>
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>{d.m}</span>
        </div>
      ))}
    </div>
  );
}

// =====================================================================
// LOGIN SCREEN
// =====================================================================
function Login({ S, onLogin, dark, toggleTheme, lang, setLang }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '54px 24px 40px',
      background: 'radial-gradient(120% 60% at 50% -5%, var(--bg-grad-top), transparent 60%), var(--bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <span className="logo"><span className="logo__mark" /> my-wallet</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="chip" onClick={() => setLang(lang === 'en' ? 'pl' : 'en')} aria-pressed="false">{lang.toUpperCase()}</button>
          <button className="btn btn--secondary btn--icon btn--sm" onClick={toggleTheme}><Icon n={dark ? 'sun' : 'moon'} /></button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--space-6)', maxWidth: 360, width: '100%', margin: '0 auto' }}>
        <div>
          <h1 className="display" style={{ fontSize: 'var(--text-3xl)', margin: '0 0 8px' }}>{S.welcome}</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>{S.signSub}</p>
        </div>

        <form className="stack" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }} onSubmit={e => { e.preventDefault(); onLogin(); }}>
          <div className="field">
            <label className="label">{S.email}</label>
            <div className="input-group"><span className="input-prefix"><Icon n="mail" /></span>
              <input className="input" type="email" defaultValue="anna@home.pl" /></div>
          </div>
          <div className="field">
            <label className="label">{S.password}</label>
            <div className="input-group"><span className="input-prefix"><Icon n="lock" /></span>
              <input className="input" type={show ? 'text' : 'password'} defaultValue="household" style={{ paddingRight: 48 }} />
              <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 14, background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', display: 'flex' }}><Icon n={show ? 'eyeOff' : 'eye'} /></button>
            </div>
          </div>
          <div style={{ textAlign: 'right', marginTop: -6 }}><a href="#" style={{ color: 'var(--accent)', fontSize: 'var(--text-sm)', fontWeight: 600, textDecoration: 'none' }}>{S.forgot}</a></div>
          <button className="btn btn--primary btn--lg btn--full" type="submit">{S.signIn}</button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-subtle)', fontSize: 'var(--text-xs)' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} /> or <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>
        <button className="btn btn--secondary btn--lg btn--full"><Icon n="google" /> {S.google}</button>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-sm)', margin: 0 }}>{S.noAccount} <a href="#" style={{ color: 'var(--text)', fontWeight: 700, textDecoration: 'none' }}>{S.signUp}</a></p>
      </div>
    </div>
  );
}

// =====================================================================
// ADD TRANSACTION SHEET
// =====================================================================
function AddSheet({ S, onClose, onSave, currency, initType = 'expense', initVal = '0', initCat = 'food', initNote = '' }) {
  const [type, setType] = useState(initType);
  const [val, setVal] = useState(initVal);
  const [cat, setCat] = useState(initCat);
  const [acc, setAcc] = useState('a1');
  const [note, setNote] = useState(initNote);

  const press = (k) => {
    setVal(v => {
      if (k === 'del') return v.length <= 1 ? '0' : v.slice(0, -1);
      if (k === '.') return v.includes('.') ? v : v + '.';
      if (v === '0' && k !== '.') return k;
      if (v.includes('.') && v.split('.')[1].length >= 2) return v;
      return v + k;
    });
  };
  const cats = type === 'income' ? ['salary', 'savings'] : ['food', 'transport', 'home', 'shopping', 'health', 'fun', 'bills'];
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()} style={{ maxHeight: '94%' }}>
        <div className="sheet__grip" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h2 className="display" style={{ fontSize: 'var(--text-xl)', margin: 0 }}>{S.add}</h2>
          <button className="btn btn--ghost btn--icon btn--sm" onClick={onClose}><Icon n="x" /></button>
        </div>

        <div className={`segment segment--${type}`} style={{ display: 'flex', width: '100%', marginBottom: 'var(--space-5)' }}>
          <button aria-selected={type === 'income'} onClick={() => { setType('income'); setCat('salary'); }}>{S.income}</button>
          <button aria-selected={type === 'expense'} onClick={() => { setType('expense'); setCat('food'); }}>{S.expense}</button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 'var(--space-5)' }}>
          <div className="amount" style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, color: type === 'income' ? 'var(--income-fg)' : 'var(--text)' }}>
            {type === 'income' ? '+' : '−'} {val}<span style={{ fontSize: 'var(--text-lg)', color: 'var(--text-subtle)', marginLeft: 6 }}>{currency}</span>
          </div>
        </div>

        <div className="field" style={{ marginBottom: 'var(--space-4)' }}>
          <label className="label">{S.category}</label>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} className="chip" aria-pressed={cat === c} style={{ flexShrink: 0, height: 40 }}>
                <CatTile cat={c} size="sm" /> {S.cats[c]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div className="field" style={{ flex: 1 }}>
            <label className="label">{S.account}</label>
            <select className="select" value={acc} onChange={e => setAcc(e.target.value)} style={{ height: 46 }}>
              {ACCOUNTS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>
        </div>

        <div className="field" style={{ marginBottom: 'var(--space-5)' }}>
          <label className="label">{S.note}</label>
          <input className="input" style={{ height: 46 }} value={note} onChange={e => setNote(e.target.value)} placeholder="…" />
        </div>

        {/* keypad */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 'var(--space-4)' }}>
          {keys.map(k => (
            <button key={k} onClick={() => press(k)} style={{
              height: 52, border: 'none', borderRadius: 'var(--radius-md)', background: 'var(--surface-2)',
              color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', fontWeight: 600, cursor: 'pointer'
            }}>{k === 'del' ? <Icon n="x" /> : k}</button>
          ))}
        </div>

        <button className="btn btn--primary btn--lg btn--full" onClick={() => onSave({
          type, amount: (type === 'income' ? 1 : -1) * (parseFloat(val) || 0), cat, acc, note,
        })}><Icon n="check" /> {S.save}</button>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Amount, CatTile, TxRow, Donut, FlowChart, Login, AddSheet });
