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
  Dumbbell,
  Instagram,
  Plus,
  History,
  Award
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
import Markdown from 'react-markdown';
import { BLOG_POSTS } from './blogData';
import { CustomEarningsCalculator } from './components/CustomEarningsCalculator';

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

const PREDEFINED_GIANTS = [
  {
    id: 'einstein',
    name: 'Albert Einstein',
    type: 'historical',
    birthDate: '1879-03-14',
    deathDate: '1955-04-18',
    description: 'Theoretical physicist who developed the theory of relativity.',
    iconName: 'Brain',
    achievements: [
      { age: 5, title: 'The Compass Wonder', description: 'His father showed him a pocket compass; he realized something in empty space was moving the needle.' },
      { age: 17, title: 'Zurich Polytechnic', description: 'Admitted to the mathematics and physics teaching diploma program.' },
      { age: 26, title: 'Miracle Year (Annus Mirabilis)', description: 'Published 4 groundbreaking papers including Special Relativity and E=mc².' },
      { age: 42, title: 'Nobel Prize in Physics', description: 'Awarded the Nobel Prize for his explanation of the photoelectric effect.' },
      { age: 76, title: 'Eternal Legacy', description: 'Passed away at age 76, leaving behind an unmatched scientific heritage.' }
    ]
  },
  {
    id: 'mozart',
    name: 'Wolfgang Amadeus Mozart',
    type: 'historical',
    birthDate: '1756-01-27',
    deathDate: '1791-12-05',
    description: 'Prodigious composer of the classical era who created over 800 works.',
    iconName: 'Music',
    achievements: [
      { age: 5, title: 'First Composition', description: 'Wrote his earliest musical compositions, showing incredible prodigy.' },
      { age: 8, title: 'First Symphony', description: 'Composed his very first symphony (Symphony No. 1 in E-flat major).' },
      { age: 14, title: 'Papal Knight', description: 'Appointed a papal knight of the Golden Spur by Pope Clement XIV in Rome.' },
      { age: 25, title: 'Vienna Relocation', description: 'Moved to Vienna as an independent composer, embarking on his mature masterpiece era.' },
      { age: 35, title: 'The Requiem & Passing', description: 'Composed The Magic Flute and parts of his Requiem before passing away.' }
    ]
  },
  {
    id: 'lovelace',
    name: 'Ada Lovelace',
    type: 'historical',
    birthDate: '1815-12-10',
    deathDate: '1852-11-27',
    description: 'Mathematician widely regarded as the first computer programmer.',
    iconName: 'Monitor',
    achievements: [
      { age: 12, title: 'Designed Flying Machine', description: 'Studied bird anatomy and materials to construct a flight mechanism.' },
      { age: 17, title: 'Met Charles Babbage', description: 'Introduced to Babbage and his Difference Engine, sparking a lifelong partnership.' },
      { age: 27, title: 'First Computer Algorithm', description: 'Wrote extensive notes on the Analytical Engine, containing the first computer algorithm.' },
      { age: 36, title: 'Early Passing', description: 'Passed away at age 36, leaving behind pioneering computation theories.' }
    ]
  },
  {
    id: 'jobs',
    name: 'Steve Jobs',
    type: 'historical',
    birthDate: '1955-02-24',
    deathDate: '2011-10-05',
    description: 'Co-founder of Apple Inc. and visionary pioneer of personal computing.',
    iconName: 'Smartphone',
    achievements: [
      { age: 13, title: 'Hewlett-Packard Call', description: 'Called Bill Hewlett directly to ask for parts, and was offered a summer internship.' },
      { age: 21, title: 'Co-founded Apple', description: 'Started Apple Computer with Steve Wozniak in his family garage.' },
      { age: 25, title: 'IPO Success', description: 'Apple went public, putting Jobs\'s net worth at over $250 million.' },
      { age: 30, title: 'NeXT & Pixar', description: 'Ousted from Apple, he went on to found NeXT and fund Pixar Animation Studios.' },
      { age: 42, title: 'Returned to Apple', description: 'Returned as CEO, launching the iMac and setting Apple\'s path to tech dominance.' },
      { age: 52, title: 'The iPhone Debut', description: 'Introduced the revolutionary iPhone, reshaping global telecommunications.' }
    ]
  },
  {
    id: 'curie',
    name: 'Marie Curie',
    type: 'historical',
    birthDate: '1867-11-07',
    deathDate: '1934-07-04',
    description: 'Physicist and chemist who conducted pioneering research on radioactivity.',
    iconName: 'Sparkles',
    achievements: [
      { age: 24, title: 'Moved to Paris', description: 'Enrolled at the Faculty of Sciences at the Sorbonne to study physics and math.' },
      { age: 31, title: 'Discovered Radioactive Elements', description: 'Isolated Polonium and Radium alongside her husband Pierre.' },
      { age: 36, title: 'First Nobel Prize', description: 'Received the Nobel Prize in Physics, becoming the first woman to win one.' },
      { age: 44, title: 'Second Nobel Prize', description: 'Won the Nobel Prize in Chemistry, becoming the first person to win two Nobel Prizes.' }
    ]
  },
  {
    id: 'harrypotter',
    name: 'Harry Potter',
    type: 'fictional',
    birthDate: '1980-07-31',
    description: 'The Boy Who Lived, hero of the Wizarding World.',
    iconName: 'Zap',
    achievements: [
      { age: 11, title: 'Discovered Magic', description: 'Received his Hogwarts letter and learned he was a wizard.' },
      { age: 12, title: 'Slew the Basilisk', description: 'Saved Hogwarts by destroying Tom Riddle\'s diary and slaying the basilisk.' },
      { age: 14, title: 'Triwizard Tournament', description: 'Competed in and survived the dangerous Triwizard Tournament.' },
      { age: 17, title: 'Defeated Voldemort', description: 'Destroyed the remaining Horcruxes and defeated the Dark Lord in the Battle of Hogwarts.' },
      { age: 37, title: 'Head Auror', description: 'Rose to become Head of the Auror Office, protecting the magic world.' }
    ]
  },
  {
    id: 'batman',
    name: 'Bruce Wayne (Batman)',
    type: 'fictional',
    birthDate: '1939-05-27',
    description: 'The Dark Knight, billionaire philanthropist turned Gotham’s protector.',
    iconName: 'Moon',
    achievements: [
      { age: 8, title: 'The Oath', description: 'Witnessed his parents\' murder in Crime Alley, swearing an oath of justice.' },
      { age: 18, title: 'Global Training', description: 'Left Gotham to travel the world, mastering martial arts, criminology, and science.' },
      { age: 25, title: 'Became Batman', description: 'Returned to Gotham and adopted the bat persona to strike fear in criminals.' },
      { age: 30, title: 'Founded Justice League', description: 'Co-founded the world\'s premiere team of superheroes to defend the planet.' }
    ]
  },
  {
    id: 'barbie',
    name: 'Barbie Roberts',
    type: 'fictional',
    birthDate: '1959-03-09',
    description: 'Global icon with over 200 careers, proving you can be anything.',
    iconName: 'Smile',
    achievements: [
      { age: 1, title: 'Toy Fair Debut', description: 'Made her first official public appearance, instantly taking the world by storm.' },
      { age: 6, title: 'Astronaut Barbie', description: 'Went to space years before Apollo 11 landed on the moon.' },
      { age: 30, title: 'UNICEF Ambassador', description: 'Partnered with UNICEF to advocate for children\'s rights and education globally.' },
      { age: 33, title: 'Ran for President', description: 'Launched her first presidential campaign, encouraging leadership in girls.' }
    ]
  }
];

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
          <h4 className="font-semibold text-gray-900 mb-6">Contact & Social</h4>
          <div className="flex flex-col space-y-4">
            <a 
              href="mailto:devzonik@gmail.com" 
              className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">devzonik@gmail.com</span>
            </a>
            <a 
              href="https://www.instagram.com/devzonik/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">@devzonik</span>
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

interface GiantsComparisonProps {
  stats: LifeStats;
  birthDate: string;
  currentTime: Date;
}

const GiantsComparison = ({ stats, birthDate, currentTime }: GiantsComparisonProps) => {
  const [selectedFigureId, setSelectedFigureId] = useState('einstein');
  const [customFigures, setCustomFigures] = useState<any[]>(() => {
    const saved = localStorage.getItem('life_stats_custom_giants');
    return saved ? JSON.parse(saved) : [];
  });

  // Toggle state for custom figure form
  const [isAdding, setIsAdding] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customBirth, setCustomBirth] = useState('');
  const [customDeath, setCustomDeath] = useState('');
  const [customIsFictional, setCustomIsFictional] = useState(false);
  const [customDesc, setCustomDesc] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // AI Comparison states
  const [aiCompareText, setAiCompareText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Clear AI text when selection changes
  useEffect(() => {
    setAiCompareText(null);
    setAiError(null);
  }, [selectedFigureId]);

  // Combined list of figures
  const allFigures = useMemo(() => {
    return [...PREDEFINED_GIANTS, ...customFigures];
  }, [customFigures]);

  // Selected figure
  const figure = useMemo(() => {
    return allFigures.find(f => f.id === selectedFigureId) || PREDEFINED_GIANTS[0];
  }, [allFigures, selectedFigureId]);

  // Handle adding custom figure
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customName.trim()) {
      setFormError("Please enter a name.");
      return;
    }
    if (!customBirth) {
      setFormError("Please select a birth date.");
      return;
    }

    const birth = new Date(customBirth);
    const now = new Date();
    if (isNaN(birth.getTime())) {
      setFormError("Please select a valid birth date.");
      return;
    }
    if (birth > now) {
      setFormError("Birth date cannot be in the future.");
      return;
    }

    let deathDate: string | undefined = undefined;
    if (customDeath) {
      const death = new Date(customDeath);
      if (isNaN(death.getTime())) {
        setFormError("Please enter a valid death date or leave blank.");
        return;
      }
      if (death < birth) {
        setFormError("Death date cannot be before birth date.");
        return;
      }
      if (death > now) {
        setFormError("Death date cannot be in the future.");
        return;
      }
      deathDate = customDeath;
    }

    const newFig = {
      id: 'custom_' + Date.now(),
      name: customName,
      type: customIsFictional ? 'fictional' : 'historical',
      birthDate: customBirth,
      deathDate,
      description: customDesc || (customIsFictional ? 'A captivating fictional character.' : 'A remarkable historical figure.'),
      iconName: customIsFictional ? 'Smile' : 'Users',
      achievements: [
        { age: 1, title: 'Beginnings', description: 'Began their unique and inspiring journey.' },
        { age: Math.max(2, Math.floor(stats.years / 2)), title: 'Rising Path', description: 'Steadily pursuing goals and gaining experiences.' }
      ]
    };

    const updated = [...customFigures, newFig];
    setCustomFigures(updated);
    localStorage.setItem('life_stats_custom_giants', JSON.stringify(updated));
    setSelectedFigureId(newFig.id);

    // Reset form
    setCustomName('');
    setCustomBirth('');
    setCustomDeath('');
    setCustomIsFictional(false);
    setCustomDesc('');
    setIsAdding(false);
  };

  // Handle removing custom figure
  const handleRemoveCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customFigures.filter(f => f.id !== id);
    setCustomFigures(updated);
    localStorage.setItem('life_stats_custom_giants', JSON.stringify(updated));
    if (selectedFigureId === id) {
      setSelectedFigureId('einstein');
    }
  };

  // Chronological Calculations
  const calculations = useMemo(() => {
    const userBirth = new Date(birthDate);
    const figBirth = new Date(figure.birthDate);
    const figEnd = figure.deathDate ? new Date(figure.deathDate) : currentTime;

    // Total days lived by the figure
    const figTotalDays = Math.max(1, Math.floor((figEnd.getTime() - figBirth.getTime()) / (1000 * 60 * 60 * 24)));
    const figTotalYears = (figTotalDays / 365.25);

    // Overlapping Days
    const overlapStart = Math.max(userBirth.getTime(), figBirth.getTime());
    const overlapEnd = Math.min(currentTime.getTime(), figEnd.getTime());
    const overlapMs = overlapEnd - overlapStart;
    const overlapDays = overlapMs > 0 ? Math.floor(overlapMs / (1000 * 60 * 60 * 24)) : 0;

    // Pct comparison
    const lifeCompletionPct = Math.min(100, (stats.totalDays / figTotalDays) * 100);

    // Estimated heartbeats for figure (72 bpm average)
    const figHeartbeats = figTotalDays * 24 * 60 * 72;

    return {
      figTotalDays,
      figTotalYears,
      overlapDays,
      lifeCompletionPct,
      figHeartbeats
    };
  }, [figure, birthDate, stats.totalDays, currentTime]);

  const generateAiCompare = async () => {
    setIsGenerating(true);
    setAiError(null);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : undefined);
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined. Please set your VITE_GEMINI_API_KEY environment variable.");
      }
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Based on these metrics:
      - The user is ${stats.years} years old and has lived ${stats.totalDays.toLocaleString()} days.
      - The selected figure is ${figure.name} (Type: ${figure.type}, known as: "${figure.description}").
      - ${figure.name} lived for ${Math.round(calculations.figTotalYears)} years (${calculations.figTotalDays.toLocaleString()} days).
      - The user shared ${calculations.overlapDays.toLocaleString()} days on Earth with them.
      Generate a fun, inspirational, and deeply philosophical 2-sentence perspective comparing the user's current progress with this figure. Focus on the concept of time, unique destiny, and encouragement. Keep it friendly and punchy.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      setAiCompareText(response.text || "Your time is unique. No giant lived your life, and you are destined for your own milestones.");
    } catch (err: any) {
      console.error(err);
      setAiError(err?.message || "Could not generate AI comparison.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper to render appropriate icon
  const getIcon = (name: string) => {
    switch (name) {
      case 'Brain': return <Brain className="w-5 h-5 text-indigo-600" />;
      case 'Music': return <Music className="w-5 h-5 text-indigo-600" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-indigo-600" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-indigo-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'Zap': return <Zap className="w-5 h-5 text-indigo-600" />;
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-600" />;
      case 'Smile': return <Smile className="w-5 h-5 text-indigo-600" />;
      default: return <Users className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="bg-transparent space-y-8">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
            <Users className="text-indigo-600 w-8 h-8" />
            Compare with Giants & Icons
          </h3>
          <p className="text-gray-500 font-medium">Compare your timeline and stats side-by-side with historical visionaries or fictional characters.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-indigo-100 text-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? "Cancel Form" : "Create Custom Companion"}</span>
        </button>
      </div>

      {/* Form Card */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl max-w-2xl mx-auto"
        >
          <h4 className="text-xl font-black text-gray-900 mb-6">Add a Custom Character/Figure</h4>
          <form onSubmit={handleAddCustom} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">Name</label>
                <input
                  type="text"
                  placeholder="e.g. Nicola Tesla, Luke Skywalker"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-gray-900"
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">Type</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomIsFictional(false)}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-xl font-bold text-sm border transition-all",
                      !customIsFictional 
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                        : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    Historical Figure
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomIsFictional(true)}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-xl font-bold text-sm border transition-all",
                      customIsFictional 
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                        : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    Fictional Icon
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">Birth Date (or Debut)</label>
                <input
                  type="date"
                  value={customBirth}
                  onChange={(e) => setCustomBirth(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-gray-900"
                />
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">Death Date (Leave empty if alive/fictional)</label>
                <input
                  type="date"
                  value={customDeath}
                  onChange={(e) => setCustomDeath(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">Description / Claim to Fame</label>
              <textarea
                placeholder="e.g. Brilliant inventor who discovered alternating current power systems."
                value={customDesc}
                onChange={(e) => setCustomDesc(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-gray-900"
              />
            </div>

            {formError && (
              <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold transition-all text-sm shadow-lg shadow-indigo-100"
            >
              Add & Select Character
            </button>
          </form>
        </motion.div>
      )}

      {/* Main Comparison Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: List of giants */}
        <div className="lg:col-span-4 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between self-start">
          <div>
            <h4 className="text-lg font-black text-gray-900 mb-2">Select Companion</h4>
            <p className="text-xs text-gray-400 font-bold mb-6">Choose a famous figure or fictional character to compare side-by-side with your stats.</p>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-2 no-scrollbar">
              {allFigures.map((fig) => {
                const isSelected = selectedFigureId === fig.id;
                const isCustom = fig.id.startsWith('custom_');
                return (
                  <div
                    key={fig.id}
                    onClick={() => setSelectedFigureId(fig.id)}
                    className={cn(
                      "p-4 rounded-2xl border transition-all flex justify-between items-center cursor-pointer group",
                      isSelected
                        ? "bg-indigo-50/50 border-indigo-200 ring-2 ring-indigo-100"
                        : "bg-gray-50 border-gray-50 hover:bg-white hover:border-gray-200"
                    )}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                        isSelected ? "bg-white text-indigo-600 shadow-md" : "bg-white border border-gray-100 text-gray-500"
                      )}>
                        {getIcon(fig.iconName)}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-sm">{fig.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={cn(
                            "text-[8px] uppercase font-black px-1.5 py-0.5 rounded",
                            fig.type === 'fictional' ? "bg-pink-50 text-pink-600" : "bg-emerald-50 text-emerald-600"
                          )}>
                            {fig.type}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold">
                            Born {fig.birthDate.substring(0, 4)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isCustom && (
                      <button
                        onClick={(e) => handleRemoveCustom(fig.id, e)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors ml-2 opacity-0 group-hover:opacity-100"
                        title="Delete Custom Companion"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Comparison details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-pink-50 rounded-full blur-3xl opacity-60" />

            <div className="border-b border-gray-50 pb-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "text-[10px] uppercase font-black px-2.5 py-1 rounded-full",
                    figure.type === 'fictional' ? "bg-pink-50 text-pink-600 border border-pink-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  )}>
                    {figure.type === 'fictional' ? "Fictional Icon" : "Historical Giant"}
                  </span>
                  <span className="text-xs text-gray-400 font-black">
                    {figure.birthDate} {figure.deathDate ? `to ${figure.deathDate}` : "• Still Alive / Ageless"}
                  </span>
                </div>
                <h4 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-2">
                  {figure.name}
                </h4>
                <p className="text-gray-500 text-sm font-medium">
                  {figure.description}
                </p>
              </div>
            </div>

            {/* Comparison Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              {/* Card 1: Lifespan Comparison */}
              <div className="bg-gray-50/75 border border-gray-100 p-5 rounded-3xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Lifespan Compare</span>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-2xl font-black text-gray-900 tabular-nums">
                      {calculations.figTotalDays.toLocaleString()} <span className="text-sm font-medium text-gray-500">days</span>
                    </span>
                    <span className="text-xs font-bold text-gray-400">
                      vs your {stats.totalDays.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1.5">
                    <span>Your Progress</span>
                    <span className="text-indigo-600 tabular-nums">{calculations.lifeCompletionPct.toFixed(2)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200/60 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        calculations.lifeCompletionPct >= 100 ? "bg-emerald-500" : "bg-indigo-600"
                      )}
                      style={{ width: `${calculations.lifeCompletionPct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold mt-2">
                    {calculations.lifeCompletionPct >= 100 
                      ? `You have lived ${Math.floor(stats.totalDays - calculations.figTotalDays).toLocaleString()} days longer than ${figure.name}!`
                      : `You have lived ${calculations.lifeCompletionPct.toFixed(1)}% of their total lifespan.`
                    }
                  </p>
                </div>
              </div>

              {/* Card 2: Shared Coexistence */}
              <div className="bg-gray-50/75 border border-gray-100 p-5 rounded-3xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Coexistence Overlap</span>
                  <span className="text-2xl font-black text-gray-900 block mb-1 tabular-nums">
                    {calculations.overlapDays.toLocaleString()} <span className="text-sm font-medium text-gray-500">days</span>
                  </span>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed">
                    The exact duration that you and {figure.name} walked the Earth at the same time.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100/50 flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-mono font-bold text-indigo-600">
                    {calculations.overlapDays > 0 
                      ? "Shared time in our modern era" 
                      : "Lived in different chronological eras"
                    }
                  </span>
                </div>
              </div>

              {/* Card 3: Heartbeat Rhythms */}
              <div className="bg-gray-50/75 border border-gray-100 p-5 rounded-3xl">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Lifetime Heartbeats</span>
                <span className="text-2xl font-black text-gray-900 block mb-1 tabular-nums">
                  ~{Math.round(calculations.figHeartbeats / 1e6).toLocaleString()}M <span className="text-sm font-medium text-gray-500">beats</span>
                </span>
                <p className="text-xs text-gray-500 font-bold mb-3">
                  Estimated heartbeats during their life, compared to your live <span className="text-indigo-600">{Math.round(stats.heartbeats).toLocaleString()}</span>.
                </p>
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                  <span>Their beats: {calculations.figHeartbeats.toLocaleString()}</span>
                </div>
              </div>

              {/* Card 4: Earth Orbits */}
              <div className="bg-gray-50/75 border border-gray-100 p-5 rounded-3xl">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Solar Orbits</span>
                <span className="text-2xl font-black text-gray-900 block mb-1 tabular-nums">
                  {calculations.figTotalYears.toFixed(1)} <span className="text-sm font-medium text-gray-500">orbits</span>
                </span>
                <p className="text-xs text-gray-500 font-bold mb-3">
                  Total full cycles around the sun, compared to your current <span className="text-indigo-600">{stats.years.toFixed(1)}</span> orbits.
                </p>
                <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                  <span>Completed orbits since birth</span>
                </div>
              </div>
            </div>

            {/* AI Dynamic Bio section */}
            <div className="mt-8 pt-8 border-t border-gray-50 relative z-10">
              <div className="bg-indigo-50/40 border border-indigo-100/50 p-6 rounded-3xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="flex items-center space-x-2.5">
                    <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
                    <div>
                      <h5 className="font-black text-gray-900 text-sm">Dynamic AI Chrono-Perspective</h5>
                      <p className="text-[10px] text-gray-400 font-bold">Powered by Gemini AI Studio</p>
                    </div>
                  </div>
                  <button
                    onClick={generateAiCompare}
                    disabled={isGenerating}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0"
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span>Analyzing Timeline...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Generate Comparative Bio</span>
                      </>
                    )}
                  </button>
                </div>

                {aiCompareText ? (
                  <div className="text-gray-700 text-sm font-medium leading-relaxed bg-white p-4 rounded-2xl border border-indigo-50">
                    <Markdown>{aiCompareText}</Markdown>
                  </div>
                ) : aiError ? (
                  <div className="text-red-500 text-xs font-bold p-3 bg-red-50 rounded-xl border border-red-100">
                    {aiError}
                  </div>
                ) : (
                  <p className="text-xs text-indigo-900/60 font-bold italic leading-relaxed">
                    "At {stats.years} years of age, you are {calculations.lifeCompletionPct.toFixed(1)}% through {figure.name}'s legendary lifetime. Click the button to get a personalized AI perspective mapping your current growth against their path!"
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Achievements Timeline mapping */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <h4 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Award className="text-indigo-600 w-5 h-5" />
              Life Milestones & Achievements
            </h4>

            <div className="relative pl-6 border-l border-indigo-100 space-y-8 py-2">
              {/* User Current Age marker inside the timeline */}
              <div 
                className="absolute left-0 -translate-x-1/2 flex items-center justify-center h-4.5"
                style={{ 
                  top: `${Math.min(95, Math.max(5, (stats.years / Math.max(80, calculations.figTotalYears)) * 100))}%` 
                }}
              >
                <div className="flex items-center ml-4 whitespace-nowrap bg-indigo-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-lg relative z-20">
                  <div className="absolute -left-1 w-2.5 h-2.5 bg-indigo-600 rotate-45" />
                  <span>YOU ARE HERE: Age {stats.years}</span>
                </div>
              </div>

              {figure.achievements.map((ach: { age: number; title: string; description: string }, idx: number) => {
                const passed = stats.years >= ach.age;
                return (
                  <div key={idx} className="relative group">
                    {/* Timeline Node dot */}
                    <div className={cn(
                      "absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 flex items-center justify-center transition-all",
                      passed 
                        ? "bg-indigo-600 border-white ring-4 ring-indigo-50" 
                        : "bg-white border-gray-200 group-hover:border-indigo-400"
                    )} />
                    <div>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-wider block mb-0.5",
                        passed ? "text-indigo-600" : "text-gray-400"
                      )}>
                        Age {ach.age}
                      </span>
                      <h5 className="font-black text-gray-950 text-base mb-1">
                        {ach.title}
                      </h5>
                      <p className="text-sm text-gray-500 font-medium max-w-xl leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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

  // --- Side-by-Side Comparison States ---
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [birthDate2, setBirthDate2] = useState<string>('');
  const [error2, setError2] = useState<string | null>(null);
  const [personName1, setPersonName1] = useState<string>('Person A');
  const [personName2, setPersonName2] = useState<string>('Person B');
  const [stats2, setStats2] = useState<LifeStats | null>(null);

  // --- Historical Time Travel States ---
  const [timeTravelDays, setTimeTravelDays] = useState<number | null>(null);

  const actualDaysLived = useMemo(() => {
    if (!birthDate || error) return 0;
    const birth = new Date(birthDate);
    const now = new Date();
    const diffMs = now.getTime() - birth.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  }, [birthDate, error]);

  const selectedTimeTravelDate = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    if (timeTravelDays === null) return new Date();
    return new Date(birth.getTime() + timeTravelDays * 24 * 60 * 60 * 1000);
  }, [birthDate, timeTravelDays]);

  // --- Personal Milestones & Saved Snapshots States ---
  const [currentTime, setCurrentTime] = useState(new Date());
  const [customMilestones, setCustomMilestones] = useState<any[]>(() => {
    const saved = localStorage.getItem('life_stats_custom_milestones');
    return saved ? JSON.parse(saved) : [
      { id: '100th', name: '100th Birthday (Century)', isDefault: true, yearsOffset: 100 },
      { id: 'retirement', name: 'Retirement (Age 65)', isDefault: true, yearsOffset: 65 },
      { id: 'next_decade', name: 'Next Decade Birthday', isDefault: true, isNextDecade: true },
    ];
  });
  const [newMilestoneName, setNewMilestoneName] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');
  const [milestoneError, setMilestoneError] = useState<string | null>(null);

  const [snapshots, setSnapshots] = useState<any[]>(() => {
    const saved = localStorage.getItem('life_stats_snapshots');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeCompareId, setActiveCompareId] = useState<string | null>(null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [snapshotMetric, setSnapshotMetric] = useState<string>('Days Lived');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getMilestoneDate = (m: any) => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    if (m.isDefault) {
      if (m.yearsOffset) {
        const target = new Date(birth);
        target.setFullYear(birth.getFullYear() + m.yearsOffset);
        return target;
      }
      if (m.isNextDecade && stats) {
        const currentAge = stats.years;
        const nextDecadeAge = (Math.floor(currentAge / 10) + 1) * 10;
        const target = new Date(birth);
        target.setFullYear(birth.getFullYear() + nextDecadeAge);
        return target;
      }
    }
    return new Date(m.date);
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneName.trim()) {
      setMilestoneError("Milestone name is required.");
      return;
    }
    if (!newMilestoneDate) {
      setMilestoneError("Target date is required.");
      return;
    }
    const target = new Date(newMilestoneDate);
    if (target <= new Date()) {
      setMilestoneError("Target date must be in the future.");
      return;
    }
    
    const newM = {
      id: Date.now().toString(),
      name: newMilestoneName.trim(),
      date: newMilestoneDate,
      isDefault: false
    };
    
    const updated = [...customMilestones, newM];
    setCustomMilestones(updated);
    localStorage.setItem('life_stats_custom_milestones', JSON.stringify(updated));
    setNewMilestoneName('');
    setNewMilestoneDate('');
    setMilestoneError(null);
  };

  const handleRemoveMilestone = (id: string) => {
    const updated = customMilestones.filter(m => m.id !== id);
    setCustomMilestones(updated);
    localStorage.setItem('life_stats_custom_milestones', JSON.stringify(updated));
  };

  const handleSaveSnapshot = () => {
    if (!stats) return;
    const newSnapshot = {
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      birthDate: birthDate,
      stats: {
        totalDays: stats.totalDays,
        totalHours: stats.totalHours,
        totalMinutes: stats.totalMinutes,
        totalSeconds: stats.totalSeconds,
        heartbeats: stats.heartbeats,
        breaths: stats.breaths,
        sleepHours: stats.sleepHours,
        stepsWalked: stats.stepsWalked,
        phoneTimeHours: stats.phoneTimeHours,
        waterConsumed: stats.waterConsumed,
        mealsEaten: stats.mealsEaten,
        scrolledKm: stats.scrolledKm,
      }
    };
    const updated = [newSnapshot, ...snapshots];
    setSnapshots(updated);
    localStorage.setItem('life_stats_snapshots', JSON.stringify(updated));
    setSaveSuccessMessage("Stats Snapshot saved successfully!");
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  const handleRemoveSnapshot = (id: string) => {
    const updated = snapshots.filter(s => s.id !== id);
    setSnapshots(updated);
    localStorage.setItem('life_stats_snapshots', JSON.stringify(updated));
    if (activeCompareId === id) {
      setActiveCompareId(null);
    }
  };

  const snapshotChartData = useMemo(() => {
    if (snapshots.length === 0) return [];
    const sorted = [...snapshots].sort((a, b) => new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime());
    return sorted.map((s) => {
      const date = new Date(s.savedAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      return {
        date,
        'Days Lived': s.stats.totalDays,
        'Heartbeats (M)': parseFloat((s.stats.heartbeats / 1000000).toFixed(2)),
        'Screen Time (hrs)': parseFloat(s.stats.phoneTimeHours.toFixed(1)),
        'Steps Walked': s.stats.stepsWalked
      };
    });
  }, [snapshots]);

  const getMilestoneCountdown = (targetDate: Date) => {
    const diffMs = targetDate.getTime() - currentTime.getTime();
    if (diffMs <= 0) return { passed: true, text: "Reached!" };

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      passed: false,
      days,
      hours,
      minutes,
      seconds
    };
  };

  const calculateMilestoneProgress = (targetDate: Date) => {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    const total = targetDate.getTime() - birth.getTime();
    const elapsed = currentTime.getTime() - birth.getTime();
    if (total <= 0) return 100;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  const getComparisonDeltas = (snapshot: any) => {
    if (!stats) return null;
    const deltaDays = stats.totalDays - snapshot.stats.totalDays;
    const deltaHours = stats.totalHours - snapshot.stats.totalHours;
    const deltaMinutes = stats.totalMinutes - snapshot.stats.totalMinutes;
    const deltaSeconds = stats.totalSeconds - snapshot.stats.totalSeconds;
    const deltaHeartbeats = stats.heartbeats - snapshot.stats.heartbeats;
    const deltaBreaths = stats.breaths - snapshot.stats.breaths;
    const deltaSleep = stats.sleepHours - snapshot.stats.sleepHours;
    const deltaSteps = stats.stepsWalked - snapshot.stats.stepsWalked;
    const deltaPhone = stats.phoneTimeHours - snapshot.stats.phoneTimeHours;
    const deltaWater = stats.waterConsumed - snapshot.stats.waterConsumed;
    const deltaMeals = stats.mealsEaten - snapshot.stats.mealsEaten;
    const deltaScroll = stats.scrolledKm - snapshot.stats.scrolledKm;

    return {
      deltaDays,
      deltaHours,
      deltaMinutes,
      deltaSeconds,
      deltaHeartbeats,
      deltaBreaths,
      deltaSleep,
      deltaSteps,
      deltaPhone,
      deltaWater,
      deltaMeals,
      deltaScroll
    };
  };

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
    setTimeTravelDays(null); // Reset time travel when birthdate changes
  };

  useEffect(() => {
    const calculateAll = () => {
      const now = new Date();

      // Person 1 Stats
      if (birthDate && !error) {
        const birth = new Date(birthDate);
        let p1Now = new Date();
        if (timeTravelDays !== null) {
          p1Now = new Date(birth.getTime() + timeTravelDays * 24 * 60 * 60 * 1000);
        } else {
          p1Now = now;
        }

        const diffMs = p1Now.getTime() - birth.getTime();
        const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = Math.floor(totalDays / 30.44);

        let years = p1Now.getFullYear() - birth.getFullYear();
        let months = p1Now.getMonth() - birth.getMonth();
        let days = p1Now.getDate() - birth.getDate();

        if (days < 0) {
          months--;
          const lastMonth = new Date(p1Now.getFullYear(), p1Now.getMonth(), 0);
          days += lastMonth.getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }

        if (years < 0) years = 0;
        if (months < 0) months = 0;
        if (days < 0) days = 0;

        const totalLifeDays = LIFE_EXPECTANCY * 365.25;
        const daysLeft = Math.max(0, totalLifeDays - totalDays);
        const percentCompleted = Math.min(100, (totalDays / totalLifeDays) * 100);
        const weekendsLeft = Math.floor(daysLeft / 7);

        const nextBday = new Date(p1Now.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBday < p1Now) nextBday.setFullYear(p1Now.getFullYear() + 1);
        const nextBirthdayDays = Math.ceil((nextBday.getTime() - p1Now.getTime()) / (1000 * 60 * 60 * 24));

        const milestone10k = 10000 - totalDays;

        let timeWithParentsPercent = 90;
        if (years < 18) {
          timeWithParentsPercent = (years / 18) * 90;
        } else {
          timeWithParentsPercent = 90 + Math.min(9, (years - 18) * 0.2);
        }

        // Use stable deterministic seed variance based on birth timestamp so it does not jitter randomly on every second tick
        const seedValue = Math.sin(birth.getTime() / 100000) * 0.8;
        const biologicalAge = Math.max(0, years + seedValue);

        setStats({
          years, months, days, hours: p1Now.getHours(), minutes: p1Now.getMinutes(), seconds: p1Now.getSeconds(),
          totalDays, totalHours, totalMinutes, totalSeconds, totalWeeks, totalMonths,
          daysLeft, percentCompleted, weekendsLeft, nextBirthdayDays,
          milestone10kDays: milestone10k,
          timeWithParentsPercent,
          heartbeats: totalMinutes * AVG_HEART_RATE,
          breaths: totalMinutes * AVG_BREATH_RATE,
          blinks: totalMinutes * AVG_BLINK_RATE,
          sleepHours: totalDays * AVG_SLEEP_HOURS,
          caloriesBurned: totalDays * 2200,
          waterConsumed: totalDays * AVG_WATER_LITERS,
          stepsWalked: totalDays * AVG_STEPS_PER_DAY,
          biologicalAge,
          phoneTimeHours: totalDays * AVG_PHONE_USE,
          scrolledKm: totalDays * AVG_SCROLL_KM_PER_DAY,
          notificationsReceived: totalDays * 65,
          wordsTyped: totalDays * 2000,
          mealsEaten: totalDays * AVG_MEALS_PER_DAY,
          coffeeCups: totalDays * AVG_COFFEE_CUPS,
          laughs: totalDays * AVG_LAUGHS_PER_DAY,
          bathroomDays: totalDays * (AVG_BATHROOM_YEARS / LIFE_EXPECTANCY),
          earthCircuits: (totalDays * AVG_STEPS_PER_DAY * 0.0007) / 40075,
          foodTons: (totalDays * 1.5) / 1000,
          moneyEarned: totalDays * 150,
          hourlyValue: 25
        });
      } else {
        setStats(null);
      }

      // Person 2 Stats
      if (isCompareMode && birthDate2 && !error2) {
        const birth = new Date(birthDate2);
        const p2Now = now;

        const diffMs = p2Now.getTime() - birth.getTime();
        const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = Math.floor(totalDays / 30.44);

        let years = p2Now.getFullYear() - birth.getFullYear();
        let months = p2Now.getMonth() - birth.getMonth();
        let days = p2Now.getDate() - birth.getDate();

        if (days < 0) {
          months--;
          const lastMonth = new Date(p2Now.getFullYear(), p2Now.getMonth(), 0);
          days += lastMonth.getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }

        if (years < 0) years = 0;
        if (months < 0) months = 0;
        if (days < 0) days = 0;

        const totalLifeDays = LIFE_EXPECTANCY * 365.25;
        const daysLeft = Math.max(0, totalLifeDays - totalDays);
        const percentCompleted = Math.min(100, (totalDays / totalLifeDays) * 100);
        const weekendsLeft = Math.floor(daysLeft / 7);

        const nextBday = new Date(p2Now.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBday < p2Now) nextBday.setFullYear(p2Now.getFullYear() + 1);
        const nextBirthdayDays = Math.ceil((nextBday.getTime() - p2Now.getTime()) / (1000 * 60 * 60 * 24));

        const milestone10k = 10000 - totalDays;

        let timeWithParentsPercent = 90;
        if (years < 18) {
          timeWithParentsPercent = (years / 18) * 90;
        } else {
          timeWithParentsPercent = 90 + Math.min(9, (years - 18) * 0.2);
        }

        const seedValue = Math.sin(birth.getTime() / 100000) * 0.8;
        const biologicalAge = Math.max(0, years + seedValue);

        setStats2({
          years, months, days, hours: p2Now.getHours(), minutes: p2Now.getMinutes(), seconds: p2Now.getSeconds(),
          totalDays, totalHours, totalMinutes, totalSeconds, totalWeeks, totalMonths,
          daysLeft, percentCompleted, weekendsLeft, nextBirthdayDays,
          milestone10kDays: milestone10k,
          timeWithParentsPercent,
          heartbeats: totalMinutes * AVG_HEART_RATE,
          breaths: totalMinutes * AVG_BREATH_RATE,
          blinks: totalMinutes * AVG_BLINK_RATE,
          sleepHours: totalDays * AVG_SLEEP_HOURS,
          caloriesBurned: totalDays * 2200,
          waterConsumed: totalDays * AVG_WATER_LITERS,
          stepsWalked: totalDays * AVG_STEPS_PER_DAY,
          biologicalAge,
          phoneTimeHours: totalDays * AVG_PHONE_USE,
          scrolledKm: totalDays * AVG_SCROLL_KM_PER_DAY,
          notificationsReceived: totalDays * 65,
          wordsTyped: totalDays * 2000,
          mealsEaten: totalDays * AVG_MEALS_PER_DAY,
          coffeeCups: totalDays * AVG_COFFEE_CUPS,
          laughs: totalDays * AVG_LAUGHS_PER_DAY,
          bathroomDays: totalDays * (AVG_BATHROOM_YEARS / LIFE_EXPECTANCY),
          earthCircuits: (totalDays * AVG_STEPS_PER_DAY * 0.0007) / 40075,
          foodTons: (totalDays * 1.5) / 1000,
          moneyEarned: totalDays * 150,
          hourlyValue: 25
        });
      } else {
        setStats2(null);
      }
    };

    calculateAll();
    const interval = setInterval(calculateAll, 1000);
    return () => clearInterval(interval);
  }, [birthDate, error, birthDate2, error2, isCompareMode, timeTravelDays]);

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

          {/* Mode Switcher */}
          <div className="flex justify-center mb-10 relative z-20">
            <div className="bg-gray-100 p-1.5 rounded-[1.5rem] flex items-center gap-1.5 border border-gray-200/60 shadow-inner">
              <button
                onClick={() => {
                  setIsCompareMode(false);
                  setTimeTravelDays(null);
                }}
                className={cn(
                  "px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center space-x-2",
                  !isCompareMode 
                    ? "bg-white text-indigo-600 shadow-md shadow-indigo-100/50" 
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                <Clock className="w-4 h-4" />
                <span>Single Life Tracker</span>
              </button>
              <button
                onClick={() => {
                  setIsCompareMode(true);
                  setTimeTravelDays(null);
                }}
                className={cn(
                  "px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center space-x-2",
                  isCompareMode 
                    ? "bg-white text-indigo-600 shadow-md shadow-indigo-100/50" 
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                <Users className="w-4 h-4" />
                <span>Side-by-Side Mode</span>
              </button>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "mx-auto bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-gray-100 transition-all duration-300 relative z-10",
              isCompareMode ? "max-w-4xl" : "max-w-xl"
            )}
          >
            {!isCompareMode ? (
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                {/* Person 1 Input */}
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">First Person's Name</label>
                    <input
                      type="text"
                      value={personName1}
                      onChange={(e) => setPersonName1(e.target.value || 'Person A')}
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold text-gray-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
                      placeholder="e.g. John"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Birthdate</label>
                      {error && <span className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {error}</span>}
                    </div>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                      <input
                        type="date"
                        value={birthDate}
                        onChange={handleDateChange}
                        className={cn(
                          "w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-4 transition-all outline-none font-bold text-gray-900 text-sm",
                          error ? "border-red-100 focus:ring-red-50" : "border-gray-100 focus:border-indigo-500 focus:ring-indigo-50"
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Person 2 Input */}
                <div className="flex flex-col space-y-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                  <div className="flex flex-col">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Second Person's Name</label>
                    <input
                      type="text"
                      value={personName2}
                      onChange={(e) => setPersonName2(e.target.value || 'Person B')}
                      className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl font-bold text-gray-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all text-sm"
                      placeholder="e.g. Sarah"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-wider">Birthdate</label>
                      {error2 && <span className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> {error2}</span>}
                    </div>
                    <div className="relative group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                      <input
                        type="date"
                        value={birthDate2}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBirthDate2(val);
                          setError2(validateDate(val));
                        }}
                        className={cn(
                          "w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:ring-4 transition-all outline-none font-bold text-gray-900 text-sm",
                          error2 ? "border-red-100 focus:ring-red-50" : "border-gray-100 focus:border-indigo-500 focus:ring-indigo-50"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Dashboard Section */}
      <AnimatePresence>
        {!isCompareMode && stats && !error && (
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

              {/* Horizontal Timeline Slider */}
              <div className={cn(
                "mb-12 p-8 rounded-[2rem] border transition-all duration-300 relative overflow-hidden",
                timeTravelDays !== null 
                  ? "bg-gradient-to-br from-amber-50/75 to-orange-50/30 border-amber-200/60 shadow-lg shadow-amber-100/20" 
                  : "bg-white border-gray-100 shadow-sm hover:shadow-md"
              )}>
                {/* Background decorative element */}
                {timeTravelDays !== null && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none animate-pulse" />
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm shrink-0",
                      timeTravelDays !== null 
                        ? "bg-amber-500 text-white animate-pulse" 
                        : "bg-indigo-50 text-indigo-600"
                    )}>
                      <History className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-xl flex flex-wrap items-center gap-2">
                        <span>Journey Back in Time</span>
                        {timeTravelDays !== null ? (
                          <span className="inline-flex items-center bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider border border-amber-200/50">
                            Viewing Past Stats
                          </span>
                        ) : (
                          <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider border border-emerald-100">
                            Live Present
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium mt-1">
                        {timeTravelDays !== null ? (
                          <>
                            Currently viewing stats at age <span className="font-extrabold text-amber-700">{stats.years} years, {stats.months} months, and {stats.days} days</span>.
                          </>
                        ) : (
                          "Drag the slider to rewind time and dynamically see what your stats looked like at any age."
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end shrink-0">
                    {timeTravelDays !== null ? (
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-xl">
                          {selectedTimeTravelDate?.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <button
                          onClick={() => setTimeTravelDays(null)}
                          className="flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Return to Present</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-100">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping mr-1" />
                        <span>Real-time Ticking</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Slider input & markers */}
                <div className="space-y-6 relative z-10">
                  <div className="relative group px-1">
                    <input
                      type="range"
                      min={0}
                      max={actualDaysLived}
                      value={timeTravelDays !== null ? timeTravelDays : actualDaysLived}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (val >= actualDaysLived) {
                          setTimeTravelDays(null);
                        } else {
                          setTimeTravelDays(val);
                        }
                      }}
                      className={cn(
                        "w-full h-3 rounded-full appearance-none cursor-pointer outline-none transition-all duration-150 focus:ring-4",
                        timeTravelDays !== null 
                          ? "bg-amber-100 accent-amber-500 focus:ring-amber-500/20" 
                          : "bg-indigo-100 accent-indigo-600 focus:ring-indigo-600/20"
                      )}
                    />
                    
                    {/* Tick markers */}
                    <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-wider pt-3">
                      <div className="flex flex-col items-start">
                        <span className="text-gray-900 font-extrabold">Born</span>
                        <span>Day 0</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>Childhood</span>
                        <span>~5-10y</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>Teens</span>
                        <span>~13-19y</span>
                      </div>
                      {actualDaysLived > 25 * 365.25 && (
                        <div className="flex flex-col items-center">
                          <span>Twenties</span>
                          <span>~20-29y</span>
                        </div>
                      )}
                      <div className="flex flex-col items-end">
                        <span className="text-indigo-600 font-extrabold">Today</span>
                        <span className="text-indigo-500 font-bold">Age {Math.floor(actualDaysLived / 365.25)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-dashed border-gray-100">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider mr-2">Quick Jumps:</span>
                    {[
                      { label: "Birth (0)", age: 0 },
                      { label: "Age 5", age: 5 },
                      { label: "Age 10", age: 10 },
                      { label: "Age 15", age: 15 },
                      { label: "Age 18", age: 18 },
                      { label: "Age 21", age: 21 },
                      { label: "Age 25", age: 25 },
                      { label: "Age 30", age: 30 },
                      { label: "Age 40", age: 40 },
                      { label: "Age 50", age: 50 },
                      { label: "Age 60", age: 60 },
                    ].filter(preset => preset.age * 365.25 < actualDaysLived).map((preset) => {
                      const presetDays = Math.floor(preset.age * 365.25);
                      const isCurrentPreset = timeTravelDays !== null && Math.abs(timeTravelDays - presetDays) < 180;
                      return (
                        <button
                          key={preset.label}
                          onClick={() => {
                            if (preset.age === 0) {
                              setTimeTravelDays(0);
                            } else {
                              setTimeTravelDays(Math.min(actualDaysLived - 1, presetDays));
                            }
                          }}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border",
                            isCurrentPreset
                              ? "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-100"
                              : "bg-gray-50 text-gray-600 border-gray-100 hover:border-indigo-100 hover:text-indigo-600 hover:bg-indigo-50/30"
                          )}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                    {timeTravelDays !== null && (
                      <button
                        onClick={() => setTimeTravelDays(null)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100"
                      >
                        Present Today
                      </button>
                    )}
                  </div>
                </div>
              </div>

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
                  { id: 'giants', label: 'Time Companions', icon: Users },
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

                {activeTab === 'giants' && (
                  <div className="col-span-full">
                    <GiantsComparison stats={stats} birthDate={birthDate} currentTime={currentTime} />
                  </div>
                )}

                {activeTab === 'money' && (
                  <div className="col-span-full space-y-8 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                      <StatCard icon={DollarSign} label="Money Earned" value={`$${stats.moneyEarned.toLocaleString()}`} subValue="Lifetime estimate" color="bg-green-600" />
                      <StatCard icon={Clock} label="Hourly Life Value" value={`$${stats.hourlyValue}/hr`} color="bg-indigo-600" />
                      <StatCard icon={Briefcase} label="Work Hours" value={Math.round(stats.totalHours * 0.2).toLocaleString()} color="bg-blue-700" />
                      <StatCard icon={TrendingUp} label="Earning Projection" value={`$${(stats.moneyEarned * 2.5).toLocaleString()}`} subValue="By age 65" color="bg-emerald-500" />
                    </div>
                    <CustomEarningsCalculator />
                  </div>
                )}
              </motion.div>

              {/* Personal Milestones */}
              <div className="mt-20 border-t border-gray-100 pt-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                      <Award className="text-indigo-600 w-8 h-8" />
                      Personal Milestones
                    </h3>
                    <p className="text-gray-500 font-medium">Input custom target dates and view real-time countdown progress.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Form Column */}
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm self-start">
                    <h4 className="text-lg font-black text-gray-900 mb-4">Add Custom Milestone</h4>
                    <form onSubmit={handleAddMilestone} className="space-y-4">
                      <div>
                        <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">
                          Milestone Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Retirement, Trip to Space"
                          value={newMilestoneName}
                          onChange={(e) => setNewMilestoneName(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2 block">
                          Target Date
                        </label>
                        <input
                          type="date"
                          value={newMilestoneDate}
                          onChange={(e) => setNewMilestoneDate(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-bold text-gray-900"
                        />
                      </div>
                      {milestoneError && (
                        <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {milestoneError}
                        </p>
                      )}
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold transition-all text-sm active:scale-95 shadow-lg shadow-indigo-100"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create Milestone</span>
                      </button>
                    </form>
                  </div>

                  {/* Right Countdown Grid Column */}
                  <div className="lg:col-span-2 space-y-6">
                    {customMilestones.length === 0 ? (
                      <div className="bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200 p-12 text-center">
                        <Award className="text-gray-300 w-12 h-12 mx-auto mb-4" />
                        <p className="text-gray-500 font-bold">No milestones created yet. Add one using the form!</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {customMilestones.map((m) => {
                          const targetDate = getMilestoneDate(m);
                          if (!targetDate) return null;
                          const countdown = getMilestoneCountdown(targetDate);
                          const progress = calculateMilestoneProgress(targetDate);

                          return (
                            <motion.div
                              layout
                              key={m.id}
                              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between group"
                            >
                              <div>
                                <div className="flex justify-between items-start mb-4">
                                  <div className="flex-grow">
                                    <h5 className="font-black text-gray-900 text-lg leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                                      {m.name}
                                    </h5>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                      {targetDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                  </div>
                                  {!m.isDefault && (
                                    <button
                                      onClick={() => handleRemoveMilestone(m.id)}
                                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2"
                                      title="Delete Milestone"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>

                                {countdown.passed ? (
                                  <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 mb-4">
                                    <Sparkles className="w-4 h-4 animate-pulse" />
                                    <span>Milestone Reached!</span>
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-4 gap-2 text-center mb-6">
                                    <div className="bg-gray-50 p-2 rounded-xl">
                                      <span className="block text-xl font-black text-gray-900 tabular-nums">{countdown.days}</span>
                                      <span className="text-[10px] text-gray-400 font-bold uppercase">Days</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-xl">
                                      <span className="block text-xl font-black text-gray-900 tabular-nums">{countdown.hours}</span>
                                      <span className="text-[10px] text-gray-400 font-bold uppercase">Hrs</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-xl">
                                      <span className="block text-xl font-black text-gray-900 tabular-nums">{countdown.minutes}</span>
                                      <span className="text-[10px] text-gray-400 font-bold uppercase">Mins</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-xl">
                                      <span className="block text-xl font-black text-indigo-600 tabular-nums">{countdown.seconds}</span>
                                      <span className="text-[10px] text-gray-400 font-bold uppercase">Secs</span>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Progress bar */}
                              <div className="mt-auto">
                                <div className="flex justify-between items-center mb-1 text-xs font-bold text-gray-400">
                                  <span>Journey Progress</span>
                                  <span className="text-indigo-600 tabular-nums">{progress.toFixed(4)}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-indigo-600 rounded-full" 
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Life Stats Snapshot Engine */}
              <div className="mt-20 border-t border-gray-100 pt-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                      <History className="text-indigo-600 w-8 h-8" />
                      My Life Stats History & Trends
                    </h3>
                    <p className="text-gray-500 font-medium">Save snapshots of your statistics and compare your timeline trends over time.</p>
                  </div>
                  <button
                    onClick={handleSaveSnapshot}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-full font-bold transition-all shadow-lg shadow-indigo-200 text-sm active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save Current Stats Snapshot</span>
                  </button>
                </div>

                {saveSuccessMessage && (
                  <div className="mb-6 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-emerald-800 text-sm font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-bounce" />
                    {saveSuccessMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left column: saved snapshots list */}
                  <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between self-start">
                    <div>
                      <h4 className="text-lg font-black text-gray-900 mb-2">Saved Snapshots</h4>
                      <p className="text-xs text-gray-400 font-bold mb-6">Capture stats periodically (e.g., weekly or monthly) to analyze personal growth.</p>
                      
                      {snapshots.length === 0 ? (
                        <div className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-dashed border-gray-100">
                          <History className="text-gray-300 w-10 h-10 mx-auto mb-2" />
                          <p className="text-xs text-gray-500 font-bold">No snapshots saved yet. Click "Save Current Stats Snapshot" to record your first timeline point!</p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 no-scrollbar">
                          {snapshots.map((snap) => {
                            const isSelected = activeCompareId === snap.id;
                            const savedDate = new Date(snap.savedAt);
                            return (
                              <div
                                key={snap.id}
                                className={cn(
                                  "p-4 rounded-2xl border transition-all flex justify-between items-center",
                                  isSelected 
                                    ? "bg-indigo-50/50 border-indigo-200 ring-2 ring-indigo-100" 
                                    : "bg-gray-50 border-gray-100 hover:border-gray-200"
                                )}
                              >
                                <div className="cursor-pointer flex-grow" onClick={() => setActiveCompareId(snap.id)}>
                                  <p className="font-black text-gray-900 text-sm">
                                    {savedDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </p>
                                  <p className="text-[10px] text-indigo-600 font-bold">
                                    {savedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {snap.stats.totalDays.toLocaleString()} Days Alive
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => setActiveCompareId(isSelected ? null : snap.id)}
                                    className={cn(
                                      "px-3 py-1.5 rounded-lg text-xs font-black transition-all",
                                      isSelected
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                    )}
                                  >
                                    {isSelected ? 'Selected' : 'Compare'}
                                  </button>
                                  <button
                                    onClick={() => handleRemoveSnapshot(snap.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                    title="Delete Snapshot"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right column: Comparison details & trend chart */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Live Comparison Delta Dashboard */}
                    {activeCompareId ? (() => {
                      const snap = snapshots.find(s => s.id === activeCompareId);
                      if (!snap) return null;
                      const deltas = getComparisonDeltas(snap);
                      if (!deltas) return null;
                      
                      const savedTime = new Date(snap.savedAt).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }) + " at " + new Date(snap.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                      return (
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                          <div className="border-b border-gray-50 pb-6 mb-6">
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                              Live Comparison Active
                            </span>
                            <h4 className="text-xl font-black text-gray-900 leading-tight">
                              Growth Trends Since Your Snapshot
                            </h4>
                            <p className="text-xs text-gray-400 font-bold mt-1">
                              Comparing live stats against snapshot taken on <span className="text-indigo-600">{savedTime}</span>. Watch your life's rhythms increase in real-time.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 p-4 rounded-2xl relative overflow-hidden">
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Time Elapsed</span>
                              <p className="text-lg font-black text-gray-900 tabular-nums">+{deltas.deltaDays}d {deltas.deltaHours % 24}h {deltas.deltaMinutes % 60}m</p>
                              <p className="text-[10px] font-mono text-indigo-600 mt-1">+{deltas.deltaSeconds.toLocaleString()} seconds</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Heartbeats</span>
                              <p className="text-lg font-black text-red-500 tabular-nums">+{deltas.deltaHeartbeats.toLocaleString()}</p>
                              <p className="text-[10px] font-bold text-gray-400">Biological engine pumps</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Breaths taken</span>
                              <p className="text-lg font-black text-blue-500 tabular-nums">+{deltas.deltaBreaths.toLocaleString()}</p>
                              <p className="text-[10px] font-bold text-gray-400">Oxygen molecules</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Screen Time</span>
                              <p className="text-lg font-black text-pink-500 tabular-nums">+{deltas.deltaPhone.toFixed(1)} hrs</p>
                              <p className="text-[10px] font-bold text-gray-400">~{(deltas.deltaScroll).toFixed(2)} km scrolled</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Sleep Obtained</span>
                              <p className="text-lg font-black text-indigo-900 tabular-nums">+{deltas.deltaSleep.toFixed(1)} hrs</p>
                              <p className="text-[10px] font-bold text-gray-400">Cellular restoration</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Hydration</span>
                              <p className="text-lg font-black text-cyan-500 tabular-nums">+{deltas.deltaWater.toFixed(1)} L</p>
                              <p className="text-[10px] font-bold text-gray-400">Liters consumed</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Meals Eaten</span>
                              <p className="text-lg font-black text-orange-600 tabular-nums">+{deltas.deltaMeals.toLocaleString()}</p>
                              <p className="text-[10px] font-bold text-gray-400">Portions of energy</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Steps Walked</span>
                              <p className="text-lg font-black text-emerald-600 tabular-nums">+{deltas.deltaSteps.toLocaleString()}</p>
                              <p className="text-[10px] font-bold text-gray-400">Steps taken</p>
                            </div>
                          </div>
                        </div>
                      );
                    })() : (
                      <div className="bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200 p-12 text-center">
                        <History className="text-gray-300 w-12 h-12 mx-auto mb-4" />
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Select Snapshot to Compare</h4>
                        <p className="text-gray-500 font-medium max-w-md mx-auto text-sm">
                          Click "Compare" on any of your saved snapshots to calculate real-time growth delta and analyze specific biological, digital, and activity trends.
                        </p>
                      </div>
                    )}

                    {/* Historical Trend Charts */}
                    {snapshots.length >= 2 && (
                      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                          <div>
                            <h4 className="text-lg font-black text-gray-900">Historical Snapshot Timeline</h4>
                            <p className="text-xs text-gray-400 font-bold mt-1">Visualize historical metrics across all snapshots</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {['Days Lived', 'Heartbeats (M)', 'Screen Time (hrs)', 'Steps Walked'].map((m) => (
                              <button
                                key={m}
                                onClick={() => setSnapshotMetric(m)}
                                className={cn(
                                  "px-3 py-1 rounded-full text-xs font-black border transition-all",
                                  snapshotMetric === m
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                    : "bg-white text-gray-500 border-gray-100 hover:border-indigo-100"
                                )}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="h-56">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={snapshotChartData}>
                              <defs>
                                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#9ca3af' }} />
                              <YAxis hide domain={['auto', 'auto']} />
                              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                              <Area type="monotone" dataKey={snapshotMetric} stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorMetric)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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

          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-2xl font-black text-gray-900 mb-8">Get in Touch</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <a 
                href="https://www.instagram.com/devzonik/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-4 bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all group w-full md:w-auto"
              >
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Follow Us</p>
                  <p className="text-lg font-bold text-gray-900">@devzonik</p>
                </div>
              </a>

              <a 
                href="mailto:Devzonik@gmail.com" 
                className="flex items-center space-x-4 bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all group w-full md:w-auto"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-bold text-gray-900">Devzonik@gmail.com</p>
                </div>
              </a>
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

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Life Stats Calculator`;
      
      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt);
      }

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', post.keywords.join(', '));

      // Add JSON-LD BlogPosting schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'blog-json-ld';
      const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
          "@type": "Organization",
          "name": "LifeStats Editorial"
        },
        "image": `https://picsum.photos/seed/${post.slug}/1200/800`,
        "publisher": {
          "@type": "Organization",
          "name": "Life Stats Calculator",
          "logo": {
            "@type": "ImageObject",
            "url": "https://picsum.photos/seed/life-stats/200/200"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        }
      };
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      document.title = "Life Stats Calculator: How Long Have I Been Alive? | Days Alive & Biological Age";
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', "Calculate your life statistics with our Life Stats Calculator. Discover exactly how many days, seconds, and hours you've been alive. Learn about biological age, longevity, and life milestones.");
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', "life stats calculator, days alive calculator, seconds alive calculator, how long have I been alive, age in seconds calculator, days since birth, biological age calculator, longevity stats, how many days old am I");
      }

      const script = document.getElementById('blog-json-ld');
      if (script) {
        script.remove();
      }
    };
  }, [post]);

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

        <header className="mb-12">
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6 font-bold uppercase tracking-widest">
            <span>{post.date}</span>
            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
            <span className="text-indigo-600">{post.tags.join(', ')}</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-8 leading-[1.15]">
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

        <div className="aspect-[16/9] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
          <img 
            src={`https://picsum.photos/seed/${post.slug}/1200/800`} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-indigo prose-xl max-w-none text-gray-600 leading-relaxed font-medium">
          <Markdown
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-black text-gray-900 mt-16 mb-8 leading-tight">{children}</h1>,
              h2: ({ children }) => <h2 className="text-3xl font-black text-gray-900 mt-14 mb-6 leading-tight">{children}</h2>,
              h3: ({ children }) => <h3 className="text-2xl font-black text-gray-900 mt-12 mb-5 leading-tight">{children}</h3>,
              p: ({ children }) => <p className="mb-8">{children}</p>,
              li: ({ children }) => <li className="ml-6 mb-4 list-disc marker:text-indigo-600">{children}</li>,
              ul: ({ children }) => <ul className="mb-8 list-disc pl-6 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal mb-8 pl-6 space-y-2">{children}</ol>,
              a: ({ href, children }) => {
                const isInternal = href?.startsWith('/');
                if (isInternal) {
                  return <Link to={href!} className="text-indigo-600 hover:text-indigo-800 underline font-black">{children}</Link>;
                }
                return <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline font-black">{children}</a>;
              },
              img: ({ src, alt }) => <img src={src} alt={alt} className="w-full rounded-[2.5rem] my-12 shadow-xl object-cover" referrerPolicy="no-referrer" />,
              table: ({ children }) => <div className="overflow-x-auto my-12 border border-gray-100 rounded-3xl shadow-sm"><table className="w-full text-left border-collapse">{children}</table></div>,
              thead: ({ children }) => <thead className="bg-gray-50 border-b border-gray-100">{children}</thead>,
              tbody: ({ children }) => <tbody>{children}</tbody>,
              tr: ({ children }) => <tr className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">{children}</tr>,
              th: ({ children }) => <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-wider">{children}</th>,
              td: ({ children }) => <td className="p-4 text-sm font-bold text-gray-700">{children}</td>,
              strong: ({ children }) => <strong className="font-black text-gray-900">{children}</strong>
            }}
          >
            {post.content}
          </Markdown>
        </div>

        {/* Try your Life Stats CTA */}
        <div className="mt-16 p-12 bg-indigo-600 rounded-[3rem] text-white text-center shadow-2xl shadow-indigo-200 relative overflow-hidden group">
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

        <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-8">
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
}

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
