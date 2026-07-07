/* my-wallet prototype — mock data, i18n, helpers */

// ---------- i18n (EN / PL) ----------
const STR = {
  en: {
    home: 'Home', activity: 'Activity', insights: 'Insights', accounts: 'Accounts',
    goodEve: 'Good evening', balance: 'Total balance', income: 'Income', expense: 'Expense',
    thisMonth: 'This month', recent: 'Recent activity', seeAll: 'See all',
    add: 'Add transaction', amount: 'Amount', category: 'Category', account: 'Account',
    note: 'Description', date: 'Date', save: 'Save', cancel: 'Cancel', recurring: 'Recurring',
    all: 'All', search: 'Search transactions', addAccount: 'Add account', netWorth: 'Net worth',
    byCategory: 'Spending by category', topCats: 'Top categories', trend: 'Monthly flow',
    categories: 'Categories', manageCats: 'Manage categories', spent: 'spent',
    signIn: 'Sign in', email: 'Email', password: 'Password', forgot: 'Forgot password?',
    welcome: 'Welcome back', signSub: 'Track every złoty with calm and clarity.',
    google: 'Continue with Google', noAccount: "Don't have an account?", signUp: 'Sign up',
    settings: 'Settings', logout: 'Log out', goal: 'Goal', spentOf: 'of',
    cats: { food: 'Food & groceries', transport: 'Transport', home: 'Home & rent', shopping: 'Shopping', health: 'Health', fun: 'Entertainment', bills: 'Bills', savings: 'Savings', salary: 'Salary' },
  },
  pl: {
    home: 'Pulpit', activity: 'Historia', insights: 'Analizy', accounts: 'Konta',
    goodEve: 'Dobry wieczór', balance: 'Saldo całkowite', income: 'Przychód', expense: 'Wydatek',
    thisMonth: 'Ten miesiąc', recent: 'Ostatnia aktywność', seeAll: 'Zobacz wszystkie',
    add: 'Dodaj transakcję', amount: 'Kwota', category: 'Kategoria', account: 'Konto',
    note: 'Opis', date: 'Data', save: 'Zapisz', cancel: 'Anuluj', recurring: 'Cykliczna',
    all: 'Wszystkie', search: 'Szukaj transakcji', addAccount: 'Dodaj konto', netWorth: 'Wartość netto',
    byCategory: 'Wydatki wg kategorii', topCats: 'Najwięcej wydatków', trend: 'Przepływ miesięczny',
    categories: 'Kategorie', manageCats: 'Zarządzaj kategoriami', spent: 'wydano',
    signIn: 'Zaloguj się', email: 'E-mail', password: 'Hasło', forgot: 'Nie pamiętasz hasła?',
    welcome: 'Witaj ponownie', signSub: 'Śledź każdy grosz spokojnie i z jasnością.',
    google: 'Kontynuuj z Google', noAccount: 'Nie masz konta?', signUp: 'Zarejestruj się',
    settings: 'Ustawienia', logout: 'Wyloguj', goal: 'Cel', spentOf: 'z',
    cats: { food: 'Jedzenie', transport: 'Transport', home: 'Dom i czynsz', shopping: 'Zakupy', health: 'Zdrowie', fun: 'Rozrywka', bills: 'Rachunki', savings: 'Oszczędności', salary: 'Wypłata' },
  },
};

// ---------- category meta ----------
const CATS = {
  food:      { cls: 'food', icon: 'food' },
  transport: { cls: 'transport', icon: 'car' },
  home:      { cls: 'home', icon: 'house' },
  shopping:  { cls: 'shopping', icon: 'cart' },
  health:    { cls: 'health', icon: 'health' },
  fun:       { cls: 'fun', icon: 'film' },
  bills:     { cls: 'bills', icon: 'receipt' },
  savings:   { cls: 'savings', icon: 'piggy' },
  salary:    { cls: 'savings', icon: 'cash' },
};

// ---------- accounts ----------
const ACCOUNTS = [
  { id: 'a1', name: 'Main checking', sub: 'mBank · ····4821', balance: 9210.50, icon: 'bank', cls: 'transport' },
  { id: 'a2', name: 'Cash wallet',   sub: 'Cash',            balance: 480.00,  icon: 'cash', cls: 'savings' },
  { id: 'a3', name: 'Savings',       sub: 'Goal · 8,000',    balance: 5000.00, icon: 'piggy', cls: 'home', goal: 8000 },
  { id: 'a4', name: 'Credit card',   sub: 'Visa · ····0190', balance: -120.00, icon: 'card', cls: 'health' },
];

// ---------- transactions ----------
const TX = [
  { id: 't1', title: 'Lidl groceries', cat: 'food', acc: 'a1', amount: -129.00, day: 'Today', time: '14:20', note: 'Weekly shop' },
  { id: 't2', title: 'Orlen fuel', cat: 'transport', acc: 'a2', amount: -210.40, day: 'Today', time: '11:05', note: '' },
  { id: 't3', title: 'Spotify', cat: 'fun', acc: 'a4', amount: -23.99, day: 'Today', time: '08:30', note: 'Family plan', rec: true },
  { id: 't4', title: 'Salary', cat: 'salary', acc: 'a1', amount: 8400.00, day: 'Yesterday', time: '09:00', note: 'June', rec: true },
  { id: 't5', title: 'Pharmacy', cat: 'health', acc: 'a1', amount: -56.20, day: 'Yesterday', time: '17:42', note: '' },
  { id: 't6', title: 'Zara', cat: 'shopping', acc: 'a4', amount: -319.00, day: 'Yesterday', time: '16:10', note: 'Summer jacket' },
  { id: 't7', title: 'Rent', cat: 'home', acc: 'a1', amount: -2400.00, day: 'Jun 1', time: '08:00', note: 'Apartment', rec: true },
  { id: 't8', title: 'Tauron electricity', cat: 'bills', acc: 'a1', amount: -184.30, day: 'Jun 1', time: '07:30', note: '' },
  { id: 't9', title: 'Biedronka', cat: 'food', acc: 'a2', amount: -87.65, day: 'Jun 1', time: '19:20', note: '' },
  { id: 't10', title: 'Freelance invoice', cat: 'salary', acc: 'a1', amount: 1200.00, day: 'May 30', time: '13:00', note: 'Logo design' },
  { id: 't11', title: 'Cinema City', cat: 'fun', acc: 'a4', amount: -68.00, day: 'May 30', time: '20:15', note: 'Two tickets' },
  { id: 't12', title: 'Uber', cat: 'transport', acc: 'a4', amount: -34.50, day: 'May 30', time: '22:40', note: '' },
  { id: 't13', title: 'To savings', cat: 'savings', acc: 'a3', amount: 600.00, day: 'May 30', time: '10:00', note: 'Monthly', rec: true },
];

// monthly flow (income / expense) for the bar chart
const FLOW = [
  { m: 'Jan', inc: 9100, exp: 6800 },
  { m: 'Feb', inc: 9200, exp: 7400 },
  { m: 'Mar', inc: 10300, exp: 6900 },
  { m: 'Apr', inc: 9600, exp: 8100 },
  { m: 'May', inc: 11200, exp: 7200 },
  { m: 'Jun', inc: 9600, exp: 5320 },
];

// ---------- helpers ----------
function fmt(n, opts = {}) {
  const abs = Math.abs(n);
  const s = abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const sign = opts.sign ? (n > 0 ? '+ ' : n < 0 ? '− ' : '') : (n < 0 ? '− ' : '');
  return sign + s;
}
function sum(arr, f) { return arr.reduce((a, x) => a + f(x), 0); }

// spending grouped by category (expenses only, this month)
function spendingByCat(txs) {
  const map = {};
  txs.filter(t => t.amount < 0).forEach(t => { map[t.cat] = (map[t.cat] || 0) + Math.abs(t.amount); });
  return Object.entries(map).map(([cat, val]) => ({ cat, val })).sort((a, b) => b.val - a.val);
}

Object.assign(window, { STR, CATS, ACCOUNTS, TX, FLOW, fmt, sum, spendingByCat });
