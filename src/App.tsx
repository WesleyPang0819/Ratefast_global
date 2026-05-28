import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Coins, 
  ArrowUpDown, 
  Search, 
  X, 
  ChevronDown, 
  RefreshCw, 
  AlertCircle, 
  Check, 
  Info,
  TrendingUp,
  Globe,
  Settings,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SUPPORTED_CURRENCIES, POPULAR_CURRENCIES, Currency } from './currencies';
import { CURRENCY_NAMES_ZH } from './translations_zh';

const TRANSLATIONS = {
  zh: {
    title: "实时汇率转换",
    tagline: "快速全球货币兑换",
    youSend: "您发送",
    recipientGets: "收款人收到",
    exchangeRate: "当前汇率",
    fee: "手续费 (0%)",
    noFee: "免交易手续费",
    fetching: "正在获取最新汇率...",
    marketStatus: "市场服务正常。汇率更新于 {time} UTC。",
    lastUpdated: "最近更新",
    refreshTitle: "强制刷新数据",
    tryAgain: "尝试重新连接",
    errTitle: "汇率连接出错",
    errDetail: "未获得最新汇率数据。请稍后再试。",
    searchHeader: "选择货币",
    searchSub: "选择支持的全球货币",
    searchPlaceholder: "输入国家、代码或名称搜索...",
    noResults: "未找到匹配的货币",
    noResultsDetail: "没有搜索到与 \"{query}\" 相关的货币，请尝试缩写代码或国家名称。",
    showingCount: "支持共计 {count} 种全球主要货币",
    alreadySelected: "已设为相同货币",
    placeholder: "0.00",
    clear: "清除",
    liveRates: "实时汇率",
    serviceOffline: "服务离线",
    quickConvert: "快速转换",
    lastSyncLabel: "最后同步",
    settingsTitle: "默认货币设置",
    settingsSub: "选择 1 至 3 个常用货币，它们会显示在首页顶部。",
    addCurrency: "添加货币",
    maxCurrenciesAlert: "最多只能选择 3 个默认货币",
    alreadyAdded: "该货币已在默认列表中",
    settingsClose: "完成",
    selectDefaultCurrencies: "添加默认货币"
  },
  en: {
    title: "Real-time Currency Converter",
    tagline: "Fast global currency exchange",
    youSend: "You send",
    recipientGets: "Recipient gets",
    exchangeRate: "Exchange Rate",
    fee: "Fee (0%)",
    noFee: "No Transaction Fees",
    fetching: "Fetching rates...",
    marketStatus: "Market hours active. Rates last updated {time} UTC.",
    lastUpdated: "Last updated",
    refreshTitle: "Force refresh data",
    tryAgain: "Try Reconnecting Now",
    errTitle: "Exchange Rate Connection Error",
    errDetail: "Failed to fetch exchange rates. The service might be temporarily unavailable.",
    searchHeader: "Select Currency",
    searchSub: "Choose from supported global currencies",
    searchPlaceholder: "Search by country, code, or name...",
    noResults: "No currencies matched",
    noResultsDetail: "We couldn't find matches for \"{query}\". Try searching by code or name.",
    showingCount: "Showing {count} global currencies",
    alreadySelected: "Already selected",
    placeholder: "0.00",
    clear: "Clear",
    liveRates: "Live rates",
    serviceOffline: "Service Offline",
    quickConvert: "Quick Convert",
    lastSyncLabel: "Last Sync",
    settingsTitle: "Default Currencies",
    settingsSub: "Select 1 to 3 preferred currencies to display at the top.",
    addCurrency: "Add Currency",
    maxCurrenciesAlert: "You can select up to 3 default currencies",
    alreadyAdded: "This currency is already in the list",
    settingsClose: "Done",
    selectDefaultCurrencies: "Add Default Currency"
}
};

export function RateFastLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img 
      src="/icon-192.png" 
      alt="Ratefast Logo" 
      className={`${className} object-contain rounded-xl`} 
    />
  );
}

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  const t = TRANSLATIONS[lang];

  // Helper functions for dynamic tab naming and currency translations
  const getCurrencyTabName = (code: string) => {
    if (lang === 'zh') {
      return CURRENCY_NAMES_ZH[code]?.name || code;
    }
    return code;
  };

  const getCurrencyFullName = (currency: Currency) => {
    if (lang === 'zh') {
      return CURRENCY_NAMES_ZH[currency.code]?.localName || `${currency.name} (${currency.code})`;
    }
    return `${currency.name} (${currency.code})`;
  };

  // Conversions defaults: From THB to MYR as requested
  const [defaultCurrencies, setDefaultCurrencies] = useState<string[]>(() => {
    const saved = localStorage.getItem('ratefast_default_currencies');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Error parsing default currencies from localStorage', e);
      }
    }
    return ['MYR', 'THB', 'SGD'];
  });

  useEffect(() => {
    localStorage.setItem('ratefast_default_currencies', JSON.stringify(defaultCurrencies));
  }, [defaultCurrencies]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [fromCurrency, setFromCurrency] = useState<Currency>(
    () => SUPPORTED_CURRENCIES.find(c => c.code === 'MYR') || SUPPORTED_CURRENCIES[0]
  );
  const [toCurrency, setToCurrency] = useState<Currency>(
    () => SUPPORTED_CURRENCIES.find(c => c.code === 'THB') || SUPPORTED_CURRENCIES[1]
  );

  const currentTabs = useMemo(() => {
    const list = [...defaultCurrencies];
    if (!list.includes(fromCurrency.code)) {
      list.push(fromCurrency.code);
    }
    return list;
  }, [defaultCurrencies, fromCurrency.code]);

  const handleTabClick = (code: string) => {
    const targetObj = SUPPORTED_CURRENCIES.find(c => c.code === code);
    if (targetObj) {
      setFromCurrency(targetObj);
    }
  };

  const [amount, setAmount] = useState<string>('100');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const syncTime = useMemo(() => {
    if (!lastUpdated) return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
    try {
      const date = new Date(lastUpdated);
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      return new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  }, [lastUpdated, isLoading]);

  // States for custom Search Dropdown Popover / Modal
  const [activeSelector, setActiveSelector] = useState<'from' | 'to' | 'addDefault' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch exchange rates whenever fromCurrency changes
  useEffect(() => {
    let isMounted = true;
    
    if (fromCurrency.code === toCurrency.code) {
      setRates({ [toCurrency.code]: 1 });
      setLastUpdated(new Date().toUTCString());
      setError(null);
      return;
    }

    const fetchRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency.code}`);
        if (!response.ok) {
          throw new Error(`API error (status ${response.status}) while retrieving rates for ${fromCurrency.code}.`);
        }
        const data = await response.json();
        
        if (isMounted) {
          if (data && data.rates) {
            setRates(data.rates);
            if (data.time_last_update_utc) {
              setLastUpdated(data.time_last_update_utc);
            } else {
              setLastUpdated(new Date().toUTCString());
            }
          } else {
            throw new Error('Received unexpected empty data format from server.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error(err);
          setError(
            err.message || "Failed to fetch exchange rates. The service might be temporarily unavailable."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRates();

    return () => {
      isMounted = false;
    };
  }, [fromCurrency.code]);

  // Handle key manual refresh
  const triggerManualRefresh = async () => {
    if (fromCurrency.code === toCurrency.code) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency.code}`);
      if (!response.ok) {
        throw new Error(`Failed to refresh database data (status ${response.status}).`);
      }
      const data = await response.json();
      if (data && data.rates) {
        setRates(data.rates);
        if (data.time_last_update_utc) {
          setLastUpdated(data.time_last_update_utc);
        }
      }
    } catch (err: any) {
      setError(err.message || "Refresh failed. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Safe manual input value cleanser
  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return;
    }
    setAmount(cleaned);
  };

  // Convert current amount base on downloaded rates
  const conversionData = useMemo(() => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount < 0) {
      return {
        convertedValue: 0,
        rate: 0,
        reverseRate: 0,
        isValid: false,
      };
    }

    let activeRate = 1;
    if (fromCurrency.code !== toCurrency.code) {
      activeRate = rates[toCurrency.code] || 0;
    }

    const convertedValue = numAmount * activeRate;
    const reverseRate = activeRate > 0 ? 1 / activeRate : 0;

    return {
      convertedValue,
      rate: activeRate,
      reverseRate,
      isValid: true,
    };
  }, [amount, rates, fromCurrency.code, toCurrency.code]);

  // Currency swap button logic
  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Handle selection of a currency from the searchable popover list
  const selectCurrency = (currency: Currency) => {
    if (activeSelector === 'from') {
      setFromCurrency(currency);
    } else if (activeSelector === 'to') {
      setToCurrency(currency);
    } else if (activeSelector === 'addDefault') {
      if (defaultCurrencies.includes(currency.code)) {
        alert(t.alreadyAdded);
      } else if (defaultCurrencies.length >= 3) {
        alert(t.maxCurrenciesAlert);
      } else {
        setDefaultCurrencies([...defaultCurrencies, currency.code]);
      }
    }
    setActiveSelector(null);
    setSearchQuery('');
  };

  // Default currencies operations
  const deleteDefaultCurrency = (code: string) => {
    if (defaultCurrencies.length <= 1) return;
    setDefaultCurrencies(defaultCurrencies.filter(c => c !== code));
  };

  const moveDefaultCurrencyUp = (index: number) => {
    if (index <= 0) return;
    const newList = [...defaultCurrencies];
    const temp = newList[index];
    newList[index] = newList[index - 1];
    newList[index - 1] = temp;
    setDefaultCurrencies(newList);
  };

  const moveDefaultCurrencyDown = (index: number) => {
    if (index >= defaultCurrencies.length - 1) return;
    const newList = [...defaultCurrencies];
    const temp = newList[index];
    newList[index] = newList[index + 1];
    newList[index + 1] = temp;
    setDefaultCurrencies(newList);
  };

  // Dynamic presets based on currency rate
  const presets = useMemo(() => {
    const code = fromCurrency.code;
    
    // 1. Static lookup for popular currencies
    const PRESETS_BY_CURRENCY: Record<string, number[]> = {
      USD: [10, 50, 100],
      EUR: [10, 50, 100],
      GBP: [10, 50, 100],
      CHF: [10, 50, 100],
      CAD: [10, 50, 100],
      AUD: [20, 50, 100],
      SGD: [10, 50, 100],
      NZD: [20, 50, 100],
      HKD: [100, 500, 1000],
      CNY: [50, 100, 500],
      MYR: [50, 100, 500],
      THB: [100, 500, 1000],
      PHP: [500, 1000, 5000],
      INR: [500, 1000, 5000],
      JPY: [1000, 5000, 10000],
      KRW: [10000, 50000, 100000],
      IDR: [50000, 100000, 500000],
      VND: [100000, 500000, 1000000],
      TWD: [500, 1000, 5000]
    };
    
    if (PRESETS_BY_CURRENCY[code]) {
      return PRESETS_BY_CURRENCY[code];
    }
    
    // 2. Dynamic rounding helper for exotic currencies
    const rateToUsd = rates['USD'];
    if (!rateToUsd) return [10, 50, 100]; // fallback
    
    const usdValueInCurrency = 1 / rateToUsd; // How much of 'code' is 1 USD
    
    // Let's compute bases for 10, 50, 100 USD
    const base10 = 10 * usdValueInCurrency;
    const base50 = 50 * usdValueInCurrency;
    const base100 = 100 * usdValueInCurrency;
    
    const roundToNiceNumber = (num: number) => {
      if (num <= 0) return 1;
      const magnitude = Math.pow(10, Math.floor(Math.log10(num)));
      const normalized = num / magnitude;
      
      let roundedNormalized = 1;
      if (normalized >= 7.5) {
        roundedNormalized = 10;
      } else if (normalized >= 3.5) {
        roundedNormalized = 5;
      } else if (normalized >= 1.5) {
        roundedNormalized = 2;
      }
      
      return roundedNormalized * magnitude;
    };
    
    return [
      roundToNiceNumber(base10),
      roundToNiceNumber(base50),
      roundToNiceNumber(base100)
    ];
  }, [fromCurrency.code, rates]);

  // Quick swap presets for the footer of the converter
  const applyPreset = (fromCode: string, toCode: string) => {
    const fromObj = SUPPORTED_CURRENCIES.find(c => c.code === fromCode);
    const toObj = SUPPORTED_CURRENCIES.find(c => c.code === toCode);
    if (fromObj && toObj) {
      setFromCurrency(fromObj);
      setToCurrency(toObj);
    }
  };

  // Filter currency records based on Search query (country name, currency name, code)
  const filteredCurrencies = useMemo(() => {
    const normQuery = searchQuery.trim().toLowerCase();
    if (!normQuery) return SUPPORTED_CURRENCIES;

    return SUPPORTED_CURRENCIES.filter(
      c => {
        const codeMatch = c.code.toLowerCase().includes(normQuery);
        const nameMatch = c.name.toLowerCase().includes(normQuery);
        const countryMatch = c.country.toLowerCase().includes(normQuery);
        
        // Match Chinese names and country
        const zhInfo = CURRENCY_NAMES_ZH[c.code];
        const zhNameMatch = zhInfo && zhInfo.name.includes(normQuery);
        const zhLocalNameMatch = zhInfo && zhInfo.localName.toLowerCase().includes(normQuery);
        const zhCountryMatch = zhInfo && zhInfo.country.includes(normQuery);

        return codeMatch || nameMatch || countryMatch || zhNameMatch || zhLocalNameMatch || zhCountryMatch;
      }
    );
  }, [searchQuery]);

  // Autofocus the search query input when modal is toggled open
  useEffect(() => {
    if (activeSelector && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [activeSelector]);

  // Format Helper for numbers
  const formatMoney = (val: number, precision: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision === 2 ? 4 : precision
    }).format(val);
  };

  // Date formatting helper
  const formatDateString = (dtStr: string | null) => {
    if (!dtStr) return 'N/A';
    try {
      const parts = dtStr.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
      return dtStr;
    } catch {
      return dtStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between font-sans text-slate-900" id="app_root_layout">
      {/* Compact Header */}
      <header className="flex items-center justify-between px-4 py-2.5 sm:px-8 sm:py-3.5 bg-white border-b border-slate-100 shadow-xs" id="header_section">
        <div className="flex items-center gap-2.5">
          <RateFastLogo className="w-9 h-9" />
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none" id="branding_title_id">
              <span className="text-slate-900">Rate</span><span className="text-blue-600">Fast</span>
            </h1>
          </div>
        </div>

        {/* Language switching & Settings header navigation */}
        <div className="flex items-center gap-2" id="header_nav_controls">
          <div className="flex items-center space-x-1.5 mr-1 bg-slate-50 border border-slate-200/50 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-500">
            <span className={`w-1.5 h-1.5 rounded-full ${error ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
            <span>{error ? t.serviceOffline : t.liveRates}</span>
          </div>

          <button
            type="button"
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-bold px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer border border-slate-200/50 hover:border-blue-200/50 h-8"
            id="lang_switch_toggle"
            title={lang === 'zh' ? 'Switch to English' : '切换至中文'}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'zh' ? 'English' : '中文'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center justify-center bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 p-2 rounded-xl transition-all cursor-pointer border border-slate-200/50 hover:border-blue-200/50 h-8 w-8"
            id="settings_toggle_btn"
            title={lang === 'zh' ? '设置' : 'Settings'}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main content viewport styled like the image */}
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-4 sm:px-6 max-w-lg mx-auto w-full animate-fadeIn" id="main_content_viewport">
        
        {/* Decorative badge logo matching image */}
        <div className="w-20 h-20 bg-blue-50/40 rounded-3xl flex items-center justify-center border border-blue-100/30 shadow-xs mb-3.5 hover:scale-105 transition-transform duration-300">
          <RateFastLogo className="w-16 h-16" />
        </div>

        {/* Big styled core title matching image */}
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 font-sans text-center tracking-tight">
          {lang === 'zh' ? '实时汇率转换' : 'Real-time Exchange Rate'}
        </h2>

        {/* Tab switch control pill matching image - enhanced to be globally dynamic and support THB, SGD, USD + any selected */}
        <div className="bg-[#f0f3f8] p-1 rounded-2xl flex w-full mb-6 border border-slate-200/30 gap-1" id="popular_selector_tabs">
          {currentTabs.map((code) => {
            const isActive = fromCurrency.code === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleTabClick(code)}
                className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer text-center whitespace-nowrap px-1 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {code} {getCurrencyTabName(code)}
              </button>
            );
          })}
        </div>

        {/* Dynamic Card Container holding the widgets */}
        <div
          className="w-full bg-white rounded-[2rem] shadow-[0_24px_48px_-8px_rgba(0,0,0,0.05)] border border-slate-100 p-6 sm:p-7 flex flex-col gap-6"
          id="converter_card_container"
        >
          {/* VIBRANT BLUE CURRENT RATE STATEMENT CARD */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 text-white flex flex-col gap-1.5 shadow-lg shadow-blue-500/15 relative overflow-hidden" id="vibrant_blue_status_card">
            {/* Ambient upper right graphic indicator */}
            <div className="absolute right-4 top-4 text-blue-100/30">
              <ArrowUpDown className="w-4 h-4" />
            </div>

            <span className="text-xs font-bold text-blue-100/90 tracking-wide uppercase">
              {lang === 'zh' ? '当前汇率' : 'Current Exchange Rate'} ({getCurrencyTabName(fromCurrency.code)}{lang === 'zh' ? '兑' : ' to '}{getCurrencyTabName(toCurrency.code)})
            </span>
            
            <div className="text-2xl sm:text-3xl font-black tracking-tight leading-none my-1 select-all font-sans">
              1 {fromCurrency.code} = {isLoading ? '...' : formatMoney(conversionData.rate, 4)} {toCurrency.code}
            </div>

            <div className="flex justify-between items-center text-[11px] text-blue-100/80 mt-1">
              <span>{lang === 'zh' ? '最后同步' : 'Last Sync'}: {syncTime}</span>
              {!isLoading && (
                <button
                  type="button"
                  onClick={triggerManualRefresh}
                  className="hover:text-white transition-colors flex items-center gap-1 font-bold cursor-pointer"
                  title={t.refreshTitle}
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* INPUT CURRENCY SOURCE BLOCK */}
          <div className="space-y-2" id="input_source_block">
            <div className="flex justify-between items-center px-1">
              <button
                type="button"
                onClick={() => setActiveSelector('from')}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50/70 text-slate-800 font-extrabold px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border border-slate-200/50 hover:border-blue-200/50"
              >
                <span className="text-sm">{fromCurrency.flag}</span>
                <span>{fromCurrency.code} · {lang === 'zh' ? (CURRENCY_NAMES_ZH[fromCurrency.code]?.name || fromCurrency.name) : fromCurrency.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
              
              <button
                type="button"
                onClick={() => setActiveSelector('from')}
                className="text-[10px] text-blue-600 hover:text-blue-800 font-extrabold flex items-center gap-1 transition-all cursor-pointer"
              >
                <Search className="w-2.5 h-2.5" />
                <span>{lang === 'zh' ? '搜索货币' : 'Search'}</span>
              </button>
            </div>
            <div className="flex items-center w-full bg-[#f4f6fa]/70 rounded-2xl px-5 py-4 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all border border-transparent focus-within:border-blue-200/50">
              <span className="text-xl font-black text-slate-400 mr-3 select-none min-w-[2rem]">
                {fromCurrency.symbol}
              </span>
              <input
                id="amount-input-id"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder={t.placeholder}
                className="w-full text-2xl font-black text-slate-800 bg-transparent focus:outline-none placeholder-slate-300 font-sans p-0 border-none"
              />
            </div>
          </div>

          {/* MIDDLE SWAP CIRCLE BUTTON */}
          <div className="flex justify-center -my-3.5 relative z-10">
            <button
              type="button"
              onClick={handleSwapCurrencies}
              className="w-11 h-11 bg-white rounded-full shadow-md shadow-slate-200/90 hover:shadow-lg flex items-center justify-center text-blue-600 border border-slate-100/55 hover:text-blue-700 active:scale-95 transition-all cursor-pointer"
              id="swap_currencies_trigger"
              title="Swap Currencies"
            >
              <ArrowUpDown className="w-4 h-4 font-bold" />
            </button>
          </div>

          {/* RECIPIENT TARGET TARGET BLOCK */}
          <div className="space-y-2" id="target_recipient_block">
            <div className="flex justify-between items-center px-1">
              <button
                type="button"
                onClick={() => setActiveSelector('to')}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50/70 text-slate-800 font-extrabold px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border border-slate-200/50 hover:border-blue-200/50"
              >
                <span className="text-sm">{toCurrency.flag}</span>
                <span>{toCurrency.code} · {lang === 'zh' ? (CURRENCY_NAMES_ZH[toCurrency.code]?.name || toCurrency.name) : toCurrency.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              <button
                type="button"
                onClick={() => setActiveSelector('to')}
                className="text-[10px] text-blue-600 hover:text-blue-800 font-extrabold flex items-center gap-1 transition-all cursor-pointer"
              >
                <Search className="w-2.5 h-2.5" />
                <span>{lang === 'zh' ? '搜索货币' : 'Search'}</span>
              </button>
            </div>
            <div className="flex items-center w-full bg-[#f4f6fa]/70 rounded-2xl px-5 py-4 transition-all border border-transparent">
              <span className="text-xl font-black text-slate-400 mr-3 select-none min-w-[2rem]">
                {toCurrency.symbol}
              </span>
              <div className="w-full text-2xl font-black text-slate-800 truncate select-all">
                {isLoading ? (
                  <span className="text-slate-350 animate-pulse text-base font-bold">{t.fetching}</span>
                ) : amount === '' ? (
                  '0.00'
                ) : (
                  formatMoney(conversionData.convertedValue, 2)
                )}
              </div>
            </div>
          </div>

          {/* QUICK PRESETS ("快速转换") AREA EXACTLY LIKE THE IMAGE */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5" id="quick_convert_preset_container">
            <span className="text-[11px] sm:text-xs font-extrabold text-[#9da8b6] uppercase tracking-wider">
              {t.quickConvert}
            </span>
            <div className="flex items-center gap-2.5" id="quick_presets_row_action">
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  className="bg-[#f8fafc] hover:bg-blue-50/50 text-slate-700 hover:text-blue-600 font-extrabold border border-slate-200/40 hover:border-blue-200 py-3.5 px-4 rounded-2xl flex-1 text-center text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  {formatMoney(val, 0)} {fromCurrency.symbol}
                </button>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* Footer conforming to streamlined look of the mockup */}
      <footer className="px-4 py-4 text-center border-t border-slate-100 bg-white" id="footer_section">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider" id="footer_credit_line_id">
          © 2026 RateFast. Created by Wesley.
        </p>
      </footer>

      {/* SEARCH OVERLAY / COMBOBOX DRAWER SHEET */}
      <AnimatePresence>
        {activeSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen" id="search_modal_root">
            {/* Modal Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setActiveSelector(null); setSearchQuery(''); }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Main Frame Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[75vh] border border-slate-100 z-10"
              id="search-modal-content"
            >
              {/* Active Search Dialog Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between" id="search_dialog_header_id">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-none">
                    {activeSelector === 'addDefault' 
                      ? t.selectDefaultCurrencies 
                      : (t.searchHeader + ' (' + (activeSelector === 'from' ? (lang === 'zh' ? '源货币' : 'Source') : (lang === 'zh' ? '目标货币' : 'Target')) + ')')}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {t.searchSub}
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={() => { setActiveSelector(null); setSearchQuery(''); }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 p-2 rounded-full transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic live input search field query bar */}
              <div className="p-3 bg-slate-50 border-b border-slate-100" id="search_query_bar_container">
                <div className="relative flex items-center rounded-xl bg-white border border-slate-200 px-3 py-1 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10">
                  <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent py-2 text-slate-800 focus:outline-none text-xs sm:text-sm placeholder-slate-400 font-medium"
                    id="currency-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Dynamic scrollable parsed matching results container */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-0.5 divide-y divide-slate-100/40" id="search_matches_view">
                {filteredCurrencies.length > 0 ? (
                  filteredCurrencies.map((currency) => {
                    const isSelected = activeSelector === 'addDefault'
                      ? defaultCurrencies.includes(currency.code)
                      : (activeSelector === 'from' 
                          ? fromCurrency.code === currency.code 
                          : toCurrency.code === currency.code);
                      
                    const isDisabled = activeSelector === 'addDefault'
                      ? false
                      : (activeSelector === 'from'
                          ? toCurrency.code === currency.code
                          : fromCurrency.code === currency.code);

                    return (
                      <button
                        key={currency.code}
                        type="button"
                        onClick={() => !isDisabled && selectCurrency(currency)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                          isSelected 
                            ? 'bg-blue-50/70 border border-blue-100/20' 
                            : isDisabled 
                              ? 'opacity-40 bg-slate-50/20 cursor-not-allowed'
                              : 'hover:bg-slate-50 border border-transparent'
                        }`}
                        disabled={isDisabled}
                      >
                        <div className="flex items-center space-x-2.5 overflow-hidden">
                          <span className="text-xl filter drop-shadow-xs flex-shrink-0" role="img" aria-label={currency.country}>
                            {currency.flag}
                          </span>
                          <div className="overflow-hidden">
                            <div className="flex items-center space-x-1.5">
                              <span className="font-extrabold text-slate-900 text-xs sm:text-sm leading-none">{currency.code}</span>
                              <span className="text-[10px] font-semibold text-slate-400 leading-none">•</span>
                              <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1 py-0.5 rounded-sm leading-none font-mono">
                                {currency.symbol}
                              </span>
                            </div>
                            <div className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                              {lang === 'zh' ? (CURRENCY_NAMES_ZH[currency.code]?.name || currency.name) : currency.name} <span className="text-slate-400">({currency.country})</span>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="bg-blue-600 text-white p-0.5 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 font-bold" />
                          </div>
                        )}
                        {!isSelected && isDisabled && (
                          <span className="text-[9px] bg-slate-100 text-slate-450 px-1.5 py-0.5 rounded-md font-semibold">
                            {t.alreadySelected}
                          </span>
                        )}
                        {activeSelector === 'addDefault' && isSelected && (
                          <span className="text-[9px] bg-blue-55/70 text-blue-600 px-1.5 py-0.5 rounded-md font-semibold ml-2">
                            {t.alreadyAdded}
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-10 px-4 text-center" id="no-results-notif">
                    <div className="bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2.5">
                      <Search className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-slate-800 font-extrabold text-xs sm:text-sm">{t.noResults}</p>
                    <p className="text-slate-400 text-[11px] mt-1 max-w-[200px] mx-auto">
                      {t.noResultsDetail.replace('{query}', searchQuery)}
                    </p>
                  </div>
                )}
              </div>

              {/* Selector modal footer status summary indicator */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400 font-extrabold uppercase tracking-wider" id="search_modal_footer">
                {t.showingCount.replace('{count}', filteredCurrencies.length.toString())}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SETTINGS DRAWER / BOTTOM SHEET */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 min-h-screen" id="settings_modal_root">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs cursor-pointer"
            />

            {/* Bottom Sheet / Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-white w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[75vh] border border-slate-100 pb-safe z-10"
              id="settings-drawer-content"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 leading-none">
                    {t.settingsTitle}
                  </h3>
                  <span className="text-xs text-slate-400 mt-1.5 block">
                    {t.settingsSub}
                  </span>
                </div>
                
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="bg-slate-100 hover:bg-slate-205 text-slate-500 hover:text-slate-800 p-2.5 rounded-full transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* List of default currencies */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {defaultCurrencies.map((code, index) => {
                  const currency = SUPPORTED_CURRENCIES.find(c => c.code === code) || {
                    code,
                    flag: '🏳️',
                    name: 'Unknown Currency',
                    country: 'Global',
                    symbol: code
                  };
                  const nameZh = CURRENCY_NAMES_ZH[code]?.name;
                  const displayName = lang === 'zh' && nameZh ? nameZh : currency.name;

                  return (
                    <div 
                      key={code} 
                      className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl filter drop-shadow-xs">{currency.flag}</span>
                        <div>
                          <span className="font-extrabold text-slate-900 text-sm">{code}</span>
                          <span className="text-xs text-slate-500 ml-2">{displayName}</span>
                        </div>
                      </div>

                      {/* Controls: Reorder and Delete */}
                      <div className="flex items-center gap-1">
                        {/* Move Up */}
                        <button
                          type="button"
                          onClick={() => moveDefaultCurrencyUp(index)}
                          disabled={index === 0}
                          className={`p-1.5 rounded-lg border border-slate-200/50 hover:bg-white text-slate-500 transition-colors ${
                            index === 0 ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer hover:text-blue-600'
                          }`}
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          onClick={() => moveDefaultCurrencyDown(index)}
                          disabled={index === defaultCurrencies.length - 1}
                          className={`p-1.5 rounded-lg border border-slate-200/50 hover:bg-white text-slate-500 transition-colors ${
                            index === defaultCurrencies.length - 1 ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer hover:text-blue-600'
                          }`}
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => deleteDefaultCurrency(code)}
                          disabled={defaultCurrencies.length <= 1}
                          className={`p-1.5 rounded-lg border border-slate-200/50 hover:bg-red-50 text-red-500 transition-colors ${
                            defaultCurrencies.length <= 1 ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer hover:text-red-750 hover:border-red-100'
                          }`}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add currency button and Done button */}
              <div className="p-4 border-t border-slate-100 flex flex-col gap-2.5 bg-slate-50">
                <button
                  type="button"
                  onClick={() => {
                    if (defaultCurrencies.length >= 3) {
                      alert(t.maxCurrenciesAlert);
                    } else {
                      setActiveSelector('addDefault');
                    }
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                    defaultCurrencies.length >= 3
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-white hover:bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-300 shadow-sm'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addCurrency} ({defaultCurrencies.length}/3)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 cursor-pointer text-center"
                >
                  {t.settingsClose}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
