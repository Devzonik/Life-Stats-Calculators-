import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, Lock, FileText, ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy - LifeStats Calculator | AdSense Compliant";
  }, []);

  const sections = [
    { id: "consent", title: "Consent & Agreement" },
    { id: "information-collected", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Information" },
    { id: "cookies", title: "Cookies & Web Beacons" },
    { id: "google-adsense", title: "Google AdSense & DoubleClick" },
    { id: "privacy-rights", title: "Your Privacy Rights (GDPR/CCPA)" },
    { id: "childrens-privacy", title: "Children's Information" }
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full -mr-20 -mt-20 -z-10" />
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure & Transparent</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
            At LifeStats, accessible from our main web application, one of our main priorities is the privacy of our visitors. 
            This Privacy Policy document outlines the types of information collected and recorded by LifeStats and how we protect it.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-gray-400">
            <span>Last Updated: July 2026</span>
            <span>•</span>
            <span>Fully Compliant with GDPR, CCPA, and Google AdSense Policies</span>
          </div>
        </motion.div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Left Sidebar Table of Contents */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest pl-3 mb-4">
                Policy Sections
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
            
            {/* Quick Summary Notice */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 flex items-start space-x-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 text-base mb-1">Our Privacy Promise</h4>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  We process all calculation data (such as birth dates, names, and custom comparison parameters) 
                  <strong> client-side</strong> within your browser. We do not store, upload, or sell your life history, birthday details, or individual reports to our servers or any third-party database.
                </p>
              </div>
            </div>

            {/* Content Sections */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm space-y-12 text-gray-700 leading-relaxed">
              
              {/* Section: Consent */}
              <section id="consent" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  1. Consent & Agreement
                </h2>
                <p>
                  By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have any additional questions or require more information about our Privacy Policy, please do not hesitate to contact us at <a href="mailto:devzonik@gmail.com" className="text-indigo-600 hover:underline font-bold">devzonik@gmail.com</a>.
                </p>
              </section>

              {/* Section: Info We Collect */}
              <section id="information-collected" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  2. Information We Collect
                </h2>
                <p>
                  The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                </p>
                <p>
                  If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                </p>
                <p>
                  <strong>Application Inputs:</strong> When you use the LifeStats Calculator, you provide inputs such as your name, birthday, time of birth, and biological sex. These inputs are used strictly to run local algorithms that estimate your life statistics (such as total days lived, heartbeats, breaths, astronomical laps, and customized timeline projections). These inputs are never sent to external servers or persisted in backend storage databases.
                </p>
              </section>

              {/* Section: How we use */}
              <section id="how-we-use" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  3. How We Use Your Information
                </h2>
                <p>We use the information we collect in various ways, including to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, operate, and maintain our web-based life stats application.</li>
                  <li>Improve, personalize, and expand our calculators, charts, and interactive dashboards.</li>
                  <li>Understand and analyze how you interact with our website to optimize the user experience.</li>
                  <li>Develop new products, services, features, and functionalities.</li>
                  <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                  <li>Send you emails if you opt-in to newsletters or updates.</li>
                  <li>Find and prevent fraudulent activities.</li>
                </ul>
              </section>

              {/* Section: Cookies */}
              <section id="cookies" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  4. Cookies and Web Beacons
                </h2>
                <p>
                  Like any other website, LifeStats uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>
                <p>
                  You can choose to disable cookies through your individual browser options. To get more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                </p>
              </section>

              {/* Section: Google AdSense */}
              <section id="google-adsense" className="scroll-mt-24 space-y-4 bg-indigo-50/30 rounded-3xl p-6 md:p-8 border border-indigo-100">
                <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-indigo-600" />
                  5. Google AdSense & Third-Party Cookies
                </h2>
                <p className="text-indigo-950/80 font-medium">
                  We use third-party advertising companies to serve advertisements when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
                </p>
                <div className="space-y-4 mt-4 text-sm text-indigo-900">
                  <p>
                    <strong>Google's AdSense Requirements:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Google, as a third-party vendor, uses cookies to serve ads on LifeStats.</li>
                    <li>Google's use of the DoubleClick DART cookie enables it to serve ads to our users based on their visit to LifeStats and other sites on the Internet.</li>
                    <li>Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-bold">Google Ads Policy</a>.</li>
                  </ul>
                  <p className="bg-white/80 p-4 rounded-2xl border border-indigo-100/50 mt-2">
                    <Info className="w-4 h-4 inline mr-2 text-indigo-600" />
                    Our advertising partners include <strong>Google AdSense</strong>. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on LifeStats, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                  </p>
                </div>
              </section>

              {/* Section: CCPA & GDPR */}
              <section id="privacy-rights" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  6. Your Privacy Rights (GDPR & CCPA)
                </h2>
                <p>
                  We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-sm">
                    <h4 className="font-bold text-gray-900 mb-2">GDPR Data Rights (EEA Users)</h4>
                    <ul className="space-y-1.5 list-disc pl-4 text-gray-600">
                      <li><strong>The right to access</strong> – You can request copies of your personal data.</li>
                      <li><strong>The right to rectification</strong> – Correct any incomplete or inaccurate info.</li>
                      <li><strong>The right to erasure</strong> – Request that we erase your personal data under certain conditions.</li>
                      <li><strong>The right to restrict processing</strong> – Limit how we use your data.</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-sm">
                    <h4 className="font-bold text-gray-900 mb-2">CCPA Privacy Rights (California Users)</h4>
                    <ul className="space-y-1.5 list-disc pl-4 text-gray-600">
                      <li><strong>Right to know</strong> – Request disclosure of categories and specific pieces of personal data collected.</li>
                      <li><strong>Right to delete</strong> – Request erasure of gathered personal data.</li>
                      <li><strong>Right to opt-out</strong> – Direct a business that sells personal data to not sell it. We do not sell user data.</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
                </p>
              </section>

              {/* Section: Children */}
              <section id="childrens-privacy" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                  7. Children's Information
                </h2>
                <p>
                  Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </p>
                <p>
                  LifeStats does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                </p>
              </section>

            </div>

            {/* Bottom Actions */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-black text-gray-900 text-lg mb-1">Have questions about our policies?</h4>
                <p className="text-sm text-gray-500 font-medium">Get in touch with our team for clarification on data protection.</p>
              </div>
              <a 
                href="mailto:devzonik@gmail.com"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3.5 rounded-full text-sm transition-all shadow-lg shadow-indigo-100 text-center shrink-0 w-full md:w-auto"
              >
                Contact Data Protection Officer
              </a>
            </div>

          </div>

        </div>
        
      </div>
    </div>
  );
}
