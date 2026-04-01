<?php
/**
 * Import blog posts from React data
 */

function lsc_import_blog_posts() {
    // Only run this once
    if ( get_option( 'lsc_blog_imported' ) ) {
        return;
    }

    $posts = array(
        array(
            'title'   => 'How Many Seconds Have You Been Alive?',
            'excerpt' => 'Time is our most precious resource. Discover the exact breakdown of your life in seconds and why tracking time milestones can change your perspective on life.',
            'date'    => '2026-03-15',
            'slug'    => 'seconds-alive',
            'tags'    => array( 'Time', 'Milestones', 'Calculations' ),
            'content' => "## The Power of Small Units\nEvery second is a heartbeat, a thought, or a breath. When you use an **age in seconds calculator**, you realize that a 30-year-old has lived for nearly 1 billion seconds. This perspective shifts our focus from the \"big picture\" to the present moment.\n\n## Why Track Seconds?\n1. **Mindfulness**: Realizing that a second has passed reminds us to stay present.\n2. **Milestones**: Celebrating your 1 billionth second (at age 31.7) is a unique way to honor your journey.\n3. **Accuracy**: Our **seconds alive calculator** provides a real-time look at your life's progression.\n\n[Calculate your stats now](/) ",
        ),
        array(
            'title'   => 'How Many Heartbeats in a Lifetime?',
            'excerpt' => 'Your heart is a tireless engine. Learn how many times it beats in a day, a year, and a full lifetime based on your fitness level and biological age.',
            'date'    => '2026-03-10',
            'slug'    => 'heartbeats-lifetime',
            'tags'    => array( 'Health', 'Biology', 'Calculations' ),
            'content' => "## The Math of the Heart\nOn average, a human heart beats about 100,000 times a day. Over a year, that's 36.5 million beats. If you live to be 80, your heart will have beaten nearly 3 billion times.\n\n## Factors That Influence Heart Rate\n- **Fitness**: Athletes often have lower resting heart rates, meaning their hearts are more efficient.\n- **Stress**: High stress can increase your heart rate, putting more \"wear and tear\" on the muscle.\n- **Gender**: On average, women have slightly higher resting heart rates than men.\n\nOur **life stats calculator** helps you estimate your total heartbeats based on these biological averages.",
        ),
        array(
            'title'   => 'How Many Days Does an Average Person Live?',
            'excerpt' => 'If you live to 80, you have roughly 29,220 days. We explore the statistics of human longevity and how to make every single day count.',
            'date'    => '2026-03-05',
            'slug'    => 'average-days-lived',
            'tags'    => array( 'Longevity', 'Time', 'Statistics' ),
            'content' => "## Breaking Down the Days\n- **Childhood**: Roughly 6,570 days are spent growing up.\n- **Work Life**: Many people spend over 15,000 days in their careers.\n- **Sleep**: You'll spend about 9,700 days asleep!\n\n## Making Days Count\nUsing a **days alive calculator** isn't about counting down; it's about making the days count. When you see exactly how many days you've been on this planet, it encourages you to pursue your passions and cherish your relationships.",
        ),
        array(
            'title'   => 'The Science of Sleep: How Much of Your Life is Spent Dreaming?',
            'excerpt' => 'We spend a third of our lives asleep. Dive into the statistics of sleep cycles, REM stages, and how many years you\'ll spend in the dream world.',
            'date'    => '2026-03-18',
            'slug'    => 'sleep-science',
            'tags'    => array( 'Sleep', 'Health', 'Biology' ),
            'content' => "## The 33% Rule\nIf you sleep the recommended 8 hours a night, you will spend exactly 33.3% of your life asleep. For an 80-year-old, that's over 26 years of slumber.\n\n## The World of Dreams\nWe spend about 2 hours every night dreaming during REM sleep. Over a lifetime, that adds up to roughly 6 years of pure dreaming. \n\n## Sleep and Longevity\nConsistent, high-quality sleep is one of the strongest predictors of a long, healthy life. Our calculator shows you exactly how many hours you've likely spent resting since birth.",
        ),
        array(
            'title'   => 'Phone Addiction Statistics: Your Life Behind the Screen',
            'excerpt' => 'The average person spends over 4 hours a day on their phone. See the staggering cumulative impact of screen time on your life journey.',
            'date'    => '2026-03-20',
            'slug'    => 'phone-usage-stats',
            'tags'    => array( 'Technology', 'Time', 'Habits' ),
            'content' => "## The 4-Hour Average\nSpending 4 hours a day on your phone might not feel like much in the moment. However, over a year, that's 1,460 hours—or 60 full days.\n\n## A Lifetime of Scrolling\nIf you maintain this habit for 50 years, you will have spent over 8 years of your waking life on your phone. \n\n## Reclaiming Your Time\nOur **life stats calculator** includes a phone usage slider so you can see your personal impact. Awareness is the first step toward reclaiming those years for more meaningful activities.",
        ),
        array(
            'title'   => 'Life Milestones: Celebrating 10,000 Days and 1 Billion Seconds',
            'excerpt' => 'Forget traditional birthdays. Learn about the \'math milestones\' that celebrate your unique journey through time.',
            'date'    => '2026-03-22',
            'slug'    => 'life-milestones',
            'tags'    => array( 'Milestones', 'Time', 'Calculations' ),
            'content' => "## 10,000 Days Alive\nReaching 10,000 days is a significant event that occurs when you are approximately 27.4 years old. It's a perfect time to reflect on your first decade of adulthood.\n\n## 1 Billion Seconds\nThis milestone happens at age 31.7. It's a staggering number that reminds us of the incredible volume of moments we've experienced.\n\n## Why Celebrate Math Birthdays?\nThese milestones break the routine of annual celebrations and give us a reason to pause and appreciate the mathematical beauty of our lives.",
        ),
        array(
            'title'   => 'The Rhythm of Life: Fascinating Facts About Human Breathing',
            'excerpt' => 'You breathe roughly 17,000 times a day. Discover the statistics of your respiratory system and how many breaths you\'ve taken since your first cry.',
            'date'    => '2026-03-24',
            'slug'    => 'breathing-facts',
            'tags'    => array( 'Health', 'Biology', 'Statistics' ),
            'content' => "## 12 Breaths Per Minute\nThe average adult takes about 12 to 16 breaths per minute while resting. That's over 17,000 breaths a day and 6.3 million breaths a year.\n\n## The Volume of Air\nIn a single day, you breathe in enough air to fill a small swimming pool. Over a lifetime, your lungs process millions of cubic feet of oxygen.\n\n## Breathing and Health\nDeep breathing techniques can lower your heart rate and reduce stress. Our calculator now includes a **breathing rate stat** to help you visualize this vital life force.",
        ),
        array(
            'title'   => 'Mastering Your Time: 5 Tips to Make Every Second Count',
            'excerpt' => 'Time is the only currency you can\'t earn back. Learn 5 practical strategies to manage your time and live a more intentional life.',
            'date'    => '2026-03-26',
            'slug'    => 'time-management-tips',
            'tags'    => array( 'Time', 'Habits', 'Productivity' ),
            'content' => "## 1. The 80/20 Rule\nFocus on the 20% of activities that produce 80% of your results and happiness.\n\n## 2. Time Blocking\nDedicate specific blocks of time to your most important tasks to avoid the \"multitasking trap.\"\n\n## 3. Audit Your Screen Time\nUse our calculator to see how much time you're spending on your phone and decide if that's where you want your years to go.\n\n## 4. Practice Gratitude\nTaking a moment each day to be grateful slows down your perception of time and increases well-being.\n\n## 5. Set \"Math Milestones\"\nCelebrate your 10,000th day or 1 billionth second to keep your perspective fresh.",
        ),
        array(
            'title'   => 'How Many Weeks in a Lifetime? The 4,000 Weeks Philosophy',
            'excerpt' => 'If you live to 80, you have roughly 4,000 weeks. Discover why this perspective is the ultimate productivity hack for a meaningful life.',
            'date'    => '2026-03-28',
            'slug'    => 'weeks-in-lifetime',
            'tags'    => array( 'Time', 'Longevity', 'Philosophy' ),
            'content' => "## The 4,000 Weeks Reality\nAn 80-year life consists of approximately 4,160 weeks. This number is small enough to visualize on a single sheet of paper. Many people find this \"4,000 weeks\" perspective to be a powerful wake-up call.\n\n## Why Weeks Matter\n1. **Manageability**: A week is the perfect unit for planning and reflection.\n2. **Scarcity**: Realizing you have a limited number of \"summers\" or \"winters\" left encourages prioritization.\n3. **Focus**: It helps you say \"no\" to things that don't align with your values.\n\nOur **life stats calculator** breaks down your age into weeks so you can see exactly where you are in your 4,000-week journey.",
        ),
        array(
            'title'   => 'How Many Meals Will You Eat? A Lifetime of Nutrition',
            'excerpt' => 'From your first bite to your 80,000th meal, discover the staggering statistics of human consumption and nutrition over a lifetime.',
            'date'    => '2026-03-30',
            'slug'    => 'lifetime-meals-stats',
            'tags'    => array( 'Health', 'Biology', 'Statistics' ),
            'content' => "## The 87,000 Meal Journey\nIf you eat three meals a day for 80 years, you will consume roughly 87,600 meals. This doesn't even include snacks, midnight treats, or celebratory feasts!\n\n## The Impact of Choice\nEvery meal is an opportunity to nourish your body. Over a lifetime, these choices accumulate to define your health and longevity.\n- **Variety**: You'll likely try thousands of different ingredients.\n- **Culture**: Meals are where we connect with family and tradition.\n- **Sustainability**: The environmental impact of 87,000 meals is significant.\n\nUse our **meals eaten calculator** to see your personal progress and reflect on your nutritional journey.",
        ),
        array(
            'title'   => 'Walking Around the World: How Many Steps in a Lifetime?',
            'excerpt' => 'The average person walks the equivalent of five times around the Earth. See the incredible distance you\'ll cover on your own two feet.',
            'date'    => '2026-04-02',
            'slug'    => 'steps-in-lifetime',
            'tags'    => array( 'Health', 'Biology', 'Statistics' ),
            'content' => "## 200 Million Steps\nIf you average 7,000 steps a day, you will take roughly 200 million steps by age 80. This is equivalent to walking about 110,000 miles.\n\n## Earth's Circumference\nThe Earth's circumference is about 24,901 miles. This means the average person walks the equivalent of **over four times around the globe** in their lifetime.\n\n## Health Benefits of Walking\n- **Longevity**: Consistent walking is linked to a longer life expectancy.\n- **Mental Health**: Walking reduces stress and improves mood.\n- **Simplicity**: It's the most accessible form of exercise.\n\nOur **steps walked calculator** estimates your total distance based on your age and daily activity levels.",
        ),
        array(
            'title'   => 'The Blink of an Eye: How Many Times Do You Blink in a Life?',
            'excerpt' => 'You blink 15 times a minute, but it adds up to millions. Discover the fascinating statistics behind this essential biological reflex.',
            'date'    => '2026-04-05',
            'slug'    => 'lifetime-blinks-stats',
            'tags'    => array( 'Biology', 'Health', 'Statistics' ),
            'content' => "## 400 Million Blinks\nOn average, a person blinks about 15 to 20 times per minute. Over an 80-year life, that adds up to roughly 420 million blinks.\n\n## Why We Blink\n1. **Protection**: Blinking clears away dust and debris.\n2. **Moisture**: It spreads tears across the eye to prevent dryness.\n3. **Brain Breaks**: Recent studies suggest blinking provides the brain with tiny \"mental rests.\"\n\n## Blinking and Screen Time\nDid you know we blink significantly less when looking at screens? This is why \"digital eye strain\" is so common. Our **blinks calculator** helps you visualize this invisible rhythm of your life.",
        ),
        array(
            'title'   => 'How Long Have I Been Alive? Calculate Your Life Stats in Seconds',
            'excerpt' => 'Discover exactly how long you have been alive. We break down your age into days, hours, minutes, and even seconds. Calculate your life stats now!',
            'date'    => '2026-05-15',
            'slug'    => 'how-long-have-i-been-alive-guide',
            'tags'    => array( 'Time', 'Life Stats', 'Calculations', 'Pillar' ),
            'content' => "## The Perspective of Time\nTime is our most precious resource, yet we often treat it as an infinite pool. When you shift your perspective from years to days or seconds, the \"big picture\" suddenly becomes a series of precious, individual moments.\n\n## Your Life in Days\nIf you are 30 years old, you have lived for approximately **10,957 days**. That's over ten thousand sunrises and sunsets you've witnessed. Using a **days alive calculator** helps you appreciate the daily grind as part of a much larger, incredible journey.\n\n## Your Life in Hours and Minutes\nScaling down further, that same 30-year-old has lived for about **262,968 hours** or **15,778,080 minutes**. Think about all the conversations, meals, and dreams that have fit into those millions of minutes.\n\n## Your Life in Seconds\nThis is where the numbers truly become mind-blowing. At age 30, you have been alive for nearly **1 billion seconds** (946,684,800 to be precise). Every second is a heartbeat, a thought, or a blink.\n\n## Biological Milestones: Heartbeats and Breaths\nYour body is a tireless engine. In those 30 years:\n- **Heartbeats**: Your heart has likely beaten over **1.1 billion times**.\n- **Breaths**: You have taken approximately **189 million breaths**.\n- **Blinks**: You've blinked your eyes roughly **157 million times**.",
        ),
    );

    foreach ( $posts as $post_data ) {
        $existing_post = get_page_by_path( $post_data['slug'], OBJECT, 'post' );

        if ( ! $existing_post ) {
            $post_id = wp_insert_post( array(
                'post_title'   => $post_data['title'],
                'post_content' => $post_data['content'],
                'post_excerpt' => $post_data['excerpt'],
                'post_status'  => 'publish',
                'post_type'    => 'post',
                'post_name'    => $post_data['slug'],
                'post_date'    => $post_data['date'] . ' 00:00:00',
            ) );

            if ( $post_id && ! is_wp_error( $post_id ) ) {
                wp_set_post_tags( $post_id, $post_data['tags'] );
            }
        }
    }

    // Create About, Privacy, Terms pages
    $pages = array(
        array(
            'title' => 'About Us',
            'slug'  => 'about',
            'content' => 'At lifestats.online, we believe that every second of life is a miracle worth celebrating. Our mission is to provide a unique, real-time perspective on your journey through time, from the number of breaths you\'ve taken to the billions of heartbeats that have powered your existence.',
        ),
        array(
            'title' => 'Privacy Policy',
            'slug'  => 'privacy-policy',
            'content' => 'Our application is designed to be a client-side tool. This means that when you enter your birthdate into our calculator, that information is processed locally in your browser. We do not store, save, or transmit your birthdate to any external servers.',
        ),
        array(
            'title' => 'Terms of Service',
            'slug'  => 'terms-of-service',
            'content' => 'By accessing and using Life Stats Calculator, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.',
        ),
    );

    foreach ( $pages as $page_data ) {
        $existing_page = get_page_by_path( $page_data['slug'], OBJECT, 'page' );
        if ( ! $existing_page ) {
            wp_insert_post( array(
                'post_title'   => $page_data['title'],
                'post_content' => $page_data['content'],
                'post_status'  => 'publish',
                'post_type'    => 'page',
                'post_name'    => $page_data['slug'],
            ) );
        }
    }

    update_option( 'lsc_blog_imported', true );
}
add_action( 'after_setup_theme', 'lsc_import_blog_posts' );
