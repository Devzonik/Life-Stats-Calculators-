import { useState, useEffect, useMemo, useRef } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Heart, 
  Wind, 
  Eye, 
  Moon, 
  Calendar, 
  ChevronRight, 
  ArrowRight,
  ArrowLeft, 
  Share2, 
  Info,
  ExternalLink,
  Github,
  Twitter,
  Mail,
  Menu,
  X,
  Smartphone,
  Coffee,
  Utensils,
  Footprints,
  TrendingUp,
  Briefcase,
  BookOpen,
  Users,
  Smile,
  Globe,
  Zap,
  Battery,
  AlertCircle,
  Sparkles,
  Brain,
  DollarSign,
  Monitor,
  Music,
  MapPin,
  Home,
  Sun,
  MessageSquare,
  Handshake,
  Trash2,
  Dumbbell
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';
import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BLOG_POSTS } from './blogData';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
const LIFE_EXPECTANCY = 80; // Default average
const AVG_HEART_RATE = 72; // BPM
const AVG_BREATH_RATE = 14; // Breaths per minute
const AVG_BLINK_RATE = 15; // Blinks per minute
const AVG_SLEEP_HOURS = 7.5; // Hours per day
const AVG_WORK_HOURS = 8; // Hours per day
const AVG_PHONE_USE = 4.5; // Hours per day
const AVG_MEALS_PER_DAY = 3;
const AVG_STEPS_PER_DAY = 6000;
const AVG_WATER_LITERS = 2;
const AVG_COFFEE_CUPS = 1.5;
const AVG_BOOKS_PER_YEAR = 4;
const AVG_WORDS_PER_DAY = 15000;
const AVG_LAUGHS_PER_DAY = 15;
const AVG_BATHROOM_YEARS = 1.5; // In a lifetime
const AVG_SCROLL_KM_PER_DAY = 0.3; // Estimated scrolling distance

// --- Types ---
interface LifeStats {
  // Time
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  totalWeeks: number;
  totalMonths: number;
  
  // Expectancy
  daysLeft: number;
  percentCompleted: number;
  weekendsLeft: number;
  nextBirthdayDays: number;
  milestone10kDays: number; // Days until or since
  timeWithParentsPercent: number; // Viral stat: 90% spent by 18
  
  // Health & Body
  heartbeats: number;
  breaths: number;
  blinks: number;
  sleepHours: number;
  caloriesBurned: number;
  waterConsumed: number;
  stepsWalked: number;
  biologicalAge: number;
  
  // Digital
  phoneTimeHours: number;
  scrolledKm: number;
  notificationsReceived: number;
  wordsTyped: number;
  
  // Lifestyle
  mealsEaten: number;
  coffeeCups: number;
  laughs: number;
  bathroomDays: number;
  earthCircuits: number; // How many times walked around earth
  foodTons: number;
  
  // Money (Estimated based on averages)
  moneyEarned: number;
  hourlyValue: number;
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-200">
              <Clock className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              LifeStats
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={cn("text-sm font-medium transition-colors", location.pathname === '/' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600')}>
              Calculator
            </Link>
            <Link to="/blog" className={cn("text-sm font-medium transition-colors", location.pathname.startsWith('/blog') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600')}>
              Blog
            </Link>
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
              About
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Calculator</Link>
              <Link to="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Blog</Link>
              <a href="#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">About</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="text-indigo-600 w-6 h-6" />
            <span className="text-xl font-bold">LifeStats</span>
          </div>
          <p className="text-gray-500 max-w-sm leading-relaxed">
            Empowering individuals with data-driven insights into their life journey. 
            Track your milestones, understand your biology, and make every second count.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-600 text-sm">
            <li><Link to="/" className="hover:text-indigo-600 transition-colors">Life Calculator</Link></li>
            <li><Link to="/blog" className="hover:text-indigo-600 transition-colors">Insights Blog</Link></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-6">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>© 2026 LifeStats Calculator. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Built with precision for the curious mind.</p>
      </div>
    </div>
  </footer>
);

const StatCard = ({ icon: Icon, label, value, subValue, color, trend }: { icon: any, label: string, value: string | number, subValue?: string, color: string, trend?: string }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
  >
    <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-110", color)} />
    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm", color)}>
      <Icon className="text-white w-6 h-6" />
    </div>
    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
    <div className="flex items-baseline space-x-2">
      <p className="text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
      {trend && <span className="text-xs font-bold text-green-500">{trend}</span>}
    </div>
    {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
  </motion.div>
);

const LifeBattery = ({ percentage }: { percentage: number }) => {
  const colorClass = percentage > 80 ? 'bg-red-500' : percentage > 50 ? 'bg-orange-500' : percentage > 20 ? 'bg-yellow-500' : 'bg-green-500';
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-24 h-48 border-4 border-gray-800 rounded-2xl p-1 flex flex-col justify-end overflow-hidden">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-800 rounded-t-lg" />
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          className={cn("w-full rounded-xl shadow-inner", colorClass)}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black text-gray-900 drop-shadow-sm">{Math.round(percentage)}%</span>
        </div>
      </div>
      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Life Battery</p>
    </div>
  );
};

const LifeClock24h = ({ age }: { age: number }) => {
  // Map life expectancy to 24 hours
  const totalMinutes = 24 * 60;
  const currentMinutes = (age / LIFE_EXPECTANCY) * totalMinutes;
  const hours = Math.floor(currentMinutes / 60);
  const minutes = Math.floor(currentMinutes % 60);
  
  const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center shadow-inner bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-16 bg-indigo-600 rounded-full origin-bottom -translate-y-8" style={{ transform: `rotate(${(currentMinutes / totalMinutes) * 360}deg)` }} />
        </div>
        <div className="z-10 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">
          <span className="text-xl font-mono font-bold text-gray-900">{timeStr}</span>
        </div>
      </div>
      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Life as a 24h Day</p>
    </div>
  );
};

// --- Components ---
const ShareButton = ({ stats }: { stats: any }) => {
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    const text = `I've lived for ${stats.totalDays.toLocaleString()} days, ${stats.totalHours.toLocaleString()} hours, and ${stats.totalMinutes.toLocaleString()} minutes! Check your life stats at LifeStats.`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Life Stats',
          text: text,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={handleShare}
        className="flex items-center space-x-2 bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95"
      >
        <Share2 className="w-5 h-5" />
        <span>Share Stats</span>
      </button>
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-4 py-2 rounded-lg whitespace-nowrap z-50 font-bold shadow-xl"
          >
            Stats copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How accurate is the Life Stats Calculator?",
      answer: "Our calculator uses standard biological and lifestyle averages (like heart rate, sleep patterns, and life expectancy) to provide estimates. While highly personalized based on your birth date, these are statistical projections meant for mindfulness and reflection."
    },
    {
      question: "What is the '10,000 Days Milestone'?",
      answer: "The 10,000-day milestone occurs when you are approximately 27.4 years old. It's a significant numerical milestone in your life journey that many people use as a moment for deep reflection."
    },
    {
      question: "How do you calculate life expectancy?",
      answer: "By default, we use a global average of 80 years. However, life expectancy varies by region, lifestyle, and genetics. You can use our tool to visualize how your time is allocated regardless of the total duration."
    },
    {
      question: "Is my data private?",
      answer: "Absolutely. All calculations are performed locally in your browser. We do not store your birth date or any personal statistics on our servers."
    },
    {
      question: "Can I share my results?",
      answer: "Yes! Use the 'Share Stats' button on your dashboard to share your unique life journey with friends and family on social media."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-indigo-100 transition-colors">
              <h3 className="text-xl font-black text-gray-900 mb-4">{faq.question}</h3>
              <p className="text-gray-600 font-medium leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SEOContent = () => {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-indigo prose-lg max-w-none text-gray-600 font-medium">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Why Track Your Life Statistics?</h2>
          <p className="mb-6">
            Understanding <strong>how many days you have lived</strong> is more than just a curiosity—it's a powerful tool for perspective. Our <strong>Life Stats Calculator</strong> provides a granular look at your existence, from total heartbeats to the number of times you've orbited the sun.
          </p>
          <p className="mb-6">
            By using a <strong>life expectancy calculator</strong>, you can visualize your journey and make more intentional decisions about your future. Whether you're looking for your <strong>age in days</strong>, <strong>seconds alive</strong>, or a deep dive into your <strong>daily life progress</strong>, our tool offers the most comprehensive analytics available.
          </p>
          <h3 className="text-2xl font-black text-gray-900 mb-6">Key Features of our Life Calculator:</h3>
          <ul className="list-disc pl-6 mb-8 space-y-3">
            <li><strong>Total Days Lived:</strong> See exactly how many sunrises you've witnessed.</li>
            <li><strong>Biological Stats:</strong> Estimated heartbeats, breaths, and blinks.</li>
            <li><strong>Digital Footprint:</strong> Understand your screen time and scrolling habits.</li>
            <li><strong>Milestone Countdown:</strong> Track your progress toward your next 10,000-day milestone.</li>
            <li><strong>AI Life Insights:</strong> Get philosophical perspectives powered by advanced AI.</li>
          </ul>
          <p>
            Start tracking your <strong>life statistics</strong> today and join thousands of users who are using data to live more mindful, purposeful lives.
          </p>
        </div>
      </div>
    </section>
  );
};

const RealTimeClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-3 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shadow-sm">
      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
      <span className="text-indigo-900 font-mono font-medium">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
    </div>
  );
};

// --- Pages ---

const HomePage = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [stats, setStats] = useState<LifeStats | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);

  const validateDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    
    if (isNaN(date.getTime())) return "Please enter a valid date.";
    if (date > now) return "Birth date cannot be in the future.";
    if (date.getFullYear() < 1900) return "Please enter a more recent year.";
    
    return null;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBirthDate(val);
    const err = validateDate(val);
    setError(err);
  };

  useEffect(() => {
    if (!birthDate || error) return;

    const calculate = () => {
      const now = new Date();
      const birth = new Date(birthDate);
      
      const diffMs = now.getTime() - birth.getTime();
      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      const totalWeeks = Math.floor(totalDays / 7);
      const totalMonths = Math.floor(totalDays / 30.44);

      // Breakdown
      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      let days = now.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      // Life Expectancy
      const totalLifeDays = LIFE_EXPECTANCY * 365.25;
      const daysLeft = Math.max(0, totalLifeDays - totalDays);
      const percentCompleted = (totalDays / totalLifeDays) * 100;
      const weekendsLeft = Math.floor(daysLeft / 7);
      
      // Next Birthday
      const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
      const nextBirthdayDays = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      // Milestone 10k
      const milestone10k = 10000 - totalDays;

      // Time with parents (Viral stat: 90% by 18)
      let timeWithParentsPercent = 90;
      if (years < 18) {
        timeWithParentsPercent = (years / 18) * 90;
      } else {
        // After 18, it's very slow
        timeWithParentsPercent = 90 + Math.min(9, (years - 18) * 0.2);
      }

      setStats({
        years, months, days, hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds(),
        totalDays, totalHours, totalMinutes, totalSeconds, totalWeeks, totalMonths,
        daysLeft, percentCompleted, weekendsLeft, nextBirthdayDays,
        milestone10kDays: milestone10k,
        timeWithParentsPercent,
        heartbeats: totalMinutes * AVG_HEART_RATE,
        breaths: totalMinutes * AVG_BREATH_RATE,
        blinks: totalMinutes * AVG_BLINK_RATE,
        sleepHours: totalDays * AVG_SLEEP_HOURS,
        caloriesBurned: totalDays * 2200, // Average
        waterConsumed: totalDays * AVG_WATER_LITERS,
        stepsWalked: totalDays * AVG_STEPS_PER_DAY,
        biologicalAge: years + (Math.random() * 2 - 1), // Mock variance
        phoneTimeHours: totalDays * AVG_PHONE_USE,
        scrolledKm: totalDays * AVG_SCROLL_KM_PER_DAY,
        notificationsReceived: totalDays * 65, // Average
        wordsTyped: totalDays * 2000,
        mealsEaten: totalDays * AVG_MEALS_PER_DAY,
        coffeeCups: totalDays * AVG_COFFEE_CUPS,
        laughs: totalDays * AVG_LAUGHS_PER_DAY,
        bathroomDays: totalDays * (AVG_BATHROOM_YEARS / LIFE_EXPECTANCY),
        earthCircuits: (totalDays * AVG_STEPS_PER_DAY * 0.0007) / 40075, // Steps to km to Earth circumference
        foodTons: (totalDays * 1.5) / 1000, // 1.5kg per day to tons
        moneyEarned: totalDays * 150, // Average daily income estimate
        hourlyValue: 25 // Mock
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [birthDate, error]);

  const generateAIInsight = async () => {
    if (!stats) return;
    setIsGeneratingInsight(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : undefined);
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined. Please set VITE_GEMINI_API_KEY in your environment.");
      }
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Based on these life stats for a ${stats.years} year old: 
        - Total Days: ${stats.totalDays}
        - Phone Time: ${Math.round(stats.phoneTimeHours)} hours
        - Sleep: ${Math.round(stats.sleepHours)} hours
        - Percent of life completed: ${Math.round(stats.percentCompleted)}%
        Provide 3 short, punchy, and slightly philosophical life insights or suggestions. Keep it under 100 words.`,
      });
      setAiInsight(response.text || "Time is the only currency you can't earn back. Spend it wisely.");
    } catch (err) {
      console.error(err);
      setAiInsight("Time is the only currency you can't earn back. Spend it wisely.");
    } finally {
      setIsGeneratingInsight(false);
    }
  };

  const chartData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Lived', value: stats.totalDays, fill: '#4f46e5' },
      { name: 'Remaining', value: stats.daysLeft, fill: '#e5e7eb' },
    ];
  }, [stats]);

  const timeBreakdownData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Sleep', hours: stats.sleepHours, fill: '#8b5cf6' },
      { name: 'Phone', hours: stats.phoneTimeHours, fill: '#ec4899' },
      { name: 'Other', hours: stats.totalHours - stats.sleepHours - stats.phoneTimeHours, fill: '#10b981' },
    ];
  }, [stats]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Advanced Life Analytics v2.0</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-tight"
          >
            Your Life in <span className="text-indigo-600">Numbers</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-gray-100"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  When were you born?
                </label>
                {error && <span className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</span>}
              </div>
              <div className="relative group">
                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-6 h-6" />
                <input
                  type="date"
                  value={birthDate}
                  onChange={handleDateChange}
                  className={cn(
                    "w-full pl-14 pr-6 py-5 bg-gray-50 border-2 rounded-2xl focus:ring-4 transition-all outline-none text-lg font-bold text-gray-900",
                    error ? "border-red-100 focus:ring-red-50" : "border-gray-100 focus:border-indigo-500 focus:ring-indigo-50"
                  )}
                />
              </div>
              {!birthDate && (
                <div className="flex items-center justify-center space-x-2 text-gray-400 py-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Section */}
      <AnimatePresence>
        {stats && !error && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="py-12 lg:py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
                <div>
                  <h2 className="text-4xl font-black text-gray-900 mb-2">Life Dashboard</h2>
                  <p className="text-gray-500 font-medium">Real-time analytics of your existence.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <RealTimeClock />
                  <ShareButton stats={stats} />
                  <button 
                    onClick={generateAIInsight}
                    disabled={isGeneratingInsight}
                    className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
                  >
                    <Brain className={cn("w-5 h-5", isGeneratingInsight && "animate-spin")} />
                    <span>{isGeneratingInsight ? 'Analyzing...' : 'Get AI Insights'}</span>
                  </button>
                </div>
              </div>

              {/* AI Insight Box */}
              {aiInsight && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-12 bg-gradient-to-r from-indigo-600 to-violet-600 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden"
                >
                  <Sparkles className="absolute top-4 right-4 w-12 h-12 opacity-20" />
                  <div className="flex items-start space-x-6 relative z-10">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Gemini Life Insights</h3>
                      <p className="text-indigo-50 leading-relaxed italic">"{aiInsight}"</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Top Level Visuals */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                  <LifeBattery percentage={stats.percentCompleted} />
                </div>
                <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                  <LifeClock24h age={stats.years} />
                </div>
                <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Life Progress Chart</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-8 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                      <span className="text-xs font-bold text-gray-500">Lived: {Math.round(stats.percentCompleted)}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-200 rounded-full" />
                      <span className="text-xs font-bold text-gray-500">Remaining: {Math.round(100 - stats.percentCompleted)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex overflow-x-auto pb-4 mb-8 space-x-4 no-scrollbar">
                {[
                  { id: 'overview', label: 'Overview', icon: Globe },
                  { id: 'health', label: 'Health & Body', icon: Heart },
                  { id: 'digital', label: 'Digital Life', icon: Smartphone },
                  { id: 'lifestyle', label: 'Lifestyle & Fun', icon: Smile },
                  { id: 'money', label: 'Money & Career', icon: DollarSign },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap border",
                      activeTab === tab.id 
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100" 
                        : "bg-white text-gray-500 border-gray-100 hover:border-indigo-200"
                    )}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {activeTab === 'overview' && (
                  <>
                    <StatCard icon={Clock} label="Total Days" value={stats.totalDays.toLocaleString()} subValue={`${stats.totalWeeks.toLocaleString()} weeks`} color="bg-indigo-600" />
                    <StatCard icon={Calendar} label="Days Left" value={stats.daysLeft.toLocaleString()} subValue="Based on 80y avg" color="bg-violet-600" />
                    <StatCard icon={Zap} label="10k Day Milestone" value={stats.milestone10kDays > 0 ? `${stats.milestone10kDays.toLocaleString()} left` : `${Math.abs(stats.milestone10kDays).toLocaleString()} ago`} color="bg-amber-500" />
                    <StatCard icon={Users} label="Time with Parents" value={`${Math.round(stats.timeWithParentsPercent)}%`} subValue="Cumulative lifetime total" color="bg-rose-500" />
                    <StatCard icon={Sun} label="Next Birthday" value={`${stats.nextBirthdayDays} days`} subValue="Until your next cycle" color="bg-orange-500" />
                    <StatCard icon={Moon} label="Weekends Left" value={stats.weekendsLeft.toLocaleString()} subValue="Make them count" color="bg-blue-600" />
                    <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Lifetime Time Allocation (Hours)</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={timeBreakdownData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#9ca3af' }} />
                            <YAxis hide />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="hours" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'health' && (
                  <>
                    <StatCard icon={Heart} label="Heartbeats" value={stats.heartbeats.toLocaleString()} color="bg-red-500" />
                    <StatCard icon={Wind} label="Breaths" value={stats.breaths.toLocaleString()} color="bg-blue-400" />
                    <StatCard icon={Zap} label="Calories Burned" value={stats.caloriesBurned.toLocaleString()} color="bg-orange-500" />
                    <StatCard icon={Utensils} label="Water Consumed" value={`${stats.waterConsumed.toLocaleString()} L`} color="bg-cyan-500" />
                    <StatCard icon={Footprints} label="Steps Walked" value={stats.stepsWalked.toLocaleString()} color="bg-emerald-500" />
                    <StatCard icon={Moon} label="Sleep Hours" value={stats.sleepHours.toLocaleString()} color="bg-indigo-900" />
                    <StatCard icon={TrendingUp} label="Biological Age" value={stats.biologicalAge.toFixed(1)} color="bg-lime-500" />
                    <StatCard icon={Eye} label="Eye Blinks" value={stats.blinks.toLocaleString()} color="bg-teal-500" />
                  </>
                )}

                {activeTab === 'digital' && (
                  <>
                    <StatCard icon={Smartphone} label="Phone Time" value={`${Math.round(stats.phoneTimeHours).toLocaleString()}h`} subValue={`${(stats.phoneTimeHours / 24).toFixed(1)} full days`} color="bg-pink-600" />
                    <StatCard icon={TrendingUp} label="Scrolled" value={`${stats.scrolledKm.toFixed(1)} km`} subValue="Distance on screen" color="bg-indigo-500" />
                    <StatCard icon={MessageSquare} label="Notifications" value={stats.notificationsReceived.toLocaleString()} color="bg-amber-500" />
                    <StatCard icon={BookOpen} label="Words Typed" value={stats.wordsTyped.toLocaleString()} color="bg-violet-600" />
                    <div className="md:col-span-4 bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100 flex items-center space-x-6">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        <Monitor className="text-indigo-600 w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-indigo-900">Digital Impact</h4>
                        <p className="text-indigo-700">You've spent approximately <span className="font-black">{(stats.phoneTimeHours / stats.totalHours * 100).toFixed(1)}%</span> of your waking life looking at a phone screen.</p>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'lifestyle' && (
                  <>
                    <StatCard icon={Utensils} label="Meals Eaten" value={stats.mealsEaten.toLocaleString()} color="bg-orange-600" />
                    <StatCard icon={Coffee} label="Coffee Cups" value={stats.coffeeCups.toLocaleString()} color="bg-amber-900" />
                    <StatCard icon={Smile} label="Laughs" value={stats.laughs.toLocaleString()} color="bg-yellow-500" />
                    <StatCard icon={Home} label="Bathroom Time" value={`${Math.round(stats.bathroomDays)} days`} color="bg-gray-400" />
                    <StatCard icon={Globe} label="Earth Circuits" value={stats.earthCircuits.toFixed(2)} subValue="Distance walked" color="bg-emerald-600" />
                    <StatCard icon={Trash2} label="Food Consumed" value={`${stats.foodTons.toFixed(2)} tons`} color="bg-rose-700" />
                    <StatCard icon={Handshake} label="Hugs Given" value={(stats.totalDays * 2).toLocaleString()} color="bg-pink-400" />
                    <StatCard icon={Music} label="Music Listened" value={`${Math.round(stats.totalHours * 0.15).toLocaleString()}h`} color="bg-purple-600" />
                  </>
                )}

                {activeTab === 'money' && (
                  <>
                    <StatCard icon={DollarSign} label="Money Earned" value={`$${stats.moneyEarned.toLocaleString()}`} subValue="Lifetime estimate" color="bg-green-600" />
                    <StatCard icon={Clock} label="Hourly Life Value" value={`$${stats.hourlyValue}/hr`} color="bg-indigo-600" />
                    <StatCard icon={Briefcase} label="Work Hours" value={Math.round(stats.totalHours * 0.2).toLocaleString()} color="bg-blue-700" />
                    <StatCard icon={TrendingUp} label="Earning Projection" value={`$${(stats.moneyEarned * 2.5).toLocaleString()}`} subValue="By age 65" color="bg-emerald-500" />
                  </>
                )}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Blog Teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">Life Insights</h2>
              <p className="text-gray-600 font-medium">Explore the science and philosophy of time.</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center space-x-2 text-indigo-600 font-bold hover:underline">
              <span>View all articles</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post, idx) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
              >
                <div className="h-56 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${post.slug}/800/600`} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black text-indigo-600 shadow-sm">
                      {post.tags[0]}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">{post.date}</p>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-8 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-2 text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors"
                  >
                    <span>Read Full Story</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-indigo-200 rotate-3">
            <Info className="text-white w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 mb-8">About LifeStats</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 font-medium">
            LifeStats is a sophisticated analytical tool designed to provide a new perspective on our most precious resource: time. 
            By quantifying the biological, digital, and lifestyle rhythms of our existence, we aim to foster mindfulness and intentionality in every moment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-4xl font-black text-indigo-600 mb-2">1.2M+</p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Calculations</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-4xl font-black text-violet-600 mb-2">150+</p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Countries</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <p className="text-4xl font-black text-pink-600 mb-2">4.9/5</p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <SEOContent />
    </div>
  );
};

const BlogListPage = () => {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Insights & Stories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Deep dives into the science of longevity, the philosophy of time, and the data that defines our lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <Link 
              key={post.slug} 
              to={`/blog/${post.slug}`}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="h-64 bg-gray-200 relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${post.slug}/800/600`} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed font-medium">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-black mb-6">Post Not Found</h1>
        <Link to="/blog" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold flex items-center space-x-2 shadow-lg shadow-indigo-100">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center space-x-2 text-sm font-black text-indigo-600 mb-16 hover:-translate-x-2 transition-transform">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to all articles</span>
        </Link>

        <header className="mb-16">
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-8 font-bold uppercase tracking-widest">
            <span>{post.date}</span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
            <span className="text-indigo-600">{post.tags.join(', ')}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-10 leading-[1.1]">
            {post.title}
          </h1>
          <div className="flex items-center space-x-5 p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Clock className="text-white w-7 h-7" />
            </div>
            <div>
              <p className="text-lg font-black text-gray-900">LifeStats Editorial</p>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Data & Science Desk</p>
            </div>
          </div>
        </header>

        <div className="aspect-[16/9] rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
          <img 
            src={`https://picsum.photos/seed/${post.slug}/1200/800`} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-indigo prose-xl max-w-none text-gray-600 leading-relaxed font-medium">
          {post.content.split('\n').map((para, i) => {
            if (para.startsWith('# ')) return <h1 key={i} className="text-4xl font-black text-gray-900 mt-16 mb-8 leading-tight">{para.replace('# ', '')}</h1>;
            if (para.startsWith('## ')) return <h2 key={i} className="text-3xl font-black text-gray-900 mt-14 mb-6 leading-tight">{para.replace('## ', '')}</h2>;
            if (para.startsWith('### ')) return <h3 key={i} className="text-2xl font-black text-gray-900 mt-12 mb-5 leading-tight">{para.replace('### ', '')}</h3>;
            if (para.startsWith('- ')) return <li key={i} className="ml-6 mb-4 list-disc marker:text-indigo-600">{para.replace('- ', '')}</li>;
            if (para.startsWith('1. ')) return <li key={i} className="ml-6 mb-4 list-decimal marker:text-indigo-600 marker:font-black">{para.replace('1. ', '')}</li>;
            if (para.trim() === '') return <div key={i} className="h-4" />;
            return <p key={i} className="mb-8">{para}</p>;
          })}
        </div>

        {/* Try your Life Stats CTA */}
        <div className="mt-20 p-12 bg-indigo-600 rounded-[3rem] text-white text-center shadow-2xl shadow-indigo-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          
          <h2 className="text-3xl lg:text-4xl font-black mb-6 relative z-10">Ready to see your own numbers?</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto font-medium relative z-10">
            Calculate your heartbeats, breaths, and time left in seconds. It only takes a moment to get your full life report.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-3 bg-white text-indigo-600 px-10 py-5 rounded-full font-black text-xl hover:bg-indigo-50 transition-all shadow-xl hover:scale-105 active:scale-95 relative z-10"
          >
            <span>Try your Life Stats</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-3 bg-gray-900 text-white px-8 py-4 rounded-full font-black hover:bg-indigo-600 transition-all shadow-xl shadow-gray-200">
              <Share2 className="w-5 h-5" />
              <span>Share Article</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-black text-gray-400 uppercase tracking-widest">#{tag.toLowerCase()}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

// --- Main App ---

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
