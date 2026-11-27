import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, Send, CheckCircle2, Clock, Instagram, ShieldCheck, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Feedback');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';

    document.title = "Contact Us - LifeStats Calculator (lifestats.online)";
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Contact the LifeStats team at lifestats.online for feedback, data corrections, GDPR/CCPA privacy requests, or advertising inquiries."
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill in your name, email address, and message before submitting.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (message.trim().length < 10) {
      setFormError('Please enter a message of at least 10 characters so we can assist you properly.');
      return;
    }

    setSubmitted(true);
  };

  const mailtoHref = `mailto:devzonik@gmail.com?subject=${encodeURIComponent(`[LifeStats - ${topic}] Inquiry from ${name || 'Visitor'}`)}&body=${encodeURIComponent(message)}`;

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
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/60 rounded-full -mr-20 -mt-20 -z-10" />
          <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
            Have a question about our life statistics formulas, want to report a data correction, submit a GDPR/CCPA privacy inquiry, or discuss partnerships? Reach our editorial and engineering desk directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Direct Channels Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm space-y-5">
              <h2 className="text-lg font-black text-gray-900">Direct Contact Channels</h2>

              <a
                href="mailto:devzonik@gmail.com"
                className="flex items-start space-x-3.5 p-4 rounded-2xl bg-gray-50 hover:bg-indigo-50/60 border border-gray-100 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-gray-400">Official Email</p>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600">devzonik@gmail.com</p>
                  <p className="text-xs text-gray-500 mt-0.5">Editorial, Support &amp; Privacy</p>
                </div>
              </a>

              <a
                href="https://www.instagram.com/devzonik/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3.5 p-4 rounded-2xl bg-gray-50 hover:bg-indigo-50/60 border border-gray-100 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-gray-400">Social Media</p>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600">@devzonik</p>
                  <p className="text-xs text-gray-500 mt-0.5">Updates &amp; Community</p>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start space-x-3">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 leading-relaxed">
                  <strong>Response Time:</strong> We review and respond to all inquiries within 24–48 business hours.
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-gray-900 font-black text-base">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <span>Compliance &amp; Policies</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                For privacy rights requests or cookie opt-outs, please review our policy documents:
              </p>
              <ul className="space-y-2 text-xs font-bold text-indigo-600">
                <li><Link to="/privacy" className="hover:underline">Privacy Policy (GDPR / CCPA)</Link></li>
                <li><Link to="/cookies" className="hover:underline">Cookie Policy &amp; Preferences</Link></li>
                <li><Link to="/disclaimer" className="hover:underline">Medical &amp; Data Disclaimer</Link></li>
                <li><Link to="/terms" className="hover:underline">Terms &amp; Conditions</Link></li>
              </ul>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm">
              {submitted ? (
                <div className="py-10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">Message Prepared</h2>
                  <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you, <strong>{name}</strong>. Because LifeStats operates without storing personal form submissions on external tracking servers, click below to send your message directly via your email client, or write to <a href="mailto:devzonik@gmail.com" className="text-indigo-600 font-bold underline">devzonik@gmail.com</a>.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3 rounded-full text-sm transition-colors shadow-lg shadow-indigo-100"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send via Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="px-6 py-3 rounded-full text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      Write Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-1">Send Us a Message</h2>
                    <p className="text-sm text-gray-500">
                      Fill out the form below and our team will get back to you promptly.
                    </p>
                  </div>

                  {formError && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-medium flex items-center space-x-2.5">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm font-medium text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm font-medium text-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-topic" className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      Inquiry Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm font-medium text-gray-900 bg-white"
                    >
                      <option value="General Feedback">General Feedback &amp; Suggestions</option>
                      <option value="Data & Calculation Correction">Data &amp; Calculation Correction</option>
                      <option value="Privacy / GDPR / CCPA Request">Privacy, Cookie, or GDPR/CCPA Request</option>
                      <option value="Advertising & Partnerships">Advertising &amp; Partnerships</option>
                      <option value="Technical Support">Technical Issue / Bug Report</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm font-medium text-gray-900 resize-y"
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-gray-400">
                      By contacting us, you agree to our{' '}
                      <Link to="/privacy" className="text-indigo-600 underline font-semibold">Privacy Policy</Link>.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8 py-3.5 rounded-full text-sm transition-all shadow-lg shadow-indigo-100"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
