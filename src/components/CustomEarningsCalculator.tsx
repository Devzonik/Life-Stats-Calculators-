import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, Clock, Calendar, Briefcase, Copy, Share2, 
  RotateCcw, Save, Search, Check, ChevronDown, Globe, 
  Coins, Info, Sparkles, TrendingUp
} from 'lucide-react';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee', flag: '🇵🇰' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
  { code: 'SAR', symbol: 'SR', name: 'Saudi Riyal', flag: '🇸🇦' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', flag: '🇳🇿' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', flag: '🇲🇽' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', flag: '🇷🇺' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', flag: '🇹🇷' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', flag: '🇰🇷' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', flag: '🇹🇭' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', flag: '🇻🇳' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', flag: '🇪🇬' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', flag: '🇧🇩' },
];

export function CustomEarningsCalculator() {
  // Default values
  const defaultCurrency = CURRENCIES[0];
  const defaultHoursPerDay = 8;
  const defaultDaysPerWeek = 5;
  const defaultWeeksPerYear = 52;
  const defaultBaseValue = 25;
  const defaultBaseType = 'hourly';

  // State
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [hoursPerDay, setHoursPerDay] = useState<number>(defaultHoursPerDay);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(defaultDaysPerWeek);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(defaultWeeksPerYear);
  
  // Base state tracking which field the user is actively editing
  const [baseValue, setBaseValue] = useState<number>(defaultBaseValue);
  const [baseType, setBaseType] = useState<string>(defaultBaseType);

  // Raw input state to handle typing decimals and empty values smoothly
  const [rawInputs, setRawInputs] = useState<{ [key: string]: string }>({
    hourly: '25',
    daily: '',
    weekly: '',
    monthly: '',
    yearly: '',
  });

  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close currency dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hydrate preferences from query params or localStorage
  useEffect(() => {
    // 1. Try URL parameters
    const params = new URLSearchParams(window.location.search);
    const ecVal = params.get('ec_v');
    const ecType = params.get('ec_t');
    const ecH = params.get('ec_h');
    const ecD = params.get('ec_d');
    const ecW = params.get('ec_w');
    const ecCur = params.get('ec_c');

    let initialCurrency = defaultCurrency;
    let initialH = defaultHoursPerDay;
    let initialD = defaultDaysPerWeek;
    let initialW = defaultWeeksPerYear;
    let initialVal = defaultBaseValue;
    let initialType = defaultBaseType;

    // Load from local storage if available
    try {
      const stored = localStorage.getItem('custom_earnings_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.currency) {
          const found = CURRENCIES.find(c => c.code === parsed.currency);
          if (found) initialCurrency = found;
        }
        if (parsed.hoursPerDay) initialH = Number(parsed.hoursPerDay);
        if (parsed.daysPerWeek) initialD = Number(parsed.daysPerWeek);
        if (parsed.weeksPerYear) initialW = Number(parsed.weeksPerYear);
      }
    } catch (e) {
      console.warn('Could not load preferences from localStorage', e);
    }

    // Override with URL params if they exist
    if (ecCur) {
      const found = CURRENCIES.find(c => c.code.toUpperCase() === ecCur.toUpperCase());
      if (found) initialCurrency = found;
    }
    if (ecH && !isNaN(Number(ecH))) initialH = Math.max(1, Math.min(24, Number(ecH)));
    if (ecD && !isNaN(Number(ecD))) initialD = Math.max(1, Math.min(7, Number(ecD)));
    if (ecW && !isNaN(Number(ecW))) initialW = Math.max(1, Math.min(52, Number(ecW)));
    if (ecVal && !isNaN(Number(ecVal))) initialVal = Math.max(0, Number(ecVal));
    if (ecType && ['hourly', 'daily', 'weekly', 'monthly', 'yearly'].includes(ecType)) {
      initialType = ecType;
    }

    setCurrency(initialCurrency);
    setHoursPerDay(initialH);
    setDaysPerWeek(initialD);
    setWeeksPerYear(initialW);
    setBaseValue(initialVal);
    setBaseType(initialType);

    // Sync raw input
    setRawInputs(prev => ({
      ...prev,
      [initialType]: initialVal.toString()
    }));
  }, []);

  // Compute all values from current baseValue & baseType and schedule
  const calculateAll = () => {
    const H = hoursPerDay;
    const D = daysPerWeek;
    const W = weeksPerYear;

    let hourly = 0;
    let daily = 0;
    let weekly = 0;
    let monthly = 0;
    let yearly = 0;

    switch (baseType) {
      case 'hourly':
        hourly = baseValue;
        daily = hourly * H;
        weekly = daily * D;
        yearly = weekly * W;
        monthly = yearly / 12;
        break;
      case 'daily':
        daily = baseValue;
        hourly = H > 0 ? daily / H : 0;
        weekly = daily * D;
        yearly = weekly * W;
        monthly = yearly / 12;
        break;
      case 'weekly':
        weekly = baseValue;
        daily = D > 0 ? weekly / D : 0;
        hourly = H > 0 ? daily / H : 0;
        yearly = weekly * W;
        monthly = yearly / 12;
        break;
      case 'monthly':
        monthly = baseValue;
        yearly = monthly * 12;
        weekly = W > 0 ? yearly / W : 0;
        daily = D > 0 ? weekly / D : 0;
        hourly = H > 0 ? daily / H : 0;
        break;
      case 'yearly':
        yearly = baseValue;
        monthly = yearly / 12;
        weekly = W > 0 ? yearly / W : 0;
        daily = D > 0 ? weekly / D : 0;
        hourly = H > 0 ? daily / H : 0;
        break;
    }

    return { hourly, daily, weekly, monthly, yearly };
  };

  const calculatedValues = calculateAll();

  // Handle a change to any income input field
  const handleIncomeChange = (type: string, valStr: string) => {
    // Allow empty strings and decimal points so typing is smooth
    setRawInputs(prev => ({ ...prev, [type]: valStr }));

    const parsed = parseFloat(valStr);
    if (!isNaN(parsed) && parsed >= 0) {
      setBaseValue(parsed);
      setBaseType(type);
      setErrors(prev => ({ ...prev, [type]: '' }));
    } else if (valStr === '') {
      setBaseValue(0);
      setBaseType(type);
    } else {
      setErrors(prev => ({ ...prev, [type]: 'Please enter a valid positive number' }));
    }
  };

  // Synchronize raw inputs of other fields when schedule changes or baseValue updates
  useEffect(() => {
    const updated = calculateAll();
    const newRawInputs: { [key: string]: string } = {};

    Object.keys(updated).forEach(key => {
      if (key === baseType) {
        // Keep the user's raw string exactly as is for the active input to not interrupt typing (e.g. "50.")
        newRawInputs[key] = rawInputs[key] !== undefined ? rawInputs[key] : baseValue.toString();
      } else {
        // Format others to nice decimal string
        const val = updated[key as keyof typeof updated];
        newRawInputs[key] = val % 1 === 0 ? val.toFixed(0) : val.toFixed(2);
      }
    });

    setRawInputs(newRawInputs);
  }, [baseValue, baseType, hoursPerDay, daysPerWeek, weeksPerYear]);

  // Validation functions for schedule inputs
  const validateHours = (val: number) => {
    if (isNaN(val) || val < 1 || val > 24) {
      setErrors(prev => ({ ...prev, hours: 'Hours must be between 1 and 24' }));
      return false;
    }
    setErrors(prev => ({ ...prev, hours: '' }));
    return true;
  };

  const validateDays = (val: number) => {
    if (isNaN(val) || val < 1 || val > 7) {
      setErrors(prev => ({ ...prev, days: 'Days must be between 1 and 7' }));
      return false;
    }
    setErrors(prev => ({ ...prev, days: '' }));
    return true;
  };

  const validateWeeks = (val: number) => {
    if (isNaN(val) || val < 1 || val > 52) {
      setErrors(prev => ({ ...prev, weeks: 'Weeks must be between 1 and 52' }));
      return false;
    }
    setErrors(prev => ({ ...prev, weeks: '' }));
    return true;
  };

  // Dropdown list filtering
  const filteredCurrencies = CURRENCIES.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.symbol.includes(searchQuery)
  );

  // Copy individual value to clipboard
  const handleCopyValue = (value: number, label: string) => {
    const formatted = `${currency.symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ${label}`;
    navigator.clipboard.writeText(formatted);
    setCopiedIndex(label);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Copy full breakdown to clipboard
  const handleCopyFullBreakdown = () => {
    const H = hoursPerDay;
    const D = daysPerWeek;
    const W = weeksPerYear;
    const { hourly, daily, weekly, monthly, yearly } = calculatedValues;
    const f = (val: number) => `${currency.symbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency.code}`;

    const text = `Custom Earnings Breakdown (${currency.code})
---------------------------------------
Work Schedule:
- Hours worked per day: ${H} hours
- Days worked per week: ${D} days
- Weeks worked per year: ${W} weeks
- Total Work Hours/Year: ${(H * D * W).toLocaleString()} hours

Earnings Calculations:
- Hourly Income:  ${f(hourly)} / hour
- Daily Income:   ${f(daily)} / day
- Weekly Income:  ${f(weekly)} / week
- Monthly Income: ${f(monthly)} / month
- Yearly Income:  ${f(yearly)} / year

Calculated on My Life Calculator (Custom Income Tool)
`;
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Share calculation (URL copy)
  const handleShare = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const query = `?ec_v=${baseValue}&ec_t=${baseType}&ec_h=${hoursPerDay}&ec_d=${daysPerWeek}&ec_w=${weeksPerYear}&ec_c=${currency.code}`;
    const shareUrl = `${baseUrl}${query}`;
    
    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  // Save current preferences locally
  const handleSavePreferences = () => {
    const pref = {
      currency: currency.code,
      hoursPerDay,
      daysPerWeek,
      weeksPerYear,
    };
    localStorage.setItem('custom_earnings_preferences', JSON.stringify(pref));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Reset to original state
  const handleReset = () => {
    setCurrency(defaultCurrency);
    setHoursPerDay(defaultHoursPerDay);
    setDaysPerWeek(defaultDaysPerWeek);
    setWeeksPerYear(defaultWeeksPerYear);
    setBaseValue(defaultBaseValue);
    setBaseType(defaultBaseType);
    setRawInputs({
      hourly: defaultBaseValue.toString(),
      daily: '',
      weekly: '',
      monthly: '',
      yearly: '',
    });
    setErrors({});
  };

  const getPercentageOfYearly = (value: number) => {
    const maxYearly = 500000; // Cap for progress visual reference
    return Math.min(100, (value / maxYearly) * 100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 md:p-12 mt-12 w-full text-left"
      id="custom-earnings-calculator"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 border-b border-gray-50 pb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>SEO Optimized Custom Tool</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            Custom Earnings Calculator
          </h2>
          <p className="text-gray-500 font-medium mt-1 text-sm md:text-base max-w-2xl">
            Real-time income conversion based on your unique rate and work schedule. Customize your hourly, daily, weekly, monthly, and yearly projections instantly.
          </p>
        </div>

        {/* Searchable Currency Selector */}
        <div className="relative w-full sm:w-72" ref={dropdownRef}>
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
            Select Currency
          </label>
          <button
            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
            className="w-full bg-gray-50/75 border border-gray-200/80 hover:border-indigo-300 rounded-2xl px-4 py-3.5 flex items-center justify-between text-gray-800 font-bold text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            aria-haspopup="listbox"
            aria-expanded={isCurrencyOpen}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl" role="img" aria-label={currency.name}>
                {currency.flag}
              </span>
              <span>{currency.code} ({currency.symbol})</span>
              <span className="text-xs text-gray-400 font-normal truncate hidden sm:inline">- {currency.name}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isCurrencyOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 right-0 left-0 mt-2 bg-white border border-gray-150 rounded-2xl shadow-2xl overflow-hidden max-h-80 flex flex-col"
              >
                <div className="p-3 border-b border-gray-50 flex items-center gap-2 bg-gray-50/50">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search currency code or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto max-h-56 divide-y divide-gray-50 select-none">
                  {filteredCurrencies.length > 0 ? (
                    filteredCurrencies.map((c) => (
                      <div
                        key={c.code}
                        onClick={() => {
                          setCurrency(c);
                          setIsCurrencyOpen(false);
                          setSearchQuery('');
                        }}
                        className={`px-4 py-3 text-sm font-bold flex items-center justify-between cursor-pointer transition-colors ${
                          currency.code === c.code 
                            ? 'bg-indigo-50 text-indigo-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg" role="img" aria-label={c.name}>{c.flag}</span>
                          <span>{c.code} <span className="text-gray-400 font-medium">({c.symbol})</span></span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{c.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-gray-400 font-bold">
                      No matching currencies found.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Input Section */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              1. Customize Your Schedule
            </h3>
            
            <div className="bg-gray-50/50 border border-gray-100 rounded-[2rem] p-6 space-y-6">
              {/* Hours / Day */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="hours-per-day" className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    Hours Worked per Day
                  </label>
                  <input
                    type="number"
                    id="hours-per-day-input"
                    min="1"
                    max="24"
                    value={hoursPerDay || ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setHoursPerDay(isNaN(val) ? 0 : val);
                      validateHours(val);
                    }}
                    className="w-16 text-center px-2 py-1 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <input
                  type="range"
                  id="hours-per-day"
                  min="1"
                  max="24"
                  value={hoursPerDay}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setHoursPerDay(val);
                    validateHours(val);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                {errors.hours && <p className="text-xs text-red-500 font-bold mt-1">{errors.hours}</p>}
              </div>

              {/* Days / Week */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="days-per-week" className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    Days Worked per Week
                  </label>
                  <input
                    type="number"
                    id="days-per-week-input"
                    min="1"
                    max="7"
                    value={daysPerWeek || ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setDaysPerWeek(isNaN(val) ? 0 : val);
                      validateDays(val);
                    }}
                    className="w-16 text-center px-2 py-1 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <input
                  type="range"
                  id="days-per-week"
                  min="1"
                  max="7"
                  value={daysPerWeek}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setDaysPerWeek(val);
                    validateDays(val);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                {errors.days && <p className="text-xs text-red-500 font-bold mt-1">{errors.days}</p>}
              </div>

              {/* Weeks / Year */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="weeks-per-year" className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    Weeks Worked per Year
                  </label>
                  <input
                    type="number"
                    id="weeks-per-year-input"
                    min="1"
                    max="52"
                    value={weeksPerYear || ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setWeeksPerYear(isNaN(val) ? 0 : val);
                      validateWeeks(val);
                    }}
                    className="w-16 text-center px-2 py-1 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <input
                  type="range"
                  id="weeks-per-year"
                  min="1"
                  max="52"
                  value={weeksPerYear}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setWeeksPerYear(val);
                    validateWeeks(val);
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                {errors.weeks && <p className="text-xs text-red-500 font-bold mt-1">{errors.weeks}</p>}
              </div>

              <div className="bg-indigo-50/50 rounded-2xl p-4 flex items-start gap-3">
                <Info className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                <p className="text-xs text-indigo-800 leading-relaxed font-semibold">
                  This schedule evaluates to <span className="font-bold underline">{(hoursPerDay * daysPerWeek * weeksPerYear).toLocaleString()} total work hours</span> per year. Changing these limits recalculates all dependent conversion ratios automatically.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-indigo-500" />
              2. Enter Earnings (Any Field)
            </h3>
            
            <p className="text-xs text-gray-400 font-bold mb-4 -mt-2 leading-relaxed">
              Every input below is bidirectional. Edit any metric, and the others will automatically scale based on your work schedule constraints.
            </p>

            <div className="space-y-4">
              {[
                { type: 'hourly', label: 'Hourly Rate', desc: 'Per work hour' },
                { type: 'daily', label: 'Daily Income', desc: `Based on ${hoursPerDay} hours/day` },
                { type: 'weekly', label: 'Weekly Income', desc: `Based on ${daysPerWeek} days/week` },
                { type: 'monthly', label: 'Monthly Income', desc: 'Average calendar month' },
                { type: 'yearly', label: 'Yearly Income', desc: `Based on ${weeksPerYear} weeks/year` },
              ].map(({ type, label, desc }) => (
                <div 
                  key={type} 
                  className={`border rounded-2xl p-4 transition-all duration-200 ${
                    baseType === type 
                      ? 'border-indigo-500 bg-indigo-50/20 shadow-md shadow-indigo-100/30' 
                      : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <label htmlFor={`income-${type}`} className="text-xs font-black text-gray-900 block">
                        {label}
                      </label>
                      <span className="text-[10px] text-gray-400 font-bold">{desc}</span>
                    </div>
                    <div className="relative rounded-xl shadow-sm max-w-[12rem] sm:max-w-[14rem]">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                        <span className="text-gray-400 font-bold text-sm">{currency.symbol}</span>
                      </div>
                      <input
                        type="text"
                        name={`income-${type}`}
                        id={`income-${type}`}
                        value={rawInputs[type] || ''}
                        onChange={(e) => handleIncomeChange(type, e.target.value)}
                        placeholder="0.00"
                        className="block w-full rounded-xl border-gray-200 pl-8 pr-3 py-2.5 text-right font-black text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50/20"
                      />
                    </div>
                  </div>
                  {errors[type] && <p className="text-xs text-red-500 font-bold mt-1 text-right">{errors[type]}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Section */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              3. Converted Income Breakdown
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'hourly', value: calculatedValues.hourly, title: 'Hourly Rate', subtitle: '/ Hour', color: 'indigo' },
                { key: 'daily', value: calculatedValues.daily, title: 'Daily Earnings', subtitle: '/ Day', color: 'blue' },
                { key: 'weekly', value: calculatedValues.weekly, title: 'Weekly Net', subtitle: '/ Week', color: 'emerald' },
                { key: 'monthly', value: calculatedValues.monthly, title: 'Monthly Salary', subtitle: '/ Month', color: 'violet' },
                { key: 'yearly', value: calculatedValues.yearly, title: 'Yearly Income', subtitle: '/ Year', color: 'orange' },
              ].map(({ key, value, title, subtitle, color }) => (
                <div 
                  key={key} 
                  className={`bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between group transition-all hover:shadow-lg hover:border-gray-200 ${
                    key === 'yearly' ? 'md:col-span-2 bg-gradient-to-br from-indigo-50/30 to-violet-50/10' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest block">{title}</span>
                      <span className="text-xs text-gray-400 font-medium">{subtitle}</span>
                    </div>
                    <button
                      onClick={() => handleCopyValue(value, key)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      title={`Copy ${title}`}
                    >
                      {copiedIndex === key ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  <div>
                    <span className="text-2xl md:text-3xl font-black text-gray-900 block truncate tabular-nums">
                      {currency.symbol}{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold block mt-1 uppercase tracking-wider">{currency.code}</span>
                  </div>

                  {/* Relative gauge bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-4">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        color === 'indigo' ? 'bg-indigo-600' :
                        color === 'blue' ? 'bg-blue-500' :
                        color === 'emerald' ? 'bg-emerald-500' :
                        color === 'violet' ? 'bg-violet-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${getPercentageOfYearly(key === 'yearly' ? value : value * (key === 'hourly' ? 2000 : key === 'daily' ? 250 : key === 'weekly' ? 52 : 12))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 border-t border-gray-100 pt-8 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Copy Full Breakdown */}
              <button
                onClick={handleCopyFullBreakdown}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-100"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'Copied Breakdown!' : 'Copy All Results'}</span>
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all active:scale-95 shadow-sm"
              >
                {shared ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{shared ? 'Link Copied!' : 'Share Calculations'}</span>
              </button>

              {/* Save Preferences */}
              <button
                onClick={handleSavePreferences}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all active:scale-95 shadow-sm"
              >
                {saved ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Save className="w-3.5 h-3.5" />}
                <span>{saved ? 'Preferences Saved!' : 'Save Defaults'}</span>
              </button>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all active:scale-95 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Fields</span>
              </button>
            </div>

            <div className="text-[11px] text-gray-400 font-bold leading-relaxed text-center">
              All calculations run client-side in real-time. Shared links contain the state parameters directly in the query parameters so no data is transferred to any external server.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
