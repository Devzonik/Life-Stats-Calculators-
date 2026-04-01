document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('life-stats-form');
    const resultsContainer = document.getElementById('results-container');
    const genderBtns = document.querySelectorAll('.gender-btn');
    const genderInput = document.getElementById('gender');
    const phoneUsageInput = document.getElementById('phoneUsage');
    const phoneUsageValue = document.getElementById('phoneUsageValue');
    const faqToggles = document.querySelectorAll('.faq-toggle');

    // Gender Selection
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => {
                b.classList.remove('bg-white', 'shadow-sm', 'text-indigo-600');
                b.classList.add('text-slate-500');
            });
            btn.classList.add('bg-white', 'shadow-sm', 'text-indigo-600');
            btn.classList.remove('text-slate-500');
            genderInput.value = btn.dataset.gender;
        });
    });

    // Phone Usage Slider
    phoneUsageInput.addEventListener('input', (e) => {
        phoneUsageValue.textContent = `${e.target.value} Hours`;
    });

    // FAQ Toggles
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');
            const isHidden = content.classList.contains('hidden');
            
            content.classList.toggle('hidden');
            if (isHidden) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Calculation Logic
    let intervalId = null;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const birthDate = new Date(document.getElementById('birthDate').value);
        const gender = genderInput.value;
        const phoneUsage = parseFloat(phoneUsageInput.value);

        if (isNaN(birthDate.getTime())) return;

        resultsContainer.classList.remove('hidden');
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

        if (intervalId) clearInterval(intervalId);

        const updateStats = () => {
            const now = new Date();
            const diffMs = now - birthDate;
            
            const seconds = Math.floor(diffMs / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const weeks = Math.floor(days / 7);
            const months = Math.floor(days / 30.44);
            const years = (diffMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2);

            // Biological Stats
            const heartbeats = Math.floor(minutes * 80);
            const breaths = Math.floor(minutes * 16);
            const blinks = Math.floor(minutes * 15);
            const steps = Math.floor(days * 5000);
            const sleepHours = Math.floor(days * 8);
            const phoneTimeDays = Math.floor((days * phoneUsage) / 24);

            // Update Overview
            const avgLifeDays = 29220; // 80 years
            const lifePercentage = Math.min((days / avgLifeDays) * 100, 100).toFixed(1);
            const daysRemaining = Math.max(avgLifeDays - days, 0);
            const yearsRemaining = (daysRemaining / 365.25).toFixed(1);

            document.getElementById('life-percentage-text').textContent = `${lifePercentage}%`;
            document.getElementById('life-percentage-circle-text').textContent = `${lifePercentage}%`;
            document.getElementById('days-remaining-text').textContent = `${daysRemaining.toLocaleString()} days`;
            document.getElementById('years-lived-text').textContent = years;
            document.getElementById('years-remaining-text').textContent = yearsRemaining;

            // Update Progress Circle
            const circle = document.getElementById('life-progress-circle');
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (lifePercentage / 100) * circumference;
            circle.style.strokeDashoffset = offset;

            // Update Comparison Cards
            const comparisonCards = document.querySelectorAll('.comparison-card');
            comparisonCards.forEach(card => {
                const stat = card.dataset.stat;
                const total = parseFloat(card.dataset.total);
                let value = 0;
                if (stat === 'days') value = days;
                if (stat === 'heartbeats') value = heartbeats;
                if (stat === 'steps') value = steps;
                if (stat === 'sleepHours') value = sleepHours;

                card.querySelector('.stat-value').textContent = value.toLocaleString();
                const progress = Math.min((value / total) * 100, 100);
                card.querySelector('.progress-bar').style.width = `${progress}%`;
            });

            // Update Grids
            const coreStats = [
                { label: 'Total Seconds', value: seconds.toLocaleString(), icon: 'clock', color: 'indigo' },
                { label: 'Total Minutes', value: minutes.toLocaleString(), icon: 'timer', color: 'blue' },
                { label: 'Total Hours', value: hours.toLocaleString(), icon: 'sun', color: 'amber' },
                { label: 'Total Weeks', value: weeks.toLocaleString(), icon: 'calendar-days', color: 'violet' },
                { label: 'Total Months', value: months.toLocaleString(), icon: 'calendar', color: 'purple' },
                { label: 'Phone Time', value: `${phoneTimeDays.toLocaleString()} Days`, icon: 'smartphone', color: 'emerald' }
            ];

            const bioStats = [
                { label: 'Total Breaths', value: breaths.toLocaleString(), icon: 'wind', color: 'sky' },
                { label: 'Total Blinks', value: blinks.toLocaleString(), icon: 'eye', color: 'rose' },
                { label: 'Dreaming Time', value: `${Math.floor(sleepHours * 0.2).toLocaleString()} Hours`, icon: 'sparkles', color: 'indigo' },
                { label: 'Meals Eaten', value: Math.floor(days * 3).toLocaleString(), icon: 'utensils', color: 'orange' }
            ];

            renderGrid('core-stats-grid', coreStats);
            renderGrid('bio-stats-grid', bioStats);
            renderPredictions(birthDate);
        };

        updateStats();
        intervalId = setInterval(updateStats, 1000);
    });

    // Share Button
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            const originalText = shareBtn.innerHTML;
            shareBtn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> Copied!';
            lucide.createIcons();
            setTimeout(() => {
                shareBtn.innerHTML = originalText;
                lucide.createIcons();
            }, 2000);
        });
    });

    function renderGrid(containerId, stats) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        stats.forEach(stat => {
            const card = document.createElement('div');
            card.className = 'bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group';
            card.innerHTML = `
                <div class="flex items-center gap-4 mb-4">
                    <div class="p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all">
                        <i data-lucide="${stat.icon}" class="w-6 h-6"></i>
                    </div>
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest">${stat.label}</h4>
                </div>
                <div class="text-2xl font-black text-slate-900 tracking-tight">${stat.value}</div>
            `;
            container.appendChild(card);
        });
        lucide.createIcons();
    }

    function renderPredictions(birthDate) {
        const container = document.getElementById('predictions-grid');
        container.innerHTML = '';

        const now = new Date();
        const birth = new Date(birthDate);

        // Next Birthday
        let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
        const daysToBday = Math.ceil((nextBday.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

        // 1 Billion Seconds
        const s1b = new Date(birth.getTime() + 1000000000 * 1000);
        const diffS1b = Math.ceil((s1b.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

        // 10,000 Days
        const d10k = new Date(birth.getTime() + 10000 * 24 * 60 * 60 * 1000);
        const diffD10k = Math.ceil((d10k.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

        // Death Clock (80 years)
        const deathDate = new Date(birth.getFullYear() + 80, birth.getMonth(), birth.getDate());
        const diffDeath = Math.ceil((deathDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

        const predictions = [
            { 
                label: 'Next Birthday', 
                date: nextBday.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
                subtext: `In ${daysToBday} days`,
                icon: 'calendar', color: 'bg-indigo-500', bg: 'bg-white'
            },
            { 
                label: '1 Billion Seconds Age', 
                date: s1b.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
                subtext: diffS1b > 0 ? `In ${diffS1b.toLocaleString()} days` : 'Already passed!',
                icon: 'clock', color: 'bg-amber-500', bg: 'bg-amber-50/30'
            },
            { 
                label: 'Age in 2030', 
                date: `${2030 - birth.getFullYear()} Years Old`, 
                subtext: 'January 1st, 2030', 
                icon: 'trending-up', color: 'bg-emerald-500', bg: 'bg-white' 
            },
            { 
                label: 'Age in 2040', 
                date: `${2040 - birth.getFullYear()} Years Old`, 
                subtext: 'January 1st, 2040', 
                icon: 'trending-up', color: 'bg-blue-500', bg: 'bg-white' 
            },
            { 
                label: 'Age in 2050', 
                date: `${2050 - birth.getFullYear()} Years Old`, 
                subtext: 'January 1st, 2050', 
                icon: 'trending-up', color: 'bg-purple-500', bg: 'bg-white' 
            },
            { 
                label: '10,000 Days Age', 
                date: d10k.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
                subtext: diffD10k > 0 ? `In ${diffD10k.toLocaleString()} days` : 'Already passed!',
                icon: 'award', color: 'bg-rose-500', bg: 'bg-rose-50/30'
            },
            { 
                label: 'Estimated Death Clock', 
                date: deathDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }),
                subtext: diffDeath > 0 ? `${diffDeath.toLocaleString()} days remaining*` : 'Living on borrowed time!',
                icon: 'skull', color: 'bg-slate-900', bg: 'bg-slate-100'
            }
        ];

        predictions.forEach(pred => {
            const card = document.createElement('div');
            card.className = `${pred.bg} p-8 rounded-3xl border border-white/50 shadow-sm hover:shadow-lg transition-all flex flex-col h-full`;
            card.innerHTML = `
                <div class="w-12 h-12 rounded-2xl ${pred.color} flex items-center justify-center mb-6 text-white shadow-lg shadow-current/20">
                    <i data-lucide="${pred.icon}" class="w-6 h-6"></i>
                </div>
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">${pred.label}</h4>
                <div class="text-2xl font-black text-slate-900 leading-tight mb-auto">${pred.date}</div>
                <div class="mt-6 pt-4 border-t border-slate-200/50">
                    <div class="text-xs font-bold text-indigo-600 bg-indigo-50/50 inline-flex items-center gap-2 px-3 py-1.5 rounded-full">
                        <i data-lucide="clock" class="w-3 h-3"></i> ${pred.subtext}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        lucide.createIcons();
    }
});
