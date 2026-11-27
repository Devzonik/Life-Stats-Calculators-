import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Cookie, ArrowLeft, Shield, Settings2, ExternalLink, CheckCircle2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  getStoredCookiePreferences,
  openCookieSettingsModal,
  COOKIE_CONSENT_UPDATED_EVENT,
  type CookiePreferences,
} from './CookieConsentBanner';

export default function CookiesPage() {
  const [prefs, setPrefs] = useState<CookiePreferences | null>(() => getStoredCookiePreferences());

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';

    document.title = "Cookie Policy - LifeStats Calculator (lifestats.online)";
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Read the LifeStats Cookie Policy. Learn how lifestats.online uses essential storage, analytics, and Google AdSense cookies, and manage your consent preferences."
      );
    }

    const handleUpdate = () => {
      setPrefs(getStoredCookiePreferences());
    };
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdate);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, handleUpdate);
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  const sections = [
    { id: "what-are-cookies", title: "What Are Cookies?" },
    { id: "how-we-use", title: "How LifeStats Uses Cookies" },
    { id: "cookie-inventory", title: "Cookies & Storage Inventory" },
    { id: "google-adsense", title: "Google AdSense & Personalized Ads" },
    { id: "manage-cookies", title: "How to Manage or Opt Out" },
    { id: "updates", title: "Updates & Contact" },
  ];

  const cookieRows = [
    {
      name: "lifestats_cookie_consent",
      provider: "lifestats.online (localStorage)",
      category: "Strictly Necessary",
      purpose: "Stores your cookie consent choices so the banner does not repeatedly prompt you.",
      duration: "Persistent until cleared",
    },
    {
      name: "life_stats_snapshots",
      provider: "lifestats.online (localStorage)",
      category: "Functional",
      purpose: "Stores optional life statistics comparison snapshots you save locally on your device.",
      duration: "Persistent until deleted",
    },
    {
      name: "__gads / __gpi / IDE / DSID",
      provider: "Google AdSense / DoubleClick",
      category: "Advertising",
      purpose: "Serves advertisements, measures ad campaign performance, limits ad frequency, and enables personalized or non-personalized ads.",
      duration: "Up to 13 months",
    },
    {
      name: "_ga / _gid",
      provider: "Google Analytics (if enabled)",
      category: "Analytics",
      purpose: "Distinguishes aggregated site visits to help improve calculator performance and content usability.",
      duration: "24 hours to 2 years",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Life Calculator</span>
          </Link>
        </div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/60 rounded-full -mr-20 -mt-20 -z-10" />
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6">
            <Cookie className="w-3.5 h-3.5" />
            <span>Transparency &amp; Consent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
            This Cookie Policy explains how LifeStats Calculator (<strong className="text-gray-800">https://lifestats.online</strong>) uses cookies, browser storage, and similar technologies when you visit our website, and how you can control your preferences.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-gray-400">
            <span>Last Updated: November 27, 2026</span>
            <span>•</span>
            <span>Aligned with GDPR, ePrivacy, CCPA, and Google AdSense Publisher Policies</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar TOC */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-3 mb-4">
                Cookie Sections
              </h3>
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block px-3 py-2 text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 rounded-xl transition-all"
                >
                  {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-10">
            {/* Interactive Consent Status Card */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-indigo-900 font-black text-base">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  <span>Your Current Cookie Settings</span>
                </div>
                <p className="text-sm text-indigo-900/80">
                  {prefs
                    ? `Necessary: Active • Advertising: ${prefs.advertising ? 'Allowed' : 'Disabled'} • Analytics: ${prefs.analytics ? 'Allowed' : 'Disabled'}`
                    : 'No custom preference saved yet. You can review or customize your consent choices at any time.'}
                </p>
              </div>
              <button
                type="button"
                onClick={openCookieSettingsModal}
                className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-5 py-3 rounded-full text-sm transition-all shadow-lg shadow-indigo-100 shrink-0"
              >
                <Settings2 className="w-4 h-4" />
                <span>Manage Cookie Settings</span>
              </button>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm space-y-12 text-gray-700 leading-relaxed">
              {/* 1. What are cookies */}
              <section id="what-are-cookies" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  1. What Are Cookies &amp; Local Storage?
                </h2>
                <p>
                  Cookies are small text files stored on your computer, tablet, or smartphone when you load a website. They help websites remember user preferences, keep settings consistent across page views, and support analytics or advertising services.
                </p>
                <p>
                  Modern web applications like LifeStats also use browser <strong>localStorage</strong>. Unlike traditional server cookies, localStorage data stays strictly inside your browser so your saved life-stat snapshots never have to leave your device.
                </p>
              </section>

              {/* 2. How we use */}
              <section id="how-we-use" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  2. Categories of Cookies We Use
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <h3 className="font-black text-gray-900 text-base mb-1.5">Essential &amp; Functional Storage</h3>
                    <p className="text-sm text-gray-600">
                      Necessary for saving your privacy consent choices and powering client-side features like optional saved life-stat snapshots. Your birthdate inputs are calculated in memory and never uploaded to a backend server.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <h3 className="font-black text-gray-900 text-base mb-1.5">Advertising &amp; Measurement Cookies</h3>
                    <p className="text-sm text-gray-600">
                      Used by third-party partners such as Google AdSense to serve ads, prevent repetitive ad impressions, detect invalid traffic, and optionally tailor ads based on prior visits.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. Inventory Table */}
              <section id="cookie-inventory" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  3. Cookies &amp; Browser Storage Inventory
                </h2>
                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500">Name</th>
                        <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500">Provider</th>
                        <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500">Category</th>
                        <th className="p-4 text-xs font-black uppercase tracking-wider text-gray-500">Purpose &amp; Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cookieRows.map((row) => (
                        <tr key={row.name} className="border-b border-gray-50 last:border-b-0 align-top">
                          <td className="p-4 font-bold text-gray-900 whitespace-nowrap">{row.name}</td>
                          <td className="p-4 text-gray-600">{row.provider}</td>
                          <td className="p-4">
                            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 whitespace-nowrap">
                              {row.category}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">
                            <p>{row.purpose}</p>
                            <p className="text-xs text-gray-400 font-semibold mt-1">Duration: {row.duration}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 4. Google AdSense */}
              <section id="google-adsense" className="scroll-mt-24 space-y-4 bg-indigo-50/40 rounded-3xl p-6 md:p-8 border border-indigo-100">
                <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-indigo-600" />
                  4. Google AdSense &amp; Third-Party Advertising
                </h2>
                <p className="text-indigo-950/85">
                  LifeStats displays advertisements provided by <strong>Google AdSense</strong> (Publisher ID: <code className="bg-white px-2 py-0.5 rounded text-xs font-bold border border-indigo-100">pub-9044775476156807</code>) to keep our calculators and research articles free for everyone.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-indigo-950/85">
                  <li>
                    Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to <strong>lifestats.online</strong> or other websites.
                  </li>
                  <li>
                    Google&apos;s use of advertising cookies enables it and its partners to serve ads to our visitors based on their visit to our site and/or other sites on the Internet.
                  </li>
                  <li>
                    Learn how Google uses information from sites or apps that use its services at{' '}
                    <a
                      href="https://policies.google.com/technologies/partner-sites"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 font-bold underline inline-flex items-center gap-1"
                    >
                      <span>Google Partner Sites Policy</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    .
                  </li>
                </ul>
              </section>

              {/* 5. Manage & Opt Out */}
              <section id="manage-cookies" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  5. How to Manage Cookies &amp; Opt Out of Personalized Ads
                </h2>
                <p>
                  You have full control over how cookies are used on your browser. You can update your consent on LifeStats anytime using our <strong>Cookie Settings</strong> button, or opt out across the web through industry tools:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    <strong>Google Ad Settings:</strong> Opt out of personalized advertising directly at{' '}
                    <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold underline">
                      adssettings.google.com
                    </a>.
                  </li>
                  <li>
                    <strong>Digital Advertising Alliance (US):</strong> Opt out of participating third-party ad networks at{' '}
                    <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold underline">
                      aboutads.info/choices
                    </a>.
                  </li>
                  <li>
                    <strong>Network Advertising Initiative (NAI):</strong> Manage multi-vendor ad preferences at{' '}
                    <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold underline">
                      optout.networkadvertising.org
                    </a>.
                  </li>
                  <li>
                    <strong>European Interactive Digital Advertising Alliance (EEA/UK):</strong> Manage preferences at{' '}
                    <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold underline">
                      youronlinechoices.eu
                    </a>.
                  </li>
                  <li>
                    <strong>Browser Controls:</strong> You can delete or block cookies in Chrome, Safari, Firefox, or Edge via Privacy &amp; Security settings. Blocking essential localStorage may reset saved life-stat snapshots.
                  </li>
                </ul>
              </section>

              {/* 6. Updates & Contact */}
              <section id="updates" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  6. Policy Updates &amp; Contact Information
                </h2>
                <p>
                  We may update this Cookie Policy periodically to reflect changes in technology, regulatory requirements, or advertising partners. Please also review our{' '}
                  <Link to="/privacy" className="text-indigo-600 font-bold underline">Privacy Policy</Link>,{' '}
                  <Link to="/terms" className="text-indigo-600 font-bold underline">Terms &amp; Conditions</Link>, and{' '}
                  <Link to="/disclaimer" className="text-indigo-600 font-bold underline">Disclaimer</Link>.
                </p>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-start space-x-3 text-sm">
                  <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    Questions about cookies or data rights? Contact us via our{' '}
                    <Link to="/contact" className="text-indigo-600 font-bold underline">Contact Page</Link>{' '}
                    or email <a href="mailto:devzonik@gmail.com" className="text-indigo-600 font-bold underline">devzonik@gmail.com</a>.
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
