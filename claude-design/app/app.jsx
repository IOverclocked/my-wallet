/* my-wallet prototype — app shell */
const { useState: useS, useEffect: useE } = React;

function App() {
  const [authed, setAuthed] = useS(false);
  const [screen, setScreen] = useS('home');
  const [adding, setAdding] = useS(false);
  const [menu, setMenu] = useS(false);
  const [lang, setLang] = useS('en');
  const [dark, setDark] = useS(true);
  const [txs, setTxs] = useS(TX);

  useE(() => { document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light'); }, [dark]);
  const S = STR[lang];
  const currency = 'PLN';
  const toggleTheme = () => setDark(d => !d);

  const titles = { home: 'my-wallet', activity: S.activity, insights: S.insights, accounts: S.accounts, categories: S.categories };

  const addTx = (d) => {
    const acc = ACCOUNTS.find(a => a.id === d.acc);
    setTxs([{ id: 't' + Date.now(), title: d.note || (S.cats[d.cat]), cat: d.cat, acc: d.acc, amount: d.amount, day: 'Today', time: 'now', note: d.note }, ...txs]);
    setAdding(false);
    setScreen('activity');
  };

  const tabs = [
    { id: 'home', icon: 'home', label: S.home },
    { id: 'activity', icon: 'list', label: S.activity },
    { id: 'fab' },
    { id: 'insights', icon: 'pie', label: S.insights },
    { id: 'accounts', icon: 'wallet', label: S.accounts },
  ];

  const content = (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'radial-gradient(90% 40% at 50% 0%, var(--bg-grad-top), transparent 55%), var(--bg)', color: 'var(--text)' }}>
      {!authed ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Login S={S} onLogin={() => setAuthed(true)} dark={dark} toggleTheme={toggleTheme} lang={lang} setLang={setLang} />
        </div>
      ) : (
        <React.Fragment>
          <div style={{ flexShrink: 0 }}>
            <TopBar title={titles[screen]} S={S} lang={lang} setLang={setLang} dark={dark} toggleTheme={toggleTheme} onMenu={() => setMenu(true)} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }} key={screen}>
            {screen === 'home' && <Dashboard S={S} txs={txs} currency={currency} go={setScreen} />}
            {screen === 'activity' && <Activity S={S} txs={txs} currency={currency} />}
            {screen === 'insights' && <Insights S={S} txs={txs} currency={currency} />}
            {screen === 'accounts' && <Accounts S={S} currency={currency} />}
            {screen === 'categories' && <Categories S={S} />}
          </div>
          {/* bottom nav */}
          <div className="tabbar" style={{ flexShrink: 0 }}>
            {tabs.map(t => t.id === 'fab' ? (
              <button key="fab" className="tab tabbar__fab" onClick={() => setAdding(true)} aria-label={S.add}>
                <span className="fab"><Icon n="plus" /></span>
              </button>
            ) : (
              <button key={t.id} className="tab" aria-current={screen === t.id ? 'page' : undefined} onClick={() => setScreen(t.id)}>
                <Icon n={t.icon} /> {t.label}
              </button>
            ))}
          </div>
        </React.Fragment>
      )}

      {adding && <AddSheet S={S} currency={currency} onClose={() => setAdding(false)} onSave={addTx} />}

      {menu && (
        <div className="overlay" onClick={() => setMenu(false)}>
          <div className="sheet" onClick={e => e.stopPropagation()}>
            <div className="sheet__grip" />
            <h2 className="display" style={{ fontSize: 'var(--text-xl)', margin: '0 0 var(--space-4)' }}>{S.settings}</h2>
            <div className="list">
              <div className="row" onClick={() => { setScreen('categories'); setMenu(false); }}>
                <span className="cat cat--shopping"><Icon n="tag" /></span>
                <div className="row__body"><div className="row__title">{S.categories}</div><div className="row__meta">{S.manageCats}</div></div>
                <Icon n="chevronRight" s={16} />
              </div>
              <div className="row" onClick={toggleTheme}>
                <span className="cat cat--bills"><Icon n={dark ? 'sun' : 'moon'} /></span>
                <div className="row__body"><div className="row__title">{dark ? 'Light theme' : 'Dark theme'}</div></div>
                <label className="switch"><input type="checkbox" checked={!dark} readOnly /><span className="track" /><span className="thumb" /></label>
              </div>
              <div className="row" onClick={() => { setAuthed(false); setMenu(false); setScreen('home'); }}>
                <span className="cat cat--health"><Icon n="logout" /></span>
                <div className="row__body"><div className="row__title" style={{ color: 'var(--expense-fg)' }}>{S.logout}</div></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return <IOSDevice dark={dark}>{content}</IOSDevice>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
