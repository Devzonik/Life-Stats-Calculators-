<?php
/**
 * The front page template file
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package life-stats-calculator
 */

get_header();
?>

	<main id="primary" class="site-main">

		<!-- Hero / Intro Section -->
		<header class="bg-white border-b border-slate-200 pt-16 pb-12 px-4">
			<div class="max-w-4xl mx-auto text-center">
				<div class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
					<i data-lucide="clock" class="w-4 h-4"></i> <?php esc_html_e( 'Discover Your Life in Numbers', 'life-stats-calculator' ); ?>
				</div>
				<h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
					<?php bloginfo( 'name' ); ?>
				</h1>
				<div class="prose prose-slate max-w-3xl mx-auto text-slate-600 leading-relaxed text-lg">
					<?php the_content(); ?>
				</div>
			</div>
		</header>

		<div class="max-w-6xl mx-auto px-4 py-16">
			<!-- Tool Section -->
			<section id="calculator" class="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 mb-24">
				<h2 class="text-2xl font-bold text-slate-900 mb-8 text-center"><?php esc_html_e( 'Enter Your Details', 'life-stats-calculator' ); ?></h2>
				<form id="life-stats-form" class="space-y-8">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div class="space-y-3">
							<label class="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
								<i data-lucide="calendar" class="w-4 h-4 text-indigo-500"></i> <?php esc_html_e( 'Birth Date', 'life-stats-calculator' ); ?>
							</label>
							<input 
								type="date" 
								id="birthDate"
								required
								class="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium"
							/>
						</div>
						<div class="space-y-3">
							<label class="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
								<i data-lucide="heart" class="w-4 h-4 text-rose-500"></i> <?php esc_html_e( 'Gender', 'life-stats-calculator' ); ?>
							</label>
							<div class="flex p-1 bg-slate-100 rounded-2xl">
								<button 
									type="button"
									id="gender-male"
									class="gender-btn flex-1 py-3 rounded-xl font-bold transition-all bg-white shadow-sm text-indigo-600"
									data-gender="male"
								>
									<?php esc_html_e( 'Male', 'life-stats-calculator' ); ?>
								</button>
								<button 
									type="button"
									id="gender-female"
									class="gender-btn flex-1 py-3 rounded-xl font-bold transition-all text-slate-500"
									data-gender="female"
								>
									<?php esc_html_e( 'Female', 'life-stats-calculator' ); ?>
								</button>
							</div>
							<input type="hidden" id="gender" value="male" />
						</div>
					</div>

					<div class="space-y-4">
						<div class="flex justify-between items-center">
							<label class="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
								<i data-lucide="smartphone" class="w-4 h-4 text-emerald-500"></i> <?php esc_html_e( 'Daily Phone Usage', 'life-stats-calculator' ); ?>
							</label>
							<span id="phoneUsageValue" class="text-indigo-600 font-black">4 Hours</span>
						</div>
						<input 
							type="range" 
							id="phoneUsage"
							min="0" 
							max="24" 
							step="0.5"
							value="4"
							class="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
						/>
					</div>

					<button 
						type="submit"
						class="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] text-lg"
					>
						<?php esc_html_e( 'Calculate My Life Stats', 'life-stats-calculator' ); ?>
					</button>
				</form>
			</section>

			<!-- Results Section (Hidden by default) -->
			<div id="results-container" class="hidden space-y-24 mb-24">
				<!-- Life Progress Overview -->
				<section class="relative">
					<div class="bg-slate-900 rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 text-white overflow-hidden relative shadow-2xl shadow-indigo-900/20">
						<div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent"></div>
						<div class="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]"></div>
						
						<div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
							<div class="space-y-6">
								<div class="inline-flex items-center gap-2 bg-indigo-500/20 px-3 py-1.5 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest">
									<i data-lucide="award" class="w-3.5 h-3.5"></i> <?php esc_html_e( 'Global Comparison', 'life-stats-calculator' ); ?>
								</div>
								<h2 class="text-2xl md:text-4xl font-black tracking-tighter leading-tight">
									<?php esc_html_e( "You've completed", 'life-stats-calculator' ); ?> <span id="life-percentage-text" class="text-indigo-400">0%</span> <?php esc_html_e( 'of an average life.', 'life-stats-calculator' ); ?>
								</h2>
								<p class="text-sm md:text-base text-slate-400 leading-relaxed max-w-xl">
									<?php esc_html_e( 'Based on the global average life expectancy of 80 years, you have approximately', 'life-stats-calculator' ); ?> 
									<span id="days-remaining-text" class="text-white font-bold">0 days</span> <?php esc_html_e( 'remaining to make your mark.', 'life-stats-calculator' ); ?>
								</p>
								<div class="flex flex-wrap gap-5 pt-2">
									<div class="flex flex-col">
										<span id="years-lived-text" class="text-2xl font-black text-white">0</span>
										<span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1"><?php esc_html_e( 'Years Lived', 'life-stats-calculator' ); ?></span>
									</div>
									<div class="w-px h-10 bg-slate-800 hidden sm:block"></div>
									<div class="flex flex-col">
										<span id="years-remaining-text" class="text-2xl font-black text-indigo-400">0</span>
										<span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1"><?php esc_html_e( 'Years Remaining*', 'life-stats-calculator' ); ?></span>
									</div>
								</div>
							</div>

							<div class="relative flex justify-center">
								<div class="relative w-48 h-48 md:w-64 md:h-64">
									<svg class="w-full h-full transform -rotate-90">
										<circle cx="50%" cy="50%" r="45%" class="stroke-slate-800 fill-none" stroke-width="10" />
										<circle
											id="life-progress-circle"
											cx="50%" cy="50%" r="45%"
											class="stroke-indigo-500 fill-none"
											stroke-width="10"
											stroke-dasharray="283"
											stroke-dashoffset="283"
											stroke-linecap="round"
										/>
									</svg>
									<div class="absolute inset-0 flex flex-col items-center justify-center text-center">
										<span id="life-percentage-circle-text" class="text-3xl md:text-4xl font-black tracking-tighter">
											0%
										</span>
										<span class="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2"><?php esc_html_e( 'Life Progress', 'life-stats-calculator' ); ?></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<p class="text-[10px] text-slate-400 mt-4 text-center italic">
						<?php esc_html_e( '*Based on global average life expectancy of 80 years (29,220 days). Individual results vary.', 'life-stats-calculator' ); ?>
					</p>
				</section>

				<!-- Global Comparison Section -->
				<div class="space-y-6">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div class="p-1.5 bg-indigo-100 rounded-lg">
								<i data-lucide="trending-up" class="w-4 h-4 text-indigo-600"></i>
							</div>
							<h2 class="text-xl font-bold text-slate-900"><?php esc_html_e( 'Global Life Comparison', 'life-stats-calculator' ); ?></h2>
						</div>
						<div class="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
							<i data-lucide="info" class="w-4 h-4"></i> <?php esc_html_e( 'Based on 80 Year Avg', 'life-stats-calculator' ); ?>
						</div>
					</div>
					
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
						<div class="comparison-card bg-white p-6 rounded-3xl border border-slate-100 shadow-sm" data-stat="days" data-total="29220">
							<div class="p-3 rounded-2xl bg-indigo-500 text-white w-fit mb-4"><i data-lucide="calendar" class="w-6 h-6"></i></div>
							<h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><?php esc_html_e( 'Days Alive', 'life-stats-calculator' ); ?></h4>
							<div class="text-2xl font-black text-slate-900 mb-4"><span class="stat-value">0</span> <span class="text-sm text-slate-400">Days</span></div>
							<div class="h-2 bg-slate-100 rounded-full overflow-hidden"><div class="progress-bar h-full bg-indigo-500 w-0 transition-all duration-1000"></div></div>
						</div>
						<div class="comparison-card bg-white p-6 rounded-3xl border border-slate-100 shadow-sm" data-stat="heartbeats" data-total="3000000000">
							<div class="p-3 rounded-2xl bg-rose-500 text-white w-fit mb-4"><i data-lucide="heart" class="w-6 h-6"></i></div>
							<h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><?php esc_html_e( 'Heartbeats', 'life-stats-calculator' ); ?></h4>
							<div class="text-2xl font-black text-slate-900 mb-4"><span class="stat-value">0</span> <span class="text-sm text-slate-400">Beats</span></div>
							<div class="h-2 bg-slate-100 rounded-full overflow-hidden"><div class="progress-bar h-full bg-rose-500 w-0 transition-all duration-1000"></div></div>
						</div>
						<div class="comparison-card bg-white p-6 rounded-3xl border border-slate-100 shadow-sm" data-stat="steps" data-total="146100000">
							<div class="p-3 rounded-2xl bg-emerald-500 text-white w-fit mb-4"><i data-lucide="footprints" class="w-6 h-6"></i></div>
							<h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><?php esc_html_e( 'Steps Walked', 'life-stats-calculator' ); ?></h4>
							<div class="text-2xl font-black text-slate-900 mb-4"><span class="stat-value">0</span> <span class="text-sm text-slate-400">Steps</span></div>
							<div class="h-2 bg-slate-100 rounded-full overflow-hidden"><div class="progress-bar h-full bg-emerald-500 w-0 transition-all duration-1000"></div></div>
						</div>
						<div class="comparison-card bg-white p-6 rounded-3xl border border-slate-100 shadow-sm" data-stat="sleepHours" data-total="233760">
							<div class="p-3 rounded-2xl bg-slate-800 text-white w-fit mb-4"><i data-lucide="moon" class="w-6 h-6"></i></div>
							<h4 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2"><?php esc_html_e( 'Sleep Time', 'life-stats-calculator' ); ?></h4>
							<div class="text-2xl font-black text-slate-900 mb-4"><span class="stat-value">0</span> <span class="text-sm text-slate-400">Hours</span></div>
							<div class="h-2 bg-slate-100 rounded-full overflow-hidden"><div class="progress-bar h-full bg-slate-800 w-0 transition-all duration-1000"></div></div>
						</div>
					</div>
				</div>

				<!-- Core Stats Grid -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
					<div>
						<h3 class="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
							<i data-lucide="clock" class="w-6 h-6 text-indigo-500"></i> <?php esc_html_e( 'Core Statistics', 'life-stats-calculator' ); ?>
						</h3>
						<div id="core-stats-grid" class="grid grid-cols-2 gap-4">
							<!-- Stat Cards will be populated by JS -->
						</div>
					</div>
					<div>
						<h3 class="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
							<i data-lucide="heart" class="w-6 h-6 text-rose-500"></i> <?php esc_html_e( 'Body & Lifestyle', 'life-stats-calculator' ); ?>
						</h3>
						<div id="bio-stats-grid" class="grid grid-cols-2 gap-4">
							<!-- Stat Cards will be populated by JS -->
						</div>
					</div>
				</div>

				<!-- Fun Predictions Section -->
				<div class="space-y-8 mb-24">
					<h3 class="text-2xl font-bold text-slate-800 flex items-center gap-2">
						<i data-lucide="trending-up" class="w-6 h-6 text-indigo-500"></i> <?php esc_html_e( 'Fun Predictions', 'life-stats-calculator' ); ?>
					</h3>
					<div id="predictions-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<!-- Prediction Cards will be populated by JS -->
					</div>
				</div>

				<!-- Share Section -->
				<div class="flex flex-col items-center gap-6 py-12 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 mb-24">
					<div class="p-4 bg-indigo-50 rounded-2xl">
						<i data-lucide="share-2" class="w-8 h-8 text-indigo-600"></i>
					</div>
					<div class="text-center space-y-2">
						<h3 class="text-2xl font-black text-slate-900"><?php esc_html_e( 'Share Your Life Stats', 'life-stats-calculator' ); ?></h3>
						<p class="text-slate-500 font-medium"><?php esc_html_e( 'Inspire others with your journey through time.', 'life-stats-calculator' ); ?></p>
					</div>
					<div class="flex gap-4">
						<button id="share-btn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-3">
							<i data-lucide="copy" class="w-5 h-5"></i> <?php esc_html_e( 'Copy Results Link', 'life-stats-calculator' ); ?>
						</button>
					</div>
				</div>
			</div>

			<!-- FAQ Section -->
			<section class="max-w-3xl mx-auto mt-24">
				<h2 class="text-3xl font-black text-slate-900 mb-12 text-center"><?php esc_html_e( 'Frequently Asked Questions', 'life-stats-calculator' ); ?></h2>
				<div class="space-y-4">
					<div class="faq-item border-b border-slate-200 py-4">
						<button class="faq-toggle w-full flex justify-between items-center text-left font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
							<span><?php esc_html_e( 'How does the Life Stats Calculator work?', 'life-stats-calculator' ); ?></span>
							<i data-lucide="chevron-down" class="w-5 h-5"></i>
						</button>
						<div class="faq-content hidden mt-2 text-slate-600 leading-relaxed">
							<?php esc_html_e( 'Our calculator uses your precise birthdate to calculate the exact time elapsed since your birth. We then convert this time into various units (days, seconds, hours, etc.) and use biological averages to estimate stats like total heartbeats, breaths, and blinks.', 'life-stats-calculator' ); ?>
						</div>
					</div>
					<div class="faq-item border-b border-slate-200 py-4">
						<button class="faq-toggle w-full flex justify-between items-center text-left font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
							<span><?php esc_html_e( 'How many seconds have I been alive?', 'life-stats-calculator' ); ?></span>
							<i data-lucide="chevron-down" class="w-5 h-5"></i>
						</button>
						<div class="faq-content hidden mt-2 text-slate-600 leading-relaxed">
							<?php esc_html_e( 'The exact number depends on your birthdate and the current moment. For example, a 30-year-old has lived for approximately 946,080,000 seconds. Our calculator provides a real-time, ticking display of your age in seconds.', 'life-stats-calculator' ); ?>
						</div>
					</div>
					<div class="faq-item border-b border-slate-200 py-4">
						<button class="faq-toggle w-full flex justify-between items-center text-left font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
							<span><?php esc_html_e( 'Is the heartbeats estimate accurate?', 'life-stats-calculator' ); ?></span>
							<i data-lucide="chevron-down" class="w-5 h-5"></i>
						</button>
						<div class="faq-content hidden mt-2 text-slate-600 leading-relaxed">
							<?php esc_html_e( 'The heartbeats stat is an estimate based on an average resting heart rate of 80 beats per minute. While individual results vary based on fitness and health, it provides a staggering look at the tireless work your heart does.', 'life-stats-calculator' ); ?>
						</div>
					</div>
					<div class="faq-item border-b border-slate-200 py-4">
						<button class="faq-toggle w-full flex justify-between items-center text-left font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
							<span><?php esc_html_e( 'How many days are in 80 years?', 'life-stats-calculator' ); ?></span>
							<i data-lucide="chevron-down" class="w-5 h-5"></i>
						</button>
						<div class="faq-content hidden mt-2 text-slate-600 leading-relaxed">
							<?php esc_html_e( 'An 80-year life consists of approximately 29,220 days. This includes 20 leap years. Our calculator shows you exactly how many of these days you have already experienced.', 'life-stats-calculator' ); ?>
						</div>
					</div>
					<div class="faq-item border-b border-slate-200 py-4">
						<button class="faq-toggle w-full flex justify-between items-center text-left font-semibold text-slate-800 hover:text-indigo-600 transition-colors">
							<span><?php esc_html_e( 'Do you store my birthdate?', 'life-stats-calculator' ); ?></span>
							<i data-lucide="chevron-down" class="w-5 h-5"></i>
						</button>
						<div class="faq-content hidden mt-2 text-slate-600 leading-relaxed">
							<?php esc_html_e( 'No. Your privacy is our priority. All calculations are performed locally in your browser using JavaScript. We do not store, save, or transmit your birthdate to any servers.', 'life-stats-calculator' ); ?>
						</div>
					</div>
				</div>
			</section>

			<!-- Blog Section -->
			<section class="max-w-6xl mx-auto mt-24 mb-24">
				<div class="flex justify-between items-end mb-12">
					<div>
						<h2 class="text-3xl font-black text-slate-900"><?php esc_html_e( 'From the Blog', 'life-stats-calculator' ); ?></h2>
						<p class="text-slate-500 font-medium mt-2"><?php esc_html_e( 'Explore more about time, health, and longevity.', 'life-stats-calculator' ); ?></p>
					</div>
					<a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>" class="text-indigo-600 font-black flex items-center gap-2 hover:underline">
						<?php esc_html_e( 'View All Posts', 'life-stats-calculator' ); ?> <i data-lucide="external-link" class="w-4 h-4"></i>
					</a>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<?php
					$recent_posts = new WP_Query( array(
						'posts_per_page' => 3,
						'post_status'    => 'publish',
					) );

					if ( $recent_posts->have_posts() ) :
						while ( $recent_posts->have_posts() ) :
							$recent_posts->the_post();
							?>
							<article class="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group">
								<span class="text-xs font-semibold text-indigo-500 uppercase tracking-wider"><?php echo get_the_date(); ?></span>
								<h3 class="text-xl font-bold text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors">
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								</h3>
								<div class="text-slate-600 mt-3 text-sm line-clamp-2">
									<?php the_excerpt(); ?>
								</div>
								<div class="mt-4 flex items-center text-indigo-600 font-medium text-sm">
									<?php esc_html_e( 'Read More', 'life-stats-calculator' ); ?> <i data-lucide="trending-up" class="w-4 h-4 ml-1"></i>
								</div>
							</article>
							<?php
						endwhile;
						wp_reset_postdata();
					endif;
					?>
				</div>
				<div class="mt-12 text-center">
					<a href="<?php echo esc_url( get_permalink( get_option( 'page_for_posts' ) ) ); ?>" class="inline-flex items-center gap-2 bg-white border-2 border-slate-100 px-8 py-4 rounded-2xl font-black text-slate-900 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm">
						<?php esc_html_e( 'View All Blog Posts', 'life-stats-calculator' ); ?> <i data-lucide="arrow-right" class="w-4 h-4"></i>
					</a>
				</div>
			</section>
		</div>

	</main><!-- #main -->

<?php
get_footer();
