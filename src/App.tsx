/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
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
  ArrowLeft,
  BookOpen,
  HelpCircle,
  ExternalLink,
  Wind,
  Skull,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Markdown from 'react-markdown';

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
  breaths: number;
  blinks: number;
  steps: number;
  meals: number;
  sleepHours: number;
  phoneHours: number;
}

// --- Constants ---

const AVG_SLEEP_PER_DAY = 8;
const AVG_MEALS_PER_DAY = 3;
const AVG_STEPS_PER_DAY = 5000;
const AVG_BLINKS_PER_MIN = 15;
const AVG_HEART_RATE_MALE = 70;
const AVG_HEART_RATE_FEMALE = 75;
const AVG_BREATHS_PER_MIN = 12;
const GLOBAL_AVG_LIFESPAN_YEARS = 80;

// --- Blog Data ---

const BLOG_POSTS = [
  {
    title: "How Many Seconds Have You Been Alive?",
    excerpt: "Time is our most precious resource. Discover the exact breakdown of your life in seconds and why tracking time milestones can change your perspective on life.",
    date: "March 15, 2026",
    slug: "seconds-alive",
    tags: ["Time", "Milestones", "Calculations"],
    content: `
# How Many Seconds Have You Been Alive?

Have you ever stopped to think about the sheer magnitude of your existence? While we usually measure our lives in years, the true granularity of our journey is found in seconds.

## The Power of Small Units
Every second is a heartbeat, a thought, or a breath. When you use an **age in seconds calculator**, you realize that a 30-year-old has lived for nearly 1 billion seconds. This perspective shifts our focus from the "big picture" to the present moment.

## Why Track Seconds?
1. **Mindfulness**: Realizing that a second has passed reminds us to stay present.
2. **Milestones**: Celebrating your 1 billionth second (at age 31.7) is a unique way to honor your journey.
3. **Accuracy**: Our **seconds alive calculator** provides a real-time look at your life's progression.

[Calculate your stats now](/)
    `
  },
  {
    title: "How Many Heartbeats in a Lifetime?",
    excerpt: "Your heart is a tireless engine. Learn how many times it beats in a day, a year, and a full lifetime based on your fitness level and biological age.",
    date: "March 10, 2026",
    slug: "heartbeats-lifetime",
    tags: ["Health", "Biology", "Calculations"],
    content: `
# How Many Heartbeats in a Lifetime?

Your heart is the most hardworking muscle in your body. From the moment you are born until your final breath, it never takes a break.

## The Math of the Heart
On average, a human heart beats about 100,000 times a day. Over a year, that's 36.5 million beats. If you live to be 80, your heart will have beaten nearly 3 billion times.

## Factors That Influence Heart Rate
- **Fitness**: Athletes often have lower resting heart rates, meaning their hearts are more efficient.
- **Stress**: High stress can increase your heart rate, putting more "wear and tear" on the muscle.
- **Gender**: On average, women have slightly higher resting heart rates than men.

Our **life stats calculator** helps you estimate your total heartbeats based on these biological averages.
    `
  },
  {
    title: "How Many Days Does an Average Person Live?",
    excerpt: "If you live to 80, you have roughly 29,220 days. We explore the statistics of human longevity and how to make every single day count.",
    date: "March 5, 2026",
    slug: "average-days-lived",
    tags: ["Longevity", "Time", "Statistics"],
    content: `
# How Many Days Does an Average Person Live?

The number 29,220 might seem large, but when it represents the total number of days in an 80-year life, it feels surprisingly finite.

## Breaking Down the Days
- **Childhood**: Roughly 6,570 days are spent growing up.
- **Work Life**: Many people spend over 15,000 days in their careers.
- **Sleep**: You'll spend about 9,700 days asleep!

## Making Days Count
Using a **days alive calculator** isn't about counting down; it's about making the days count. When you see exactly how many days you've been on this planet, it encourages you to pursue your passions and cherish your relationships.
    `
  },
  {
    title: "The Science of Sleep: How Much of Your Life is Spent Dreaming?",
    excerpt: "We spend a third of our lives asleep. Dive into the statistics of sleep cycles, REM stages, and how many years you'll spend in the dream world.",
    date: "March 18, 2026",
    slug: "sleep-science",
    tags: ["Sleep", "Health", "Biology"],
    content: `
# The Science of Sleep: Your Life in Dreams

Sleep is not just "down time." It is a vital biological process where your brain processes memories and your body repairs itself.

## The 33% Rule
If you sleep the recommended 8 hours a night, you will spend exactly 33.3% of your life asleep. For an 80-year-old, that's over 26 years of slumber.

## The World of Dreams
We spend about 2 hours every night dreaming during REM sleep. Over a lifetime, that adds up to roughly 6 years of pure dreaming. 

## Sleep and Longevity
Consistent, high-quality sleep is one of the strongest predictors of a long, healthy life. Our calculator shows you exactly how many hours you've likely spent resting since birth.
    `
  },
  {
    title: "Phone Addiction Statistics: Your Life Behind the Screen",
    excerpt: "The average person spends over 4 hours a day on their phone. See the staggering cumulative impact of screen time on your life journey.",
    date: "March 20, 2026",
    slug: "phone-usage-stats",
    tags: ["Technology", "Time", "Habits"],
    content: `
# Phone Addiction: The Cumulative Cost of Screen Time

In the modern age, our smartphones are extensions of ourselves. But have you ever calculated the total time you've spent staring at that glowing rectangle?

## The 4-Hour Average
Spending 4 hours a day on your phone might not feel like much in the moment. However, over a year, that's 1,460 hours—or 60 full days.

## A Lifetime of Scrolling
If you maintain this habit for 50 years, you will have spent over 8 years of your waking life on your phone. 

## Reclaiming Your Time
Our **life stats calculator** includes a phone usage slider so you can see your personal impact. Awareness is the first step toward reclaiming those years for more meaningful activities.
    `
  },
  {
    title: "Life Milestones: Celebrating 10,000 Days and 1 Billion Seconds",
    excerpt: "Forget traditional birthdays. Learn about the 'math milestones' that celebrate your unique journey through time.",
    date: "March 22, 2026",
    slug: "life-milestones",
    tags: ["Milestones", "Time", "Calculations"],
    content: `
# Life Milestones: Beyond the Annual Birthday

While we celebrate our birth date every year, there are other, more unique milestones that happen only a few times in a lifetime.

## 10,000 Days Alive
Reaching 10,000 days is a significant event that occurs when you are approximately 27.4 years old. It's a perfect time to reflect on your first decade of adulthood.

## 1 Billion Seconds
This milestone happens at age 31.7. It's a staggering number that reminds us of the incredible volume of moments we've experienced.

## Why Celebrate Math Birthdays?
These milestones break the routine of annual celebrations and give us a reason to pause and appreciate the mathematical beauty of our lives.
    `
  },
  {
    title: "The Rhythm of Life: Fascinating Facts About Human Breathing",
    excerpt: "You breathe roughly 17,000 times a day. Discover the statistics of your respiratory system and how many breaths you've taken since your first cry.",
    date: "March 24, 2026",
    slug: "breathing-facts",
    tags: ["Health", "Biology", "Statistics"],
    content: `
# The Rhythm of Life: Your Breathing Statistics

Breathing is so automatic that we rarely think about it. Yet, it is the most consistent rhythm in our lives.

## 12 Breaths Per Minute
The average adult takes about 12 to 16 breaths per minute while resting. That's over 17,000 breaths a day and 6.3 million breaths a year.

## The Volume of Air
In a single day, you breathe in enough air to fill a small swimming pool. Over a lifetime, your lungs process millions of cubic feet of oxygen.

## Breathing and Health
Deep breathing techniques can lower your heart rate and reduce stress. Our calculator now includes a **breathing rate stat** to help you visualize this vital life force.
    `
  },
  {
    title: "Mastering Your Time: 5 Tips to Make Every Second Count",
    excerpt: "Time is the only currency you can't earn back. Learn 5 practical strategies to manage your time and live a more intentional life.",
    date: "March 26, 2026",
    slug: "time-management-tips",
    tags: ["Time", "Habits", "Productivity"],
    content: `
# Mastering Your Time: 5 Tips for Intentional Living

If our **life stats calculator** has shown you anything, it's that time is finite. Here is how to make the most of it.

## 1. The 80/20 Rule
Focus on the 20% of activities that produce 80% of your results and happiness.

## 2. Time Blocking
Dedicate specific blocks of time to your most important tasks to avoid the "multitasking trap."

## 3. Audit Your Screen Time
Use our calculator to see how much time you're spending on your phone and decide if that's where you want your years to go.

## 4. Practice Gratitude
Taking a moment each day to be grateful slows down your perception of time and increases well-being.

## 5. Set "Math Milestones"
Celebrate your 10,000th day or 1 billionth second to keep your perspective fresh.
    `
  },
  {
    title: "How Many Weeks in a Lifetime? The 4,000 Weeks Philosophy",
    excerpt: "If you live to 80, you have roughly 4,000 weeks. Discover why this perspective is the ultimate productivity hack for a meaningful life.",
    date: "March 28, 2026",
    slug: "weeks-in-lifetime",
    tags: ["Time", "Longevity", "Philosophy"],
    content: `
# How Many Weeks in a Lifetime?

When we think of life in years, it feels long. When we think of it in days, it feels busy. But when we think of it in weeks, the perspective shifts dramatically.

## The 4,000 Weeks Reality
An 80-year life consists of approximately 4,160 weeks. This number is small enough to visualize on a single sheet of paper. Many people find this "4,000 weeks" perspective to be a powerful wake-up call.

## Why Weeks Matter
1. **Manageability**: A week is the perfect unit for planning and reflection.
2. **Scarcity**: Realizing you have a limited number of "summers" or "winters" left encourages prioritization.
3. **Focus**: It helps you say "no" to things that don't align with your values.

Our **life stats calculator** breaks down your age into weeks so you can see exactly where you are in your 4,000-week journey.
    `
  },
  {
    title: "How Many Meals Will You Eat? A Lifetime of Nutrition",
    excerpt: "From your first bite to your 80,000th meal, discover the staggering statistics of human consumption and nutrition over a lifetime.",
    date: "March 30, 2026",
    slug: "lifetime-meals-stats",
    tags: ["Health", "Biology", "Statistics"],
    content: `
# A Lifetime of Eating: How Many Meals?

Food is the fuel for our journey. But have you ever considered the sheer volume of meals you'll consume over eight decades?

## The 87,000 Meal Journey
If you eat three meals a day for 80 years, you will consume roughly 87,600 meals. This doesn't even include snacks, midnight treats, or celebratory feasts!

## The Impact of Choice
Every meal is an opportunity to nourish your body. Over a lifetime, these choices accumulate to define your health and longevity.
- **Variety**: You'll likely try thousands of different ingredients.
- **Culture**: Meals are where we connect with family and tradition.
- **Sustainability**: The environmental impact of 87,000 meals is significant.

Use our **meals eaten calculator** to see your personal progress and reflect on your nutritional journey.
    `
  },
  {
    title: "Walking Around the World: How Many Steps in a Lifetime?",
    excerpt: "The average person walks the equivalent of five times around the Earth. See the incredible distance you'll cover on your own two feet.",
    date: "April 2, 2026",
    slug: "steps-in-lifetime",
    tags: ["Health", "Biology", "Statistics"],
    content: `
# Walking Around the World: Your Lifetime Steps

Human beings are built to move. Even if you aren't a marathon runner, the cumulative distance you walk over a lifetime is staggering.

## 200 Million Steps
If you average 7,000 steps a day, you will take roughly 200 million steps by age 80. This is equivalent to walking about 110,000 miles.

## Earth's Circumference
The Earth's circumference is about 24,901 miles. This means the average person walks the equivalent of **over four times around the globe** in their lifetime.

## Health Benefits of Walking
- **Longevity**: Consistent walking is linked to a longer life expectancy.
- **Mental Health**: Walking reduces stress and improves mood.
- **Simplicity**: It's the most accessible form of exercise.

Our **steps walked calculator** estimates your total distance based on your age and daily activity levels.
    `
  },
  {
    title: "The Blink of an Eye: How Many Times Do You Blink in a Life?",
    excerpt: "You blink 15 times a minute, but it adds up to millions. Discover the fascinating statistics behind this essential biological reflex.",
    date: "April 5, 2026",
    slug: "lifetime-blinks-stats",
    tags: ["Biology", "Health", "Statistics"],
    content: `
# The Blink of an Eye: Lifetime Statistics

Blinking is a reflex we rarely notice, yet it happens thousands of times every day. It's one of the most consistent biological rhythms we have.

## 400 Million Blinks
On average, a person blinks about 15 to 20 times per minute. Over an 80-year life, that adds up to roughly 420 million blinks.

## Why We Blink
1. **Protection**: Blinking clears away dust and debris.
2. **Moisture**: It spreads tears across the eye to prevent dryness.
3. **Brain Breaks**: Recent studies suggest blinking provides the brain with tiny "mental rests."

## Blinking and Screen Time
Did you know we blink significantly less when looking at screens? This is why "digital eye strain" is so common. Our **blinks calculator** helps you visualize this invisible rhythm of your life.
    `
  },
  {
    title: "Global Longevity: How Life Expectancy Varies by Country",
    excerpt: "Where you live matters. Explore the statistics of life expectancy across the globe and what we can learn from the world's 'Blue Zones'.",
    date: "April 8, 2026",
    slug: "global-life-expectancy",
    tags: ["Longevity", "Statistics", "Health"],
    content: `
# Global Longevity: A World of Statistics

Life expectancy is a powerful indicator of a nation's health and quality of life. But the numbers vary wildly depending on where you are on the map.

## The Global Gap
- **High Longevity**: Countries like Japan, Switzerland, and Singapore often see averages above 84 years.
- **Blue Zones**: Specific regions like Okinawa (Japan) and Sardinia (Italy) are famous for having high concentrations of centenarians.
- **Challenges**: In some developing nations, life expectancy can be as low as 55 years due to healthcare and environmental factors.

## What Can We Learn?
The world's longest-lived people often share common habits:
- **Plant-based diets**
- **Natural movement**
- **Strong social connections**
- **A sense of purpose (Ikigai)**

Our **death clock calculator** uses a global average of 80 years, but your personal journey is influenced by your environment and lifestyle choices.
    `
  },
  {
    title: "How Many Liters of Blood Does Your Heart Pump?",
    excerpt: "Your heart is a powerful pump. Discover the staggering volume of blood that circulates through your body in a day, a year, and a full lifetime.",
    date: "April 10, 2026",
    slug: "blood-pumped-stats",
    tags: ["Health", "Biology", "Heart"],
    content: `
# How Many Liters of Blood Does Your Heart Pump?

Your heart is a marvel of biological engineering. While it's only about the size of your fist, its power is immense.

## The Daily Circulation
On average, a healthy heart pumps about 5 liters of blood every minute. That's 300 liters an hour, 7,200 liters a day, and over 2.6 million liters a year!

## A Lifetime of Flow
If you live to be 80, your heart will have pumped roughly 210 million liters of blood. To put that into perspective, that's enough to fill about 84 Olympic-sized swimming pools.

## Why Heart Efficiency Matters
- **Oxygen Delivery**: Every liter of blood carries vital oxygen to your organs.
- **Waste Removal**: Your blood also carries carbon dioxide and other waste products away.
- **Longevity**: A strong heart is the foundation of a long life.

Our **heart stats calculator** helps you visualize this incredible volume of life-sustaining fluid.
    `
  },
  {
    title: "How Many Words Will You Speak in Your Lifetime?",
    excerpt: "From your first word to your final sentence, discover the statistics of human communication and how many words you'll likely speak.",
    date: "April 12, 2026",
    slug: "words-spoken-stats",
    tags: ["Communication", "Social", "Statistics"],
    content: `
# How Many Words Will You Speak in Your Lifetime?

Human beings are social creatures, and communication is at the heart of our experience. But have you ever wondered about the sheer volume of your speech?

## The Daily Word Count
Studies suggest that the average person speaks between 7,000 and 20,000 words per day. This varies based on personality, profession, and social environment.

## A Lifetime of Conversation
If we take an average of 15,000 words per day, over an 80-year life, you will speak roughly 438 million words. That's enough to fill a library of over 4,000 thick novels!

## The Power of Words
- **Connection**: Words are the bridges we build between ourselves and others.
- **Influence**: A single word can change the course of a day or a life.
- **Legacy**: What we say defines how we are remembered.

Use our **words spoken calculator** to estimate your personal total and reflect on the impact of your voice.
    `
  },
  {
    title: "The Statistics of Laughter: How Many Times Will You Laugh?",
    excerpt: "Laughter is the best medicine. Discover how many times you'll laugh in a lifetime and the science behind why we find things funny.",
    date: "April 15, 2026",
    slug: "laughter-stats",
    tags: ["Happiness", "Health", "Social"],
    content: `
# The Statistics of Laughter: Your Lifetime Joy

Laughter is a universal human language. It reduces stress, boosts the immune system, and connects us with others.

## Children vs. Adults
Did you know that children laugh about 300 to 400 times a day, while the average adult only laughs about 15 to 20 times? As we grow older, we often lose our sense of play.

## A Lifetime of Giggles
Over an 80-year life, an average adult will laugh roughly 500,000 times. While this sounds like a lot, it's significantly less than we did as children.

## The Health Benefits of Laughter
- **Stress Relief**: Laughter triggers the release of endorphins, the body's natural feel-good chemicals.
- **Heart Health**: It improves the function of blood vessels and increases blood flow.
- **Social Bonding**: Shared laughter is one of the strongest social glues.

Our **laughter calculator** encourages you to find more reasons to smile every day.
    `
  },
  {
    title: "How Many People Will You Meet in Your Lifetime?",
    excerpt: "From fleeting encounters to lifelong friendships, see the statistics of human connection and how many people you'll cross paths with.",
    date: "April 18, 2026",
    slug: "people-met-stats",
    tags: ["Social", "Connection", "Statistics"],
    content: `
# How Many People Will You Meet in Your Lifetime?

Every person you meet is a new world of experiences and stories. But what is the total number of people you'll actually encounter?

## The Dunbar Number
Anthropologist Robin Dunbar suggested that humans can only maintain about 150 stable social relationships. However, the number of people we *meet* is much higher.

## The 80,000 Encounter
Estimates suggest that the average person will meet roughly 80,000 people in their lifetime. This includes everyone from your best friend to the person you passed on the street once.

## Types of Connections
- **Intimate Circle**: 5-15 people.
- **Friends**: 50-150 people.
- **Acquaintances**: 500-1,500 people.
- **Fleeting Encounters**: The remaining 78,000+.

Our **social stats calculator** helps you visualize the vast web of human connection you are a part of.
    `
  },
  {
    title: "Waiting in Line: How Much of Your Life is Spent in Queues?",
    excerpt: "Patience is a virtue, but waiting is a reality. Discover the staggering amount of time you'll spend waiting in line over your lifetime.",
    date: "April 20, 2026",
    slug: "waiting-in-line-stats",
    tags: ["Time", "Habits", "Statistics"],
    content: `
# Waiting in Line: The Statistics of Patience

Whether it's at the grocery store, the DMV, or for the latest tech gadget, waiting in line is a universal human experience.

## The 6-Month Wait
Studies suggest that the average person spends about 6 months of their life waiting in line. That's roughly 4,300 hours of standing and waiting.

## Where We Wait
- **Grocery Stores**: The most common place for queuing.
- **Traffic Lights**: We spend months of our lives waiting for the light to turn green.
- **Doctor's Offices**: A significant source of "waiting room" time.

## Reclaiming the Wait
Instead of seeing waiting as lost time, many people use it for:
- **Mindfulness**: Practicing presence in the moment.
- **Learning**: Listening to podcasts or audiobooks.
- **Connection**: Chatting with the person next to you.

Use our **time spent waiting calculator** to see your personal impact and find ways to reclaim those hours.
    `
  },
  {
    title: "How Many Liters of Water Will You Drink in a Lifetime?",
    excerpt: "Hydration is the key to life. Discover the total volume of water you'll consume and why every glass matters for your longevity.",
    date: "April 22, 2026",
    slug: "water-consumption-stats",
    tags: ["Health", "Biology", "Hydration"],
    content: `
# How Many Liters of Water Will You Drink in a Lifetime?

Water is the most essential nutrient for the human body. We are made of it, and we cannot survive without it.

## The Daily 2 Liters
If you follow the common advice to drink 2 liters of water a day, you will consume 730 liters a year.

## A Lifetime of Hydration
Over an 80-year life, that adds up to roughly 58,400 liters of water. That's enough to fill a large backyard swimming pool!

## The Importance of Water
- **Cellular Function**: Every cell in your body needs water to work.
- **Temperature Regulation**: Sweating is your body's way of staying cool.
- **Brain Power**: Even mild dehydration can impact your focus and memory.

Our **hydration calculator** shows you exactly how much of this life-giving fluid you've likely consumed since birth.
    `
  },
  {
    title: "The Math of Hair Growth: How Many Miles of Hair Will You Grow?",
    excerpt: "Your hair is constantly growing. Discover the incredible cumulative length of hair your body produces over a full lifetime.",
    date: "April 25, 2026",
    slug: "hair-growth-stats",
    tags: ["Biology", "Health", "Statistics"],
    content: `
# The Math of Hair Growth: Your Lifetime Length

While you might only see a few inches of growth between haircuts, your body is a hair-growing machine.

## The 6-Inch Average
On average, human hair grows about 0.5 inches per month, or 6 inches per year. This varies by genetics, age, and health.

## A Lifetime of Length
If you never cut your hair for 80 years, a single strand could theoretically reach 40 feet. But when you consider all the hairs on your head (about 100,000), the total length grown is over 600 miles!

## Fascinating Hair Facts
- **Strength**: A single strand of hair can support up to 100 grams of weight.
- **Lifespan**: Each hair stays on your head for 2 to 7 years before falling out.
- **Diversity**: Hair texture and color are some of our most unique physical traits.

Our **biology stats calculator** includes a fun look at your cumulative hair growth over the years.
    `
  },
  {
    title: "How Many Times Will You Sneeze in a Lifetime?",
    excerpt: "Bless you! Discover the statistics behind the sneeze and how many times this powerful reflex will occur in your life.",
    date: "April 28, 2026",
    slug: "sneeze-stats",
    tags: ["Biology", "Health", "Reflexes"],
    content: `
# How Many Times Will You Sneeze in a Lifetime?

A sneeze is a powerful biological reflex designed to clear your nasal cavity. It's fast, loud, and happens to everyone.

## The Occasional Sneeze
Most people sneeze about 1 to 3 times a day on average, though this increases significantly during allergy season or when you have a cold.

## A Lifetime of "Achoos"
If we average 2 sneezes a day, over an 80-year life, you will sneeze roughly 58,400 times. 

## The Science of the Sneeze
- **Speed**: A sneeze can travel at speeds of up to 100 miles per hour.
- **Distance**: It can spray droplets up to 30 feet away!
- **Reset**: Some scientists believe sneezing is like a "reboot" for the nose's internal environment.

Use our **reflex calculator** to see your personal sneeze estimate and learn more about your body's defense mechanisms.
    `
  },
  {
    title: "The Statistics of Crying: How Many Liters of Tears?",
    excerpt: "Tears are a natural part of the human experience. Discover the statistics of crying and the different types of tears we produce.",
    date: "May 1, 2026",
    slug: "crying-stats",
    tags: ["Emotional", "Health", "Biology"],
    content: `
# The Statistics of Crying: Your Lifetime Tears

Crying is a complex human behavior that serves both biological and emotional purposes. It's how we express grief, joy, and even physical pain.

## The Volume of Tears
On average, a person produces about 15 to 30 gallons of tears each year. Most of these are "basal tears" that keep our eyes moist and healthy.

## Emotional Tears
Women cry an average of 30 to 64 times a year, while men cry about 6 to 17 times. This adds up to thousands of emotional releases over a lifetime.

## Types of Tears
1. **Basal Tears**: Constant moisture for eye health.
2. **Reflex Tears**: Triggered by irritants like onions or smoke.
3. **Emotional Tears**: Contain higher levels of stress hormones.

Our **emotional stats calculator** provides a sensitive look at this vital human expression.
    `
  },
  {
    title: "How Many Hours Will You Spend Commuting?",
    excerpt: "The journey to work adds up. Discover the total time you'll spend commuting over your career and how to make that time more productive.",
    date: "May 4, 2026",
    slug: "commute-time-stats",
    tags: ["Time", "Work", "Habits"],
    content: `
# How Many Hours Will You Spend Commuting?

For many of us, the commute is a daily ritual. Whether by car, train, or bike, the time spent traveling to work has a massive cumulative impact.

## The 1-Hour Average
The average daily commute is about 54 minutes round-trip. Over a 40-year career, that adds up to over 9,000 hours—or more than a full year of your life.

## The Cost of Commuting
- **Time**: It's time away from family, hobbies, and rest.
- **Stress**: Traffic and delays can significantly impact mental well-being.
- **Environment**: Commuting is a major contributor to carbon emissions.

## Reclaiming the Commute
- **Podcasts**: Turn your car into a classroom.
- **Active Commuting**: Biking or walking turns travel into exercise.
- **Remote Work**: The rise of home offices is saving millions of hours globally.

Our **commute calculator** helps you visualize your personal travel time and find ways to optimize your daily journey.
    `
  }
];

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
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, slug }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group">
    <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">{date}</span>
    <h3 className="text-xl font-bold text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
    <p className="text-slate-600 mt-3 text-sm line-clamp-2">{excerpt}</p>
    <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm">
      Read More <TrendingUp className="w-4 h-4 ml-1" />
    </div>
  </div>
);

const ComparisonCard = ({ icon: Icon, label, current, total, unit, color, iconBg }: { icon: any, label: string, current: number, total: number, unit: string, color: string, iconBg: string }) => {
  const percentage = Math.min((current / total) * 100, 100);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileHover={{ y: -8, scale: 1.02 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-indigo-200/40 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[280px]"
    >
      <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full ${iconBg} opacity-[0.06] blur-[60px] group-hover:opacity-[0.12] transition-opacity duration-700`} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-2xl ${iconBg} text-white shadow-lg transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-500`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter leading-none mb-1">{percentage.toFixed(1)}%</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Journey</div>
          </div>
        </div>

        <div className="space-y-1 mb-6">
          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</h4>
          <div className="flex items-baseline gap-2">
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              {new Intl.NumberFormat().format(Math.floor(current))}
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-400">{unit}</div>
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
              <motion.div 
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3 skew-x-12"
              />
            </motion.div>
          </div>
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
            <span className="text-xs font-bold text-slate-700">{new Intl.NumberFormat().format(total)} {unit}</span>
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

// --- Pages ---

const BlogPage = () => {
  useEffect(() => {
    document.title = "Life Statistics & Longevity Blog | Life Stats Calculator";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <Helmet>
        <title>Life Statistics & Longevity Blog | Life Stats Calculator</title>
        <meta name="description" content="Explore our blog for fascinating insights into human longevity, time statistics, and biological milestones. Learn how many seconds, heartbeats, and days make up a lifetime." />
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-indigo-600 font-bold mb-8 hover:text-indigo-700 transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Calculator
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-4xl font-black text-slate-900">Life Statistics & Longevity Blog</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full md:w-64"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, i) => (
            <Link key={i} to={`/blog/${post.slug}`}>
              <BlogCard title={post.title} excerpt={post.excerpt} date={post.date} slug={post.slug} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/blog');
    } else {
      window.scrollTo(0, 0);
    }
  }, [post, navigate]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <Helmet>
        <title>{post.title} | Life Stats Calculator Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Helmet>
      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-indigo-600 font-bold mb-8 hover:text-indigo-700 transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Blog
        </Link>
        
        <header className="mb-12">
          <div className="text-indigo-600 font-black text-sm uppercase tracking-widest mb-4">{post.date}</div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">{post.title}</h1>
          <div className="flex items-center gap-4 border-y border-slate-100 py-6">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">LS</div>
            <div>
              <div className="font-bold text-slate-900">Life Stats Editorial Team</div>
              <div className="text-xs text-slate-500">Expert in Longevity & Time Statistics</div>
            </div>
          </div>
        </header>

        <div className="prose prose-slate lg:prose-lg max-w-none">
          <div className="markdown-body">
            <Markdown>{post.content}</Markdown>
          </div>
        </div>

        {/* Related Posts Section */}
        {(() => {
          const relatedPosts = BLOG_POSTS.filter(p => 
            p.slug !== slug && 
            p.tags && post.tags &&
            p.tags.some(tag => post.tags.includes(tag))
          ).slice(0, 3);

          if (relatedPosts.length === 0) return null;

          return (
            <section className="mt-20">
              <h2 className="text-2xl font-black text-slate-900 mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, i) => (
                  <Link key={i} to={`/blog/${relatedPost.slug}`}>
                    <BlogCard 
                      title={relatedPost.title} 
                      excerpt={relatedPost.excerpt} 
                      date={relatedPost.date} 
                      slug={relatedPost.slug} 
                    />
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        <footer className="mt-16 pt-12 border-t border-slate-100">
          <div className="bg-slate-50 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-4">How long have you been alive?</h3>
            <p className="text-slate-600 mb-8">Use our advanced calculator to discover your own unique life statistics.</p>
            <Link to="/" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Calculate My Stats
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
};

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <Helmet>
        <title>Privacy Policy | Life Stats Calculator</title>
        <meta name="description" content="Read our privacy policy to understand how we handle your data. We prioritize your privacy and do not store personal birthdate information." />
      </Helmet>
      <article className="max-w-3xl mx-auto prose prose-slate">
        <Link to="/" className="inline-flex items-center text-indigo-600 font-bold mb-8 hover:text-indigo-700 transition-colors group no-underline">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <h1 className="text-4xl font-black text-slate-900 mb-8">Privacy Policy</h1>
        <p className="text-slate-600">Last Updated: March 17, 2026</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">1. Introduction</h2>
        <p>Welcome to Life Stats Calculator. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">2. Information We Do Not Collect</h2>
        <p>Our application is designed to be a client-side tool. This means that when you enter your birthdate into our calculator, that information is processed locally in your browser. We do not store, save, or transmit your birthdate to any external servers.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">3. Cookies and Tracking</h2>
        <p>We may use basic analytics tools to understand how users interact with our site. These tools may use cookies to collect non-personal information such as browser type, operating system, and pages visited. This data is used solely to improve the user experience of our website.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">4. Third-Party Links</h2>
        <p>Our website may contain links to other websites. Please be aware that we are not responsible for the privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of each and every website that collects personally identifiable information.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">5. Changes to This Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">6. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us via our website.</p>
      </article>
    </div>
  );
};

const TermsOfServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <Helmet>
        <title>Terms of Service | Life Stats Calculator</title>
        <meta name="description" content="Review the terms of service for using Life Stats Calculator. Understand the conditions and guidelines for our website usage." />
      </Helmet>
      <article className="max-w-3xl mx-auto prose prose-slate">
        <Link to="/" className="inline-flex items-center text-indigo-600 font-bold mb-8 hover:text-indigo-700 transition-colors group no-underline">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <h1 className="text-4xl font-black text-slate-900 mb-8">Terms of Service</h1>
        <p className="text-slate-600">Last Updated: March 17, 2026</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">1. Acceptance of Terms</h2>
        <p>By accessing and using Life Stats Calculator, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">2. Description of Service</h2>
        <p>Life Stats Calculator provides users with a tool to calculate various life statistics based on a provided birthdate. The service is provided "as is" and for informational and entertainment purposes only.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">3. Disclaimer of Warranties</h2>
        <p>The information provided by Life Stats Calculator is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">4. Limitation of Liability</h2>
        <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">5. Intellectual Property</h2>
        <p>The content, layout, design, data, databases and graphics on this website are protected by intellectual property laws and are owned by Life Stats Calculator unless otherwise stated.</p>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-12">6. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
      </article>
    </div>
  );
};

const HomePage = () => {
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
      days, weeks, months, years, hours, minutes, seconds,
      heartbeats: minutes * bpm,
      breaths: minutes * AVG_BREATHS_PER_MIN,
      blinks: minutes * AVG_BLINKS_PER_MIN,
      steps: days * AVG_STEPS_PER_DAY,
      meals: days * AVG_MEALS_PER_DAY,
      sleepHours: days * AVG_SLEEP_PER_DAY,
      phoneHours: days * phoneUsage
    };
  }, [birthDate, gender, phoneUsage]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthDate) setShowResults(true);
  };

  const formatNum = (num: number) => new Intl.NumberFormat().format(num);

  const handleShare = async () => {
    if (!stats) return;
    const shareText = `My Life Stats: ${formatNum(stats.days)} days alive, ${formatNum(stats.heartbeats)} heartbeats! Check yours at: ${window.location.href}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Life Stats', text: shareText, url: window.location.href });
      } catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Stats copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Life Stats Calculator: How Long Have I Been Alive?</title>
        <meta name="description" content="Calculate your life statistics with our Life Stats Calculator. Discover exactly how many days, seconds, and hours you've been alive, plus heartbeats, blinks, and more." />
        <meta property="og:title" content="Life Stats Calculator: How Long Have I Been Alive?" />
        <meta property="og:description" content="Discover your life in numbers: days, seconds, heartbeats, and more with our advanced Life Stats Calculator." />
      </Helmet>
      {/* Hero / Intro Section */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Clock className="w-4 h-4" /> Discover Your Life in Numbers
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Life Stats Calculator
          </h1>
          <div className="prose prose-slate max-w-3xl mx-auto text-slate-600 leading-relaxed text-lg">
            <p>
              Welcome to the most comprehensive <strong>life stats calculator</strong> available online. Have you ever paused to wonder, 
              "<strong>how long have I been alive</strong>?" or wanted to know your exact <strong>age in seconds calculator</strong> result? 
              Our tool provides a deep dive into your personal history, converting your existence into fascinating data points.
            </p>
            <p>
              Whether you're looking for a <strong>days alive calculator</strong> or a <strong>seconds alive calculator</strong>, 
              we provide real-time accuracy. Beyond just time, we estimate biological milestones like your total heartbeats, 
              the number of times you've blinked, and even how many miles you've likely walked since your first steps.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Tool Section */}
        <section id="calculator" className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 mb-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Enter Your Details</h2>
          <form onSubmit={handleCalculate} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-500" /> Birth Date
                </label>
                <input 
                  type="date" 
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" /> Gender
                </label>
                <div className="flex p-1 bg-slate-100 rounded-2xl">
                  <button 
                    type="button"
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${gender === 'male' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                  >
                    Male
                  </button>
                  <button 
                    type="button"
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${gender === 'female' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                  >
                    Female
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-500" /> Daily Phone Usage
                </label>
                <span className="text-indigo-600 font-black">{phoneUsage} Hours</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="24" 
                step="0.5"
                value={phoneUsage}
                onChange={(e) => setPhoneUsage(parseFloat(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] text-lg"
            >
              Calculate My Life Stats
            </button>
          </form>
        </section>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && stats && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-24 mb-24"
            >
              {/* Life Progress Overview */}
              <section className="relative">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 text-white overflow-hidden relative shadow-2xl shadow-indigo-900/20"
                >
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
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
                      <div className="relative w-48 h-48 md:w-64 md:h-64">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="50%" cy="50%" r="45%" className="stroke-slate-800 fill-none" strokeWidth="10" />
                          <motion.circle
                            cx="50%" cy="50%" r="45%"
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
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Life Progress</span>
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <ComparisonCard 
                    icon={Calendar} label="Days Alive" current={stats.days} total={29220} unit="Days" color="bg-indigo-500" iconBg="bg-indigo-500"
                  />
                  <ComparisonCard 
                    icon={Heart} label="Heartbeats" current={stats.heartbeats} total={3000000000} unit="Beats" color="bg-rose-500" iconBg="bg-rose-500"
                  />
                  <ComparisonCard 
                    icon={Footprints} label="Steps Walked" current={stats.steps} total={146100000} unit="Steps" color="bg-emerald-500" iconBg="bg-emerald-500"
                  />
                  <ComparisonCard 
                    icon={Moon} label="Sleep Time" current={stats.sleepHours} total={233760} unit="Hours" color="bg-slate-800" iconBg="bg-slate-800"
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
                    <StatCard icon={Wind} label="Breathing Rate" value={formatNum(stats.breaths)} color="bg-blue-400" />
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
                  {(() => {
                    const birth = new Date(birthDate);
                    const now = new Date();
                    let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
                    if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
                    const days = Math.ceil((nextBday.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
                    return (
                      <PredictionCard 
                        icon={Calendar} label="Next Birthday"
                        date={nextBday.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        subtext={`In ${days} days`} color="bg-indigo-500" bg="bg-white"
                      />
                    );
                  })()}

                  {(() => {
                    const birth = new Date(birthDate);
                    const s1b = new Date(birth.getTime() + 1000000000 * 1000);
                    const now = new Date();
                    const diff = Math.ceil((s1b.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
                    return (
                      <PredictionCard 
                        icon={Clock} label="1 Billion Seconds Age"
                        date={s1b.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        subtext={diff > 0 ? `In ${formatNum(diff)} days` : 'Already passed!'} color="bg-amber-500" bg="bg-amber-50/30"
                      />
                    );
                  })()}

                  <PredictionCard 
                    icon={TrendingUp} label="Age in 2030" date={`${2030 - new Date(birthDate).getFullYear()} Years Old`} subtext="January 1st, 2030" color="bg-emerald-500" bg="bg-white"
                  />
                  <PredictionCard 
                    icon={TrendingUp} label="Age in 2040" date={`${2040 - new Date(birthDate).getFullYear()} Years Old`} subtext="January 1st, 2040" color="bg-blue-500" bg="bg-white"
                  />
                  <PredictionCard 
                    icon={TrendingUp} label="Age in 2050" date={`${2050 - new Date(birthDate).getFullYear()} Years Old`} subtext="January 1st, 2050" color="bg-purple-500" bg="bg-white"
                  />

                  {(() => {
                    const birth = new Date(birthDate);
                    const d10k = new Date(birth.getTime() + 10000 * 24 * 60 * 60 * 1000);
                    const now = new Date();
                    const diff = Math.ceil((d10k.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
                    return (
                      <PredictionCard 
                        icon={Award} label="10,000 Days Age"
                        date={d10k.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        subtext={diff > 0 ? `In ${formatNum(diff)} days` : 'Already passed!'} color="bg-rose-500" bg="bg-rose-50/30"
                      />
                    );
                  })()}

                  {(() => {
                    const birth = new Date(birthDate);
                    const deathDate = new Date(birth.getFullYear() + GLOBAL_AVG_LIFESPAN_YEARS, birth.getMonth(), birth.getDate());
                    const now = new Date();
                    const diffDays = Math.ceil((deathDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
                    return (
                      <PredictionCard 
                        icon={Skull} label="Estimated Death Clock"
                        date={deathDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                        subtext={diffDays > 0 ? `${formatNum(diffDays)} days remaining*` : 'Living on borrowed time!'} color="bg-slate-900" bg="bg-slate-100"
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
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleShare}
                    className="flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all"
                  >
                    <Share2 className="w-5 h-5" /> Share Full Stats
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-16 mb-24">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-slate-900">Understanding Your Life Statistics</h2>
            <p className="text-slate-600 leading-relaxed">
              Our <strong>life stats calculator</strong> is more than just a novelty; it's a window into the sheer magnitude of your existence. 
              When people ask, "<strong>how long have I been alive</strong>?", they often think in terms of years. But your life is composed 
              of millions of minutes and billions of seconds. By using our <strong>seconds alive calculator</strong>, you can appreciate 
              the granularity of time.
            </p>
            <h3 className="text-xl font-bold text-slate-900">Why Use a Days Alive Calculator?</h3>
            <p className="text-slate-600 leading-relaxed">
              Tracking your life in days provides a unique perspective. Reaching 10,000 days (roughly 27.4 years) is a major milestone 
              that often goes unnoticed. Our <strong>days alive calculator</strong> ensures you never miss these mathematical anniversaries. 
              Similarly, an <strong>age in seconds calculator</strong> can show you just how fast the numbers climb—every second is a 
              new record for you!
            </p>
            <h3 className="text-xl font-bold text-slate-900">Biological Stats: Heartbeats and Blinks</h3>
            <p className="text-slate-600 leading-relaxed">
              Did you know that the average human heart beats over 100,000 times a day? Over a lifetime, this adds up to billions. 
              Our tool estimates these biological rhythms based on average rates, giving you a sense of the incredible work your 
              body does every single moment.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-lg">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-500" /> Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              <FAQItem 
                question="How accurate is the Life Stats Calculator?" 
                answer="Our time-based calculations (days, seconds, etc.) are 100% accurate based on the calendar. Biological stats like heartbeats and blinks are estimates based on scientific averages for healthy adults." 
              />
              <FAQItem 
                question="How many seconds have I been alive?" 
                answer="You can find out your exact age in seconds by entering your birthdate above. The number increases by one every single second!" 
              />
              <FAQItem 
                question="What is the 1 billion seconds milestone?" 
                answer="Reaching 1 billion seconds happens when you are approximately 31.7 years old. It is one of the most popular 'math birthdays' people celebrate." 
              />
              <FAQItem 
                question="Does gender affect the heartbeats calculation?" 
                answer="Yes, on average, females tend to have a slightly higher resting heart rate than males. Our calculator adjusts the estimate based on the gender you select." 
              />
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900">From the Blog</h2>
              <p className="text-slate-500 font-medium mt-2">Explore more about time, health, and longevity.</p>
            </div>
            <Link to="/blog" className="text-indigo-600 font-black flex items-center gap-2 hover:underline">
              View All Posts <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <Link key={i} to={`/blog/${post.slug}`}>
                <BlogCard 
                  title={post.title} 
                  excerpt={post.excerpt} 
                  date={post.date} 
                  slug={post.slug}
                />
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 bg-white border-2 border-slate-100 px-8 py-4 rounded-2xl font-black text-slate-900 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm">
              View All Blog Posts <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight">Life Stats Calc</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering people to appreciate the magnitude of their journey through data and statistics. 
              Every second counts.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Quick Links</h3>
            <ul className="space-y-4 text-slate-300 font-medium">
              <li><a href="#calculator" className="hover:text-white transition-colors">Calculator</a></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Internal Links</h3>
            <ul className="space-y-4 text-slate-300 font-medium">
              <li><Link to="/blog" className="hover:text-white transition-colors">How Many Seconds Have I Been Alive?</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Heartbeats in a Lifetime</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Average Human Lifespan</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          &copy; 2026 Life Stats Calculator. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
      </Routes>
    </HelmetProvider>
  );
}
