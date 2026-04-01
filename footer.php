<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package life-stats-calculator
 */

?>

	<footer id="colophon" class="site-footer bg-slate-900 py-16 px-4 text-white">
		<div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
			<div class="col-span-1 md:col-span-2 space-y-6">
				<div class="flex items-center gap-2">
					<div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
						<i data-lucide="clock" class="w-6 h-6 text-white"></i>
					</div>
					<span class="text-2xl font-black tracking-tighter"><?php bloginfo( 'name' ); ?></span>
				</div>
				<p class="text-slate-400 leading-relaxed max-w-sm">
					<?php bloginfo( 'description' ); ?>
				</p>
				<div class="flex gap-4">
					<a href="#" class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-all group">
						<i data-lucide="share-2" class="w-5 h-5 text-slate-400 group-hover:text-white"></i>
					</a>
					<a href="#" class="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-all group">
						<i data-lucide="heart" class="w-5 h-5 text-slate-400 group-hover:text-white"></i>
					</a>
				</div>
			</div>

			<div class="space-y-6">
				<h4 class="text-sm font-black uppercase tracking-[0.2em] text-slate-500"><?php esc_html_e( 'Quick Links', 'life-stats-calculator' ); ?></h4>
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'footer',
						'menu_id'        => 'footer-menu',
						'container'      => 'nav',
						'menu_class'     => 'flex flex-col gap-4 text-slate-400 font-bold',
					)
				);
				?>
			</div>

			<div class="space-y-6">
				<h4 class="text-sm font-black uppercase tracking-[0.2em] text-slate-500"><?php esc_html_e( 'Legal', 'life-stats-calculator' ); ?></h4>
				<nav class="flex flex-col gap-4 text-slate-400 font-bold">
					<a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>" class="hover:text-white transition-colors"><?php esc_html_e( 'Privacy Policy', 'life-stats-calculator' ); ?></a>
					<a href="<?php echo esc_url( home_url( '/terms-of-service' ) ); ?>" class="hover:text-white transition-colors"><?php esc_html_e( 'Terms of Service', 'life-stats-calculator' ); ?></a>
				</nav>
			</div>
		</div>

		<div class="max-w-6xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
			<div>&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'All rights reserved.', 'life-stats-calculator' ); ?></div>
			<div class="flex items-center gap-2">
				<?php esc_html_e( 'Made with', 'life-stats-calculator' ); ?> <i data-lucide="heart" class="w-3 h-3 text-rose-500 fill-rose-500"></i> <?php esc_html_e( 'for every second of life', 'life-stats-calculator' ); ?>
			</div>
		</div>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

<script>
	// Initialize Lucide icons
	lucide.createIcons();
</script>

</body>
</html>
