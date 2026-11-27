import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, ArrowLeft, BookOpen, ShieldCheck, BarChart3, Users, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../blogData';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';

    document.title = "About Us - LifeStats Calculator & Editorial Methodology";
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Learn about LifeStats (lifestats.online), our chronological and biological life-statistics engine, public CDC and UN data methodology, and privacy-first architecture."
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  const pillars = [
    {
      icon: BarChart3,
      title: "Verified Public Data Sources",
      description:
        "Our longevity articles and demographic benchmarks cite primary reports from the CDC National Center for Health Statistics (NCHS), the UN World Population Prospects, and the U.S. Bureau of Labor Statistics (ATUS).",
    },
    {
      icon: ShieldCheck,
      title: "100% Client-Side Privacy",
      description:
        "Your birthdate, time of birth, and life comparison inputs are processed directly inside your browser. LifeStats never transmits or stores your personal timeline inputs on external servers.",
    },
    {
      icon: BookOpen,
      title: "Editorial Rigor & Transparency",
      description:
        `Maintained by the LifeStats Editorial Data & Science Desk, our library of ${BLOG_POSTS.length} English-language guides is structured with clear methodology notes, dated updates, and transparent source attributions.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Life Calculator</span>
          </Link>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-50/60 rounded-full -mr-20 -mt-20 -z-10" />
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6">
            <Clock className="w-3.5 h-3.5" />
            <span>About lifestats.online</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-5 leading-tight">
            Turning Time Into Clear, Actionable Perspective
          </h1>
          <p className="text-gray-600 text-lg font-medium max-w-3xl leading-relaxed">
            LifeStats Calculator (<strong className="text-gray-900">lifestats.online</strong>) is an independent web utility and data-journalism publication dedicated to helping people visualize how long they have lived, understand demographic longevity trends, and make more intentional use of their time.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black text-gray-900 mb-2">{pillar.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Methodology & Ownership */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm space-y-10 text-gray-700 leading-relaxed mb-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900">How Our Calculations Work</h2>
            <p>
              Our core calculator combines exact calendar arithmetic—accounting for leap years, varying month lengths, and real-time second counters—with well-established physiological and lifestyle baseline models:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
              <li>
                <strong>Chronological Breakdown:</strong> Computes exact years, months, days, weeks, hours, minutes, and seconds elapsed since birth, along with countdowns to major milestones such as 10,000 days alive.
              </li>
              <li>
                <strong>Physiological Estimates:</strong> Models cumulative heartbeats (~72 BPM resting average), breaths (~14 per minute), eye blinks (~15 per minute), and lifetime sleep hours (~7.5 hours/day).
              </li>
              <li>
                <strong>Comparison &amp; Historical Context:</strong> Allows side-by-side timeline comparisons with friends, family, or historical figures to put personal milestones in broader perspective.
              </li>
            </ul>
            <p className="text-sm text-gray-500">
              Note: All biological and lifespan figures in the interactive calculator are statistical estimates for informational reflection. Please review our{' '}
              <Link to="/disclaimer" className="text-indigo-600 font-bold underline">
                Medical &amp; Statistical Disclaimer
              </Link>{' '}
              for full details.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              <span>Who Operates LifeStats</span>
            </h2>
            <p>
              LifeStats is built and maintained by an independent digital product and data-editorial team (<strong className="text-gray-900">LifeStats Editorial — Data &amp; Science Desk</strong>). We independently write, verify, and update our tools and educational articles whenever major national and global demographic reports are published.
            </p>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
                <div className="text-sm">
                  <p className="font-black text-gray-900">Publisher &amp; Editorial Contact</p>
                  <p className="text-gray-600">Email: <a href="mailto:devzonik@gmail.com" className="text-indigo-600 font-bold underline">devzonik@gmail.com</a></p>
                </div>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-5 py-2.5 rounded-full text-xs transition-colors shrink-0"
              >
                <span>Open Contact Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="bg-indigo-600 rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-100">
          <div>
            <h3 className="text-2xl font-black mb-1">Explore Your Personal Life Numbers</h3>
            <p className="text-indigo-100 text-sm font-medium">
              Try the calculator or browse our data-backed guides on longevity and time.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/"
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-black px-6 py-3 rounded-full text-sm transition-colors"
            >
              Launch Calculator
            </Link>
            <Link
              to="/blog"
              className="bg-indigo-500 text-white hover:bg-indigo-400 font-black px-6 py-3 rounded-full text-sm transition-colors"
            >
              Read Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
