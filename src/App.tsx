/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Heart, 
  Footprints, 
  Utensils, 
  Moon, 
  Smartphone, 
  Eye, 
  Clock, 
  Share2, 
  ChevronDown, 
  ChevronUp,
  Info,
  TrendingUp,
  Award,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link } from 'react-router-dom';

// --- Types ---

interface LifeStats {
  days: number;
  weeks: number;
  months: number;
  years: number;
  hours: number;
  minutes: number;
  seconds: number;
  heartbeats: number;
  blinks: number;
  steps: number;
  meals: number;
  sleepHours: number;
  phoneHours: number;
}

interface FutureDate {
  label: string;
  date: Date;
  daysRemaining: number;
}

// --- Constants ---

const AVG_SLEEP_PER_DAY = 8;
const AVG_MEALS_PER_DAY = 3;
const AVG_STEPS_PER_DAY = 5000;
const AVG_BLINKS_PER_MIN = 15;
const AVG_HEART_RATE_MALE = 70;
const AVG_HEART_RATE_FEMALE = 75;
const AVG_LIFESPAN_DAYS = 27375; // ~75 years

// --- Components ---

const StatCard = ({ icon: Icon, label, value, unit, color }: { icon: any, label: string, value: string | number, unit?: string, color: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
  >
    <div className={`p-3 rounded-xl ${color} mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <span className="text-slate-500 text-sm font-medium mb-1">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      {unit && <span className="text-slate-400 text-xs">{unit}</span>}
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-semibold text-slate-800 hover:text-indigo-600 transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group">
    <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">{date}</span>
    <h3 className="text-xl font-bold text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
    <p className="text-slate-600 mt-3 text-sm line-clamp-2">{excerpt}</p>
    <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm">
      Read More <TrendingUp className="w-4 h-4 ml-1" />
    </div>
  </div>
);

// --- Main App Components ---

const BlogPage = () => {
  const allPosts = [
    {
      date: "March 15, 2026",
      title: "How Many Seconds Have You Been Alive?",
      excerpt: "Time flies! Discover the exact breakdown of your life in seconds and why tracking time milestones can change your perspective on life."
    },
    {
      date: "March 10, 2026",
      title: "The Science of Heartbeats",
      excerpt: "Your heart is a tireless engine. Learn how many times it beats in a day, a year, and a full lifetime based on your fitness level."
    },
    {
      date: "March 5, 2026",
      title: "How Much Time Do We Spend Sleeping?",
      excerpt: "If you live to 75, you'll spend nearly 25 years in bed. Explore the fascinating statistics of human sleep and its impact on longevity."
    },
    {
      date: "February 28, 2026",
      title: "The Impact of Screen Time on Longevity",
      excerpt: "Modern life is digital. We analyze how excessive phone usage affects your biological age and what you can do to reverse the effects."
    },
    {
      date: "February 20, 2026",
      title: "Walking Your Way to a Longer Life",
      excerpt: "10,000 steps is the goal, but what does the data say? We look at the correlation between daily movement and life expectancy."
    },
    {
      date: "February 12, 2026",
      title: "Nutrition Milestones: 80,000 Meals Later",
      excerpt: "By the time you reach middle age, you've eaten tens of thousands of meals. How each one contributes to your overall life stats."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-indigo-600 font-bold mb-12 hover:text-indigo-700 transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Calculator
        </Link>
        
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Life Statistics Blog</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Deep dives into the numbers that define our existence, from biological rhythms to modern lifestyle habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post, index) => (
            <BlogCard key={index} title={post.title} excerpt={post.excerpt} date={post.date} />
          ))}
        </div>
      </div>
    </div>
  );
};

function HomePage() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [phoneUsage, setPhoneUsage] = useState<number>(4);
  const [showResults, setShowResults] = useState(false);

  const stats = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const now = new Date();
    const diffMs = now.getTime() - birth.getTime();

    if (diffMs < 0) return null;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.4375);
    const years = Math.floor(days / 365.25);

    const bpm = gender === 'male' ? AVG_HEART_RATE_MALE : AVG_HEART_RATE_FEMALE;

    return {
      days,
      weeks,
      months,
      years,
      hours,
      minutes,
      seconds,
      heartbeats: minutes * bpm,
      blinks: minutes * AVG_BLINKS_PER_MIN,
      steps: days * AVG_STEPS_PER_DAY,
      meals: days * AVG_MEALS_PER_DAY,
      sleepHours: days * AVG_SLEEP_PER_DAY,
      phoneHours: days * phoneUsage
    };
  }, [birthDate, gender, phoneUsage]);

  const futureDates = useMemo(() => {
    if (!birthDate) return [];
    const birth = new Date(birthDate);
    const now = new Date();

    const dates: FutureDate[] = [];

    // 10,000 days
    const d10k = new Date(birth.getTime() + 10000 * 24 * 60 * 60 * 1000);
    if (d10k > now) {
      dates.push({ label: '10,000 Days Old', date: d10k, daysRemaining: Math.ceil((d10k.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)) });
    }

    // 1 Billion seconds
    const s1b = new Date(birth.getTime() + 1000000000 * 1000);
    if (s1b > now) {
      dates.push({ label: '1 Billion Seconds Old', date: s1b, daysRemaining: Math.ceil((s1b.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)) });
    }

    // Next Birthday
    let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }
    dates.push({ label: 'Next Birthday', date: nextBday, daysRemaining: Math.ceil((nextBday.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)) });

    // Age in 2050
    const d2050 = new Date(2050, 0, 1);
    const age2050 = 2050 - birth.getFullYear();
    dates.push({ label: `Age in 2050: ${age2050}`, date: d2050, daysRemaining: Math.ceil((d2050.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)) });

    return dates;
  }, [birthDate]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a Life Stats Calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A Life Stats Calculator estimates fun statistics about your life such as how many days you have lived, seconds alive, heartbeats, steps walked, and more based on your birth date."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is the calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The calculator uses average human statistics such as average heart rate, sleep hours, and daily steps. These numbers provide fun and educational estimates."
        }
      },
      {
        "@type": "Question",
        "name": "How can I calculate my age in seconds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply enter your birth date into the calculator, and it will instantly provide your age in seconds, minutes, hours, days, weeks, months, and years."
        }
      },
      {
        "@type": "Question",
        "name": "How many heartbeats happen in a lifetime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An average human heart beats around 2.5–3 billion times during a lifetime of 70-80 years."
        }
      }
    ]
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) setShowResults(true);
  };

  const formatNum = (num: number) => new Intl.NumberFormat().format(num);

  const handleShare = async () => {
    if (!stats) return;
    const shareText = `My Life Stats so far:
❤️ ${formatNum(stats.heartbeats)} heartbeats
👣 ${formatNum(stats.steps)} steps walked
🌙 ${formatNum(stats.sleepHours)} hours of sleep
📅 ${formatNum(stats.days)} days alive

Check yours at: ${window.location.href}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Life Stats',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Stats copied to clipboard!');
    }
  };

  const ComparisonCard = ({ icon: Icon, label, current, total, unit, color, iconBg }: { icon: any, label: string, current: number, total: number, unit: string, color: string, iconBg: string }) => {
    const percentage = Math.min((current / total) * 100, 100);
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileHover={{ y: -8, scale: 1.02 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-indigo-200/40 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[280px]"
      >
        {/* Decorative Background Glow */}
        <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full ${iconBg} opacity-[0.06] blur-[60px] group-hover:opacity-[0.12] transition-opacity duration-700`} />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-2xl ${iconBg} text-white shadow-lg transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-500`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">{percentage.toFixed(1)}%</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Journey</div>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</h4>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {formatNum(Math.floor(current))}
              </div>
              <div className="text-base font-bold text-slate-400">{unit}</div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 space-y-4">
          <div className="relative">
            <div className="h-8 bg-slate-50/50 rounded-2xl overflow-hidden p-1 border border-slate-100 shadow-inner backdrop-blur-sm">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 2.5, ease: [0.34, 1.56, 0.64, 1] }}
                className={`h-full rounded-xl ${color} shadow-md relative group-hover:brightness-110 transition-all`}
              >
                {/* Animated Shine Effect */}
                <motion.div 
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3 skew-x-12"
                />
              </motion.div>
            </div>
            {/* Percentage Tooltip on Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, left: `${percentage}%` }}
              className="absolute -top-8 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-2xl z-20"
            >
              {percentage.toFixed(0)}%
            </motion.div>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-slate-100/50">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Avg Goal</span>
              <span className="text-xs font-bold text-slate-700">{formatNum(total)} {unit}</span>
            </div>
            <div className="h-7 w-7 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
              <TrendingUp className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const PredictionCard = ({ label, date, subtext, icon: Icon, color, bg }: { label: string, date: string, subtext: string, icon: any, color: string, bg: string }) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`${bg} p-8 rounded-3xl border border-white/50 shadow-sm hover:shadow-lg transition-all flex flex-col h-full`}
    >
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-6 text-white shadow-lg shadow-current/20`}>
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</h4>
      <div className="text-2xl font-black text-slate-900 leading-tight mb-auto">{date}</div>
      <div className="mt-6 pt-4 border-t border-slate-200/50">
        <div className="text-xs font-bold text-indigo-600 bg-indigo-50/50 inline-flex items-center gap-2 px-3 py-1.5 rounded-full">
          <Clock className="w-3 h-3" /> {subtext}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Header / SEO Section */}
      <header className="bg-white border-b border-slate-200 pt-12 pb-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            Life Stats Calculator
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            The <strong>Life Stats Calculator</strong> helps you discover interesting statistics about your life. 
            Calculate how many <strong>days, seconds, minutes, and hours you have been alive</strong> instantly.
          </motion.p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Tool Section */}
        <section className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-16">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" /> Birth Date
                </label>
                <input 
                  type="date" 
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" /> Gender
                </label>
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-500" /> Daily Phone Usage (Hours)
              </label>
              <input 
                type="range" 
                min="0" 
                max="24" 
                step="0.5"
                value={phoneUsage}
                onChange={(e) => setPhoneUsage(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>0h</span>
                <span className="text-indigo-600 font-bold">{phoneUsage} hours</span>
                <span>24h</span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              Calculate My Life Stats
            </button>
          </form>
        </section>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && stats && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              {/* Life Progress Overview */}
              <section className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 text-white overflow-hidden relative shadow-2xl shadow-indigo-900/20"
                >
                  {/* Background Accents */}
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-3 py-1.5 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest">
                        <Award className="w-3.5 h-3.5" /> Global Comparison
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black tracking-tighter leading-tight">
                        You've completed <span className="text-indigo-400">{((stats.days / 29220) * 100).toFixed(1)}%</span> of an average life.
                      </h2>
                      <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl">
                        Based on the global average life expectancy of 80 years, you have approximately 
                        <span className="text-white font-bold"> {formatNum(Math.max(0, 29220 - stats.days))} days</span> remaining to make your mark.
                      </p>
                      <div className="flex flex-wrap gap-5 pt-2">
                        <div className="flex flex-col">
                          <span className="text-2xl font-black text-white">{formatNum(stats.years)}</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Years Lived</span>
                        </div>
                        <div className="w-px h-10 bg-slate-800 hidden sm:block" />
                        <div className="flex flex-col">
                          <span className="text-2xl font-black text-indigo-400">{formatNum(Math.max(0, 80 - stats.years))}</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Years Remaining*</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex justify-center">
                      {/* Circular Progress Visualization */}
                      <div className="relative w-48 h-48 md:w-64 md:h-64">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            className="stroke-slate-800 fill-none"
                            strokeWidth="10"
                          />
                          <motion.circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            className="stroke-indigo-500 fill-none"
                            strokeWidth="10"
                            strokeDasharray="100 100"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 100 - Math.min((stats.days / 29220) * 100, 100) }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-3xl md:text-4xl font-black tracking-tighter">
                            {((stats.days / 29220) * 100).toFixed(0)}%
                          </span>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">
                            Life Progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <p className="text-[10px] text-slate-400 mt-4 text-center italic">
                  *Based on global average life expectancy of 80 years (29,220 days). Individual results vary.
                </p>
              </section>

              {/* Global Comparison Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-indigo-100 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Global Life Comparison</h2>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Info className="w-4 h-4" /> Based on 80 Year Avg
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ComparisonCard 
                    icon={Calendar}
                    label="Days Alive" 
                    current={stats.days} 
                    total={29220}
                    unit="Days" 
                    color="bg-indigo-500" 
                    iconBg="bg-indigo-500"
                  />
                  <ComparisonCard 
                    icon={Heart}
                    label="Heartbeats" 
                    current={stats.heartbeats} 
                    total={3000000000}
                    unit="Beats" 
                    color="bg-rose-500" 
                    iconBg="bg-rose-500"
                  />
                  <ComparisonCard 
                    icon={Footprints}
                    label="Steps Walked" 
                    current={stats.steps} 
                    total={146100000}
                    unit="Steps" 
                    color="bg-emerald-500" 
                    iconBg="bg-emerald-500"
                  />
                  <ComparisonCard 
                    icon={Moon}
                    label="Sleep Time" 
                    current={stats.sleepHours} 
                    total={233760}
                    unit="Hours" 
                    color="bg-slate-800" 
                    iconBg="bg-slate-800"
                  />
                </div>
              </div>

              {/* Stats Grids */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-indigo-500" /> Core Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard icon={Calendar} label="Days Alive" value={formatNum(stats.days)} color="bg-indigo-500" />
                    <StatCard icon={Clock} label="Weeks Alive" value={formatNum(stats.weeks)} color="bg-blue-500" />
                    <StatCard icon={Calendar} label="Months Alive" value={formatNum(stats.months)} color="bg-violet-500" />
                    <StatCard icon={Calendar} label="Years Alive" value={formatNum(stats.years)} color="bg-purple-500" />
                    <StatCard icon={Clock} label="Hours Alive" value={formatNum(stats.hours)} color="bg-sky-500" />
                    <StatCard icon={Clock} label="Minutes Alive" value={formatNum(stats.minutes)} color="bg-cyan-500" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-rose-500" /> Body & Lifestyle
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard icon={Heart} label="Heartbeats" value={formatNum(stats.heartbeats)} color="bg-rose-500" />
                    <StatCard icon={Eye} label="Blinks" value={formatNum(stats.blinks)} color="bg-orange-500" />
                    <StatCard icon={Footprints} label="Steps Walked" value={formatNum(stats.steps)} color="bg-emerald-500" />
                    <StatCard icon={Utensils} label="Meals Eaten" value={formatNum(stats.meals)} color="bg-amber-600" />
                    <StatCard icon={Moon} label="Sleep Hours" value={formatNum(stats.sleepHours)} color="bg-indigo-800" />
                    <StatCard icon={Smartphone} label="Phone Time" value={formatNum(stats.phoneHours)} unit="hrs" color="bg-slate-700" />
                  </div>
                </div>
              </div>

              {/* Fun Predictions Section */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-indigo-500" /> Fun Predictions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Next Birthday */}
                  {(() => {
                    const birth = new Date(birthDate);
                    const now = new Date();
                    let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
                    if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
                    const days = Math.ceil((nextBday.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
                    return (
                      <PredictionCard 
                        icon={Calendar}
                        label="Next Birthday"
                        date={nextBday.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        subtext={`In ${days} days`}
                        color="bg-indigo-500"
                        bg="bg-white"
                      />
                    );
                  })()}

                  {/* 1 Billion Seconds */}
                  {(() => {
                    const birth = new Date(birthDate);
                    const s1b = new Date(birth.getTime() + 1000000000 * 1000);
                    const now = new Date();
                    const diff = Math.ceil((s1b.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
                    return (
                      <PredictionCard 
                        icon={Clock}
                        label="1 Billion Seconds Age"
                        date={s1b.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        subtext={diff > 0 ? `In ${formatNum(diff)} days` : 'Already passed!'}
                        color="bg-amber-500"
                        bg="bg-amber-50/30"
                      />
                    );
                  })()}

                  {/* Age in 2030 */}
                  <PredictionCard 
                    icon={TrendingUp}
                    label="Age in 2030"
                    date={`${2030 - new Date(birthDate).getFullYear()} Years Old`}
                    subtext="January 1st, 2030"
                    color="bg-emerald-500"
                    bg="bg-white"
                  />

                  {/* Age in 2040 */}
                  <PredictionCard 
                    icon={TrendingUp}
                    label="Age in 2040"
                    date={`${2040 - new Date(birthDate).getFullYear()} Years Old`}
                    subtext="January 1st, 2040"
                    color="bg-blue-500"
                    bg="bg-white"
                  />

                  {/* Age in 2050 */}
                  <PredictionCard 
                    icon={TrendingUp}
                    label="Age in 2050"
                    date={`${2050 - new Date(birthDate).getFullYear()} Years Old`}
                    subtext="January 1st, 2050"
                    color="bg-purple-500"
                    bg="bg-white"
                  />

                  {/* 10,000 Days */}
                  {(() => {
                    const birth = new Date(birthDate);
                    const d10k = new Date(birth.getTime() + 10000 * 24 * 60 * 60 * 1000);
                    const now = new Date();
                    const diff = Math.ceil((d10k.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
                    return (
                      <PredictionCard 
                        icon={Award}
                        label="10,000 Days Age"
                        date={d10k.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        subtext={diff > 0 ? `In ${formatNum(diff)} days` : 'Already passed!'}
                        color="bg-rose-500"
                        bg="bg-rose-50/30"
                      />
                    );
                  })()}
                </div>
              </div>

              {/* Share Section */}
              <div className="flex flex-col items-center gap-6 py-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="p-4 bg-indigo-50 rounded-2xl">
                  <Share2 className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Share Your Life Journey</h3>
                  <p className="text-slate-500 font-medium max-w-md mx-auto px-6">
                    Inspire others by sharing your unique life milestones and statistics with your friends and family.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 px-6">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all"
                  >
                    <Share2 className="w-5 h-5" /> Share Full Stats
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const shareText = `My Life Stats so far: ${formatNum(stats.heartbeats)} heartbeats and ${formatNum(stats.steps)} steps! Check yours at ${window.location.href}`;
                      navigator.clipboard.writeText(shareText);
                      alert('Summary copied to clipboard!');
                    }}
                    className="flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all"
                  >
                    Copy Summary
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ Section */}
        <section className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <FAQItem 
              question="What is a Life Stats Calculator?" 
              answer="A Life Stats Calculator estimates fun statistics about your life such as how many days you have lived, seconds alive, heartbeats, steps walked, and more based on your birth date." 
            />
            <FAQItem 
              question="How accurate is the calculator?" 
              answer="The calculator uses average human statistics such as average heart rate (70-75 bpm), sleep hours (8h/day), and daily steps (5000). These numbers provide fun and educational estimates rather than medical precision." 
            />
            <FAQItem 
              question="Can I calculate my age in seconds?" 
              answer="Yes! Enter your birth date and the tool will instantly calculate your age in seconds, minutes, hours, days, weeks, months, and years." 
            />
            <FAQItem 
              question="How many heartbeats happen in a lifetime?" 
              answer="An average human heart beats around 2.5–3 billion times during a lifetime, depending on lifespan and average heart rate." 
            />
          </div>
        </section>

        {/* Blog Section */}
        <section className="mt-24">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl font-bold text-slate-900 text-center md:text-left">Explore More Life Statistics</h2>
            <Link 
              to="/blog" 
              className="bg-white border border-slate-200 px-8 py-3 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm"
            >
              All Blog Post
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard 
              date="March 15, 2026"
              title="How Many Seconds Have You Been Alive?"
              excerpt="Time flies! Discover the exact breakdown of your life in seconds and why tracking time milestones can change your perspective on life."
            />
            <BlogCard 
              date="March 10, 2026"
              title="The Science of Heartbeats"
              excerpt="Your heart is a tireless engine. Learn how many times it beats in a day, a year, and a full lifetime based on your fitness level."
            />
            <BlogCard 
              date="March 5, 2026"
              title="How Much Time Do We Spend Sleeping?"
              excerpt="If you live to 75, you'll spend nearly 25 years in bed. Explore the fascinating statistics of human sleep and its impact on longevity."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 mt-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Life Stats Calculator</h2>
            <p className="max-w-md">
              Discover amazing statistics about your life. Find your days alive, seconds alive, heartbeats, steps walked, sleep hours, and more instantly.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Age Calculator</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Birthday Countdown</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Seconds Alive Tool</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Life Expectancy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} Life Stats Calculator. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
    </Routes>
  );
}
