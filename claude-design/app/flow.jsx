/* my-wallet — User Flow storyboard (reuses real app components) */
const S = STR.pl;

// --- status bar (device realism) ---
function StatusBar() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', zIndex: 50, pointerEvents: 'none' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>9:41</span>
      <span style={{ display: 'flex', gap: 7, alignItems: 'center', color: 'var(--text)' }}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="6" width="3" height="5" rx="1"/><rect x="4.5" y="4" width="3" height="7" rx="1"/><rect x="9" y="2" width="3" height="9" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg>
        <svg width="22" height="11" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1"><rect x="1" y="1" width="19" height="10" rx="2.5"/><rect x="2.5" y="2.5" width="13" height="7" rx="1" fill="currentColor"/><rect x="21" y="4" width="2" height="4" rx="1" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

// --- static bottom nav ---
function Tabbar({ active }) {
  const tabs = [
    { id: 'home', icon: 'home', label: S.home },
    { id: 'activity', icon: 'list', label: S.activity },
    { id: 'fab' },
    { id: 'insights', icon: 'pie', label: S.insights },
    { id: 'accounts', icon: 'wallet', label: S.accounts },
  ];
  return (
    <div className="tabbar" style={{ flexShrink: 0 }}>
      {tabs.map(t => t.id === 'fab' ? (
        <div key="fab" className="tab tabbar__fab"><span className="fab"><Icon n="plus" /></span></div>
      ) : (
        <div key={t.id} className="tab" {...(active === t.id ? { 'aria-current': 'page' } : {})}><Icon n={t.icon} /> {t.label}</div>
      ))}
    </div>
  );
}

// --- screen shell (topbar + content + tabbar) ---
function Shell({ title, active, children, highlightFab }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'radial-gradient(90% 40% at 50% 0%, var(--bg-grad-top), transparent 55%), var(--bg)', color: 'var(--text)' }}>
      <TopBar title={title} S={S} lang="pl" setLang={() => {}} dark={true} toggleTheme={() => {}} onMenu={() => {}} />
      <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
      <div style={{ position: 'relative' }}>
        {highlightFab && <div style={{ position: 'absolute', left: '50%', bottom: 14, width: 84, height: 84, transform: 'translateX(-50%)', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)', pointerEvents: 'none' }} />}
        <Tabbar active={active} />
      </div>
    </div>
  );
}

// --- device frame (scaled) ---
function Frame({ children, scale = 0.62 }) {
  const W = 390, H = 844;
  return (
    <div style={{ width: W * scale, height: H * scale, borderRadius: 38 * scale, padding: 4 * scale, background: 'linear-gradient(160deg, var(--surface-3), var(--surface))', boxShadow: 'var(--shadow-lg)', flexShrink: 0 }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 34 * scale, overflow: 'hidden', position: 'relative', background: 'var(--bg)' }}>
        <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'relative', overflow: 'hidden' }}>
          <StatusBar />
          {children}
        </div>
      </div>
    </div>
  );
}

// --- a flow step (frame + caption) ---
function Step({ n, label, caption, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, flexShrink: 0 }}>
      <Frame>{children}</Frame>
      <div style={{ textAlign: 'center', maxWidth: 242 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--accent)', fontWeight: 600 }}>{n}</span>
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)' }}>{label}</strong>
        </div>
        <p style={{ margin: '4px 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.4 }}>{caption}</p>
      </div>
    </div>
  );
}

// --- connector arrow with action label ---
function Arrow({ action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, alignSelf: 'center', marginBottom: 56, flexShrink: 0, minWidth: 96 }}>
      <span className="badge badge--accent" style={{ height: 26 }}><Icon n="arrowRight" s={13} /> {action}</span>
      <svg width="100%" height="12" viewBox="0 0 100 12" preserveAspectRatio="none" style={{ maxWidth: 96 }}>
        <line x1="0" y1="6" x2="92" y2="6" stroke="var(--accent-line)" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
        <path d="M88 1 L96 6 L88 11" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// --- a full act (title + scrollable row of steps/arrows) ---
function Act({ num, title, desc, children }) {
  return (
    <section style={{ marginTop: 'var(--space-12)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600 }}>{num}</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', margin: 0, letterSpacing: 'var(--tracking-tight)' }}>{title}</h2>
      </div>
      <p style={{ color: 'var(--text-muted)', margin: '0 0 var(--space-6)', maxWidth: '60ch' }}>{desc}</p>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 8, overflowX: 'auto', paddingBottom: 'var(--space-4)', margin: '0 -24px', padding: '0 24px var(--space-4)' }}>
        {children}
      </div>
    </section>
  );
}

// =====================================================================
function Flow() {
  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 80px' }}>
      {/* hero */}
      <div style={{ padding: '56px 0 8px' }}>
        <span className="eyebrow">Design System · User Flow</span>
        <h1 className="display" style={{ fontSize: 'clamp(2.2rem,6vw,3rem)', margin: '14px 0 12px', lineHeight: 1.05 }}>
          How people <span style={{ background: 'linear-gradient(120deg, var(--c-gold-300), var(--c-gold-600))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>work</span> with my-wallet.
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', maxWidth: '64ch', lineHeight: 1.6, margin: 0 }}>
          Każdy ekran zbudowany z tego samego systemu i komponentów. Trzy akty pokazują pełną ścieżkę: od logowania, przez dodanie transakcji, po analizę domowych finansów.
        </p>
      </div>

      <Act num="Akt 01" title="Wejście do aplikacji" desc="Użytkownik loguje się e-mailem lub kontem Google i od razu trafia na pulpit z saldem, kontami i ostatnią aktywnością.">
        <Step n="01" label="Logowanie" caption="E-mail i hasło lub logowanie przez Google.">
          <Login S={S} onLogin={() => {}} dark={true} toggleTheme={() => {}} lang="pl" setLang={() => {}} />
        </Step>
        <Arrow action="Zaloguj" />
        <Step n="02" label="Pulpit" caption="Saldo całkowite, konta i podgląd wydatków wg kategorii.">
          <Shell title="my-wallet" active="home"><Dashboard S={S} txs={TX} currency="PLN" go={() => {}} /></Shell>
        </Step>
      </Act>

      <Act num="Akt 02" title="Dodawanie wydatku / przychodu" desc="Z dowolnego ekranu przycisk + otwiera panel dodawania. Użytkownik wybiera typ, wpisuje kwotę na klawiaturze, przypisuje kategorię, konto i opis — transakcja pojawia się w historii.">
        <Step n="03" label="Stuknij +" caption="Centralny przycisk akcji w nawigacji otwiera panel.">
          <Shell title="my-wallet" active="home" highlightFab><Dashboard S={S} txs={TX} currency="PLN" go={() => {}} /></Shell>
        </Step>
        <Arrow action="Otwórz panel" />
        <Step n="04" label="Nowa transakcja" caption="Typ, kwota, kategoria, konto i opis — wszystko w jednym arkuszu.">
          <Shell title="my-wallet" active="home"><Dashboard S={S} txs={TX} currency="PLN" go={() => {}} /></Shell>
          <AddSheet S={S} currency="PLN" onClose={() => {}} onSave={() => {}} initType="expense" initVal="55.90" initCat="food" initNote="Lidl — zakupy" />
        </Step>
        <Arrow action="Zapisz" />
        <Step n="05" label="Historia" caption="Zapisana transakcja od razu widoczna na liście, z filtrami i wyszukiwaniem.">
          <Shell title={S.activity} active="activity"><Activity S={S} txs={TX} currency="PLN" /></Shell>
        </Step>
      </Act>

      <Act num="Akt 03" title="Kontrola i analiza" desc="Sekcja analiz pokazuje przepływ miesięczny i podział wydatków. Konta śledzą stany i cele oszczędnościowe, a kategorie można dowolnie zarządzać.">
        <Step n="06" label="Analizy" caption="Wartość netto, przepływ miesięczny i wykres kołowy wg kategorii.">
          <Shell title={S.insights} active="insights"><Insights S={S} txs={TX} currency="PLN" /></Shell>
        </Step>
        <Arrow action="Przeglądaj" />
        <Step n="07" label="Konta" caption="Stany wszystkich kont, karty kredytowe i postęp celów.">
          <Shell title={S.accounts} active="accounts"><Accounts S={S} currency="PLN" /></Shell>
        </Step>
        <Arrow action="Zarządzaj" />
        <Step n="08" label="Kategorie" caption="Dodawanie i edycja kategorii wydatków oraz przychodów.">
          <Shell title={S.categories} active="home"><Categories S={S} /></Shell>
        </Step>
      </Act>

      {/* footer cta */}
      <div style={{ marginTop: 'var(--space-16)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 4px', fontSize: 'var(--text-xl)' }}>Wypróbuj na żywo</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Te same ekrany, w pełni klikalne — kliknij się przez cały przepływ.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <a className="btn btn--secondary btn--lg" href="Design System.html"><Icon n="list" /> Design System</a>
          <a className="btn btn--primary btn--lg" href="App Prototype.html"><Icon n="wallet" /> Otwórz prototyp</a>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Flow />);
