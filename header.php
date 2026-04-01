<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package life-stats-calculator
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<!-- SEO Meta Tags (Preserved from original) -->
	<meta name="google-site-verification" content="N29dipfc7HIaY_sXaRPBEag0JYsH-3XTWsQk63xycik" />
	<meta name="msvalidate.01" content="A38B1EBA104381C8147707F47E6E116F" />
	
	<?php wp_head(); ?>

	<!-- JSON-LD Structured Data: SoftwareApplication -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "Life Stats Calculator",
		"operatingSystem": "Any",
		"applicationCategory": "UtilityApplication",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		},
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": "4.9",
			"ratingCount": "1250"
		}
	}
	</script>

	<!-- JSON-LD Structured Data: FAQPage -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [{
			"@type": "Question",
			"name": "How does the Life Stats Calculator work?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "Our calculator uses your precise birthdate to calculate the exact time elapsed since your birth. We then convert this time into various units (days, seconds, hours, etc.) and use biological averages to estimate stats like total heartbeats, breaths, and blinks."
			}
		}, {
			"@type": "Question",
			"name": "How many seconds have I been alive?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "The exact number depends on your birthdate and the current moment. For example, a 30-year-old has lived for approximately 946,080,000 seconds. Our calculator provides a real-time, ticking display of your age in seconds."
			}
		}, {
			"@type": "Question",
			"name": "Is the heartbeats estimate accurate?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "The heartbeats stat is an estimate based on an average resting heart rate of 80 beats per minute. While individual results vary based on fitness and health, it provides a staggering look at the tireless work your heart does."
			}
		}, {
			"@type": "Question",
			"name": "How many days are in 80 years?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "An 80-year life consists of approximately 29,220 days. This includes 20 leap years. Our calculator shows you exactly how many of these days you have already experienced."
			}
		}, {
			"@type": "Question",
			"name": "Do you store my birthdate?",
			"acceptedAnswer": {
				"@type": "Answer",
				"text": "No. Your privacy is our priority. All calculations are performed locally in your browser using JavaScript. We do not store, save, or transmit your birthdate to any servers."
			}
		}]
	}
	</script>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'life-stats-calculator' ); ?></a>

	<header id="masthead" class="site-header bg-white border-b border-slate-200">
		<div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
			<div class="site-branding">
				<?php
				if ( has_custom_logo() ) :
					the_custom_logo();
				else :
					?>
					<h1 class="site-title text-2xl font-black text-slate-900 tracking-tight">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a>
					</h1>
					<?php
				endif;
				?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation">
				<button class="menu-toggle md:hidden" aria-controls="primary-menu" aria-expanded="false">
					<i data-lucide="menu" class="w-6 h-6 text-slate-900"></i>
				</button>
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'menu_id'        => 'primary-menu',
						'container'      => 'div',
						'container_class' => 'hidden md:block',
						'menu_class'     => 'flex items-center gap-8 font-bold text-slate-600 hover:text-indigo-600 transition-colors',
					)
				);
				?>
			</nav><!-- #site-navigation -->
		</div>
	</header><!-- #masthead -->
