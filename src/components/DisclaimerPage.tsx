import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowLeft, HeartPulse, Database, Megaphone, Scale, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DisclaimerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';

    document.title = "Disclaimer - LifeStats Calculator (lifestats.online)";
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Read the official Medical, Statistical, and Advertising Disclaimer for LifeStats Calculator (lifestats.online). Understand our data limitations and editorial disclosures."
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

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
          className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm mb-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/60 rounded-full -mr-20 -mt-20 -z-10" />
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Educational &amp; Statistical Notice</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Disclaimer
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
            Important disclosures regarding the calculators, life expectancy articles, biological simulations, and advertisements published on <strong className="text-gray-800">https://lifestats.online</strong>.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-gray-400">
            <span>Last Updated: November 27, 2026</span>
            <span>•</span>
            <span>Publisher Transparency &amp; Health-Content Compliance</span>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Medical & Health Disclaimer */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">1. Not Medical or Clinical Advice</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              All calculators, biological age simulations, estimated heartbeats, breathing counts, and health-related articles published on LifeStats are provided strictly for <strong>educational, informational, and general perspective-building purposes</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nothing on this website constitutes medical diagnosis, clinical prognosis, treatment advice, or a substitute for consultation with a licensed physician or qualified healthcare provider. Individual health and longevity depend on genetics, medical history, environment, and clinical screenings that an online calculator cannot evaluate.
            </p>
          </div>

          {/* Statistical & Data Methodology Disclaimer */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">2. Statistical Estimates &amp; Public Data Sources</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Interactive lifetime counters (heartbeats, breaths, sleep hours, steps walked, and life-expectancy projections) rely on broad population averages—such as an average resting heart rate of 72 BPM or national life tables—rather than personal biometric telemetry.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our editorial guides cite publicly available demographic and epidemiological datasets, including the <strong>CDC National Center for Health Statistics (NCHS)</strong>, the <strong>United Nations World Population Prospects</strong>, and the <strong>U.S. Bureau of Labor Statistics American Time Use Survey (ATUS)</strong>. While we strive to keep figures accurate and dated, government agencies periodically revise provisional estimates.
            </p>
          </div>

          {/* Advertising Disclosure */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Megaphone className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">3. Advertising &amp; Google AdSense Disclosure</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To keep LifeStats free and accessible without paywalls, our website displays third-party advertisements served via <strong>Google AdSense</strong>. Advertisements are clearly distinguished from our editorial articles and calculator interfaces.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Presence of an advertisement on LifeStats does not imply endorsement, sponsorship, or recommendation of any advertiser&apos;s product, service, or health claim. You can review how advertising cookies work in our{' '}
              <Link to="/cookies" className="text-indigo-600 font-bold underline">Cookie Policy</Link>.
            </p>
          </div>

          {/* Financial & External Links Disclaimer */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-gray-900">4. Earnings Simulations, External Links &amp; Liability</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Lifetime earnings or hourly-value features within the calculator are simplified mathematical projections and do not constitute financial, tax, or investment advice. Furthermore, LifeStats may link to external public datasets or third-party references for verification; we are not responsible for the content or availability of external sites.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-sm font-bold">
              <Link to="/about" className="text-indigo-600 hover:underline inline-flex items-center gap-1">
                <span>Read Our Editorial Methodology</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link to="/contact" className="text-indigo-600 hover:underline inline-flex items-center gap-1">
                <span>Report a Data Correction</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
