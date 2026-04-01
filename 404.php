<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package life-stats-calculator
 */

get_header();
?>

	<main id="primary" class="site-main">

		<section class="error-404 not-found bg-white border-b border-slate-200 pt-24 pb-16 px-4">
			<div class="max-w-4xl mx-auto text-center">
				<div class="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
					<i data-lucide="alert-circle" class="w-4 h-4"></i> <?php esc_html_e( 'Error 404', 'life-stats-calculator' ); ?>
				</div>
				<h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
					<?php esc_html_e( "Oops! That page can't be found.", 'life-stats-calculator' ); ?>
				</h1>
				<p class="text-slate-600 leading-relaxed text-lg mb-12">
					<?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'life-stats-calculator' ); ?>
				</p>
				
				<div class="max-w-md mx-auto">
					<?php get_search_form(); ?>
				</div>
			</div>
		</section><!-- .error-404 -->

		<div class="max-w-6xl mx-auto px-4 py-16 text-center">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-slate-200 transition-all active:scale-[0.98] text-lg">
				<i data-lucide="home" class="w-5 h-5"></i> <?php esc_html_e( 'Back to Home', 'life-stats-calculator' ); ?>
			</a>
		</div>

	</main><!-- #main -->

<?php
get_footer();
