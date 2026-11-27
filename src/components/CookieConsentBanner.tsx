import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, ShieldCheck, Settings2, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CookiePreferences {
  necessary: true;
  advertising: boolean;
  analytics: boolean;
  consentGiven: boolean;
  updatedAt: string;
}

export const COOKIE_CONSENT_KEY = 'lifestats_cookie_consent';
export const OPEN_COOKIE_SETTINGS_EVENT = 'lifestats:open-cookie-settings';
export const COOKIE_CONSENT_UPDATED_EVENT = 'lifestats:cookie-consent-updated';

export function getStoredCookiePreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.consentGiven === 'boolean') {
      return {
        necessary: true,
        advertising: Boolean(parsed.advertising),
        analytics: Boolean(parsed.analytics),
        consentGiven: true,
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function saveCookiePreferences(prefs: Omit<CookiePreferences, 'necessary' | 'consentGiven' | 'updatedAt'>): CookiePreferences {
  const fullPrefs: CookiePreferences = {
    necessary: true,
    advertising: prefs.advertising,
    analytics: prefs.analytics,
    consentGiven: true,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(fullPrefs));
  } catch {
    // Ignore storage quota errors in private browsing
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: fullPrefs }));
  return fullPrefs;
}

export function openCookieSettingsModal() {
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [advertising, setAdvertising] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const stored = getStoredCookiePreferences();
    if (!stored) {
      setShowBanner(true);
    } else {
      setAdvertising(stored.advertising);
      setAnalytics(stored.analytics);
    }

    const handleOpenSettings = () => {
      const latest = getStoredCookiePreferences();
      if (latest) {
        setAdvertising(latest.advertising);
        setAnalytics(latest.analytics);
      }
      setShowModal(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  const handleAcceptAll = () => {
    setAdvertising(true);
    setAnalytics(true);
    saveCookiePreferences({ advertising: true, analytics: true });
    setShowBanner(false);
    setShowModal(false);
  };

  const handleRejectNonEssential = () => {
    setAdvertising(false);
    setAnalytics(false);
    saveCookiePreferences({ advertising: false, analytics: false });
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSaveCustom = () => {
    saveCookiePreferences({ advertising, analytics });
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {/* Floating Consent Banner */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            role="dialog"
            aria-label="Cookie consent"
            className="fixed bottom-4 left-4 right-4 z-50 max-w-5xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-6 md:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-black text-gray-900">
                    Your Privacy &amp; Cookie Choices
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
                    LifeStats calculates all life metrics locally in your browser. We and our advertising partner (Google AdSense) use cookies to remember preferences, measure site traffic, and deliver relevant or non-personalized ads. Read our{' '}
                    <Link to="/cookies" className="text-indigo-600 font-bold underline hover:text-indigo-800">
                      Cookie Policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-indigo-600 font-bold underline hover:text-indigo-800">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 rounded-full text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Granular Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Cookie Preferences"
            className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl max-w-xl w-full overflow-hidden"
            >
              <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">Cookie Preferences</h2>
                    <p className="text-xs text-gray-500 font-medium">Manage consent for lifestats.online</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  aria-label="Close cookie preferences"
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-4 max-h-[65vh] overflow-y-auto">
                {/* Necessary */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-black text-gray-900">Strictly Necessary Storage</h3>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        Always Active
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Required for core site functionality, saving your consent choice, and storing optional life stat snapshots locally in your browser.
                    </p>
                  </div>
                  <div className="w-11 h-6 rounded-full bg-emerald-500 flex items-center justify-end px-1 shrink-0 opacity-80">
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Advertising */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-black text-gray-900 mb-1">Advertising &amp; Personalization (Google AdSense)</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Allows Google AdSense and partner ad networks to use cookies for personalized ads and ad frequency capping. If disabled, non-personalized ads may still appear.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={advertising}
                    aria-label="Toggle Advertising Cookies"
                    onClick={() => setAdvertising(!advertising)}
                    className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${
                      advertising ? 'bg-indigo-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                  </button>
                </div>

                {/* Analytics */}
                <div className="p-4 rounded-2xl bg-white border border-gray-200 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-black text-gray-900 mb-1">Performance &amp; Analytics</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Helps us understand which life calculators and data guides are most helpful so we can improve page speed and editorial quality.
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analytics}
                    aria-label="Toggle Analytics Cookies"
                    onClick={() => setAnalytics(!analytics)}
                    className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 shrink-0 ${
                      analytics ? 'bg-indigo-600 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 pt-1">
                  Learn more about third-party advertising cookies in our{' '}
                  <Link to="/cookies" onClick={() => setShowModal(false)} className="text-indigo-600 font-bold underline">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>

              <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  Reject Non-Essential
                </button>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="px-5 py-2.5 rounded-full text-xs font-black text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 rounded-full text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
