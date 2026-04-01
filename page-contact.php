<?php
/**
 * Template Name: Contact Page
 */

get_header();
?>

<main id="primary" class="site-main">
    <section class="py-24 px-4 bg-white">
        <div class="max-w-4xl mx-auto">
            <header class="mb-16 text-center">
                <h1 class="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">Contact Us</h1>
                <p class="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                    Have questions or feedback? We'd love to hear from you.
                </p>
            </header>

            <div class="grid md:grid-cols-2 gap-12">
                <div class="space-y-8">
                    <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <h3 class="text-xl font-bold text-indigo-600 mb-2">Email Us</h3>
                        <p class="text-slate-600 font-medium">support@lifestats.online</p>
                    </div>
                    <div class="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <h3 class="text-xl font-bold text-indigo-600 mb-2">Follow Us</h3>
                        <div class="flex gap-4 mt-4">
                            <a href="#" class="text-slate-400 hover:text-indigo-600 transition-colors font-bold">Twitter</a>
                            <a href="#" class="text-slate-400 hover:text-indigo-600 transition-colors font-bold">Instagram</a>
                            <a href="#" class="text-slate-400 hover:text-indigo-600 transition-colors font-bold">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <form action="#" method="POST" class="space-y-6">
                        <div>
                            <label class="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Your Name</label>
                            <input type="text" name="name" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 transition-all outline-none" placeholder="John Doe">
                        </div>
                        <div>
                            <label class="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                            <input type="email" name="email" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 transition-all outline-none" placeholder="john@example.com">
                        </div>
                        <div>
                            <label class="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Message</label>
                            <textarea name="message" rows="4" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-0 transition-all outline-none" placeholder="How can we help?"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
get_footer();
