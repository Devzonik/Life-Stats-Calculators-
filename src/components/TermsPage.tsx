import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, ShieldAlert, CheckSquare, Scale, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Terms & Conditions - LifeStats Calculator";
  }, []);

  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "user-conduct", title: "User Conduct & Restraints" },
    { id: "disclaimer", title: "Estimates Disclaimer" },
    { id: "third-party-links", title: "Third-Party Links & Ads" },
    { id: "limitation", title: "Limitation of Liability" },
    { id: "governing-law", title: "Governing Law" }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50/50 rounded-full -mr-20 -mt-20 -z-10" />
          <div className="inline-flex items-center space-x-2 bg-violet-50 text-violet-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Framework</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
            Please read these Terms and Conditions carefully before using the LifeStats Calculator. 
            By accessing or using our interactive services, you agree to be bound by these standard legal terms.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-gray-400">
            <span>Last Updated: July 2026</span>
            <span>•</span>
            <span>Standard Interactive Utility Licensing & SEO Schema compliant</span>
          </div>
        </motion.div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Left Sidebar Table of Contents */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-3 mb-4">
                Agreement Chapters
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

          {/* Right Detailed Content */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Quick Warning Notice */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 flex items-start space-x-4">
              <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 text-base mb-1">Important Accuracy Disclaimer</h4>
                <p className="text-sm text-amber-700 leading-relaxed">
                  All results provided by the LifeStats application—including average heartbeats, total breathes, simulated 
                  biological metrics, time travel projections, and comparison scores—are 
                  <strong> mathematical estimations and simulations</strong>. They do not constitute official medical, physical, or longevity records, nor should they replace professional advice.
                </p>
              </div>
            </div>

            {/* Content Sections */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm space-y-12 text-gray-700 leading-relaxed">
              
              {/* Section: Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing, browsing, or using the web-based utility application known as LifeStats, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>

              {/* Section: Intellectual Property */}
              <section id="intellectual-property" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  2. Intellectual Property Rights
                </h2>
                <p>
                  Unless otherwise stated, LifeStats and/or its licensors own the intellectual property rights for all material on our web applications. All intellectual property rights are reserved. You may access this from LifeStats for your own personal use subjected to restrictions set in these terms and conditions.
                </p>
                <p>
                  <strong>You must not:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Republish material, proprietary algorithms, formulas, or blog content from LifeStats.</li>
                  <li>Sell, rent, or sub-license components and scripts belonging to the application.</li>
                  <li>Reproduce, duplicate, or copy source codes, stylesheets, or visual assets of our calculator.</li>
                  <li>Redistribute content from LifeStats without explicit written authorization.</li>
                </ul>
              </section>

              {/* Section: User Conduct */}
              <section id="user-conduct" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  3. User Conduct & Restraints
                </h2>
                <p>
                  In using our interactive services, you agree not to use the platform in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of LifeStats. You must not use our calculators to collect or scrape metadata, or run automated scripts (such as web spiders, crawlers, or bots).
                </p>
                <p>
                  Any attempts to disrupt, bypass, or tamper with our Google AdSense scripts, iframe configurations, container hosting networks, or API interfaces are strictly prohibited and may result in immediate suspension of access to our tools.
                </p>
              </section>

              {/* Section: Estimations Disclaimer */}
              <section id="disclaimer" className="scroll-mt-24 space-y-4 bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-indigo-600" />
                  4. Estimates & Simulations Disclaimer
                </h2>
                <p>
                  The statistics compiled and presented by the LifeStats platform are generated using standard general formulas based on global actuarial statistics, statistical averages (e.g., standard heart rates, breathing frequencies, average screens-on times), and astronomical formulas (orbits around the sun).
                </p>
                <p className="font-semibold text-gray-900">
                  You understand and agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                  <li><strong>Not Medical Advice:</strong> Biological age indicators, respiratory calculations, and biological cycles are informational simulations and do not represent a clinical diagnosis or medical guidance.</li>
                  <li><strong>Informational Purposes Only:</strong> Comparisons and predictions on timelines are to be used strictly for visual entertainment, perspective-shifting, and educational awareness.</li>
                  <li><strong>No Reliance:</strong> Users should not make health, medical, or life planning choices solely on calculations provided by our application. Always consult a qualified medical or scientific professional.</li>
                </ul>
              </section>

              {/* Section: Third-Party Links & Ads */}
              <section id="third-party-links" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  5. Third-Party Links & Google AdSense
                </h2>
                <p>
                  Our web application exhibits integrated third-party advertisements hosted by Google AdSense and other advertising services. We do not inspect, endorse, or verify the validity or products of the third-party ads shown on our portal.
                </p>
                <p>
                  Your interaction with any external website or advertisement linked through our portal is subject to that external vendor's respective terms of service and privacy practices. We hold no liability for transactions or consequences arising from visiting these third-party links.
                </p>
              </section>

              {/* Section: Limitation of Liability */}
              <section id="limitation" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  6. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall LifeStats, its developers, or its partners be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data, business interruption, or personal injury) arising out of or in any way related to the use of or inability to use the LifeStats Calculator.
                </p>
                <p>
                  Our services are provided on an "AS IS" and "AS AVAILABLE" basis with all faults and without warranties of any kind, whether express or implied, including the implied warranties of merchantability or fitness for a particular purpose.
                </p>
              </section>

              {/* Section: Governing Law */}
              <section id="governing-law" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  7. Governing Law & Jurisdiction
                </h2>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with standard international internet regulations and electronic commerce frameworks. Any disputes arising in connection with these terms shall be resolved through constructive direct mediation or handled under standard legal jurisdictions of our designated primary developers' registered headquarters.
                </p>
              </section>

            </div>

            {/* Bottom Contact card */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-black text-gray-900 text-lg mb-1">Acceptance and Compliance</h4>
                <p className="text-sm text-gray-500 font-medium">By using our services, you signify your compliance with these terms of service.</p>
              </div>
              <Link 
                to="/"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3.5 rounded-full text-sm transition-all shadow-lg shadow-indigo-100 text-center shrink-0 w-full md:w-auto"
              >
                Accept and Open Calculator
              </Link>
            </div>

          </div>

        </div>
        
      </div>
    </div>
  );
}
