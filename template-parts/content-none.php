<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package life-stats-calculator
 */

?>

<section class="no-results not-found bg-white border-b border-slate-200 pt-24 pb-16 px-4">
	<div class="max-w-4xl mx-auto text-center">
		<div class="inline-flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
			<i data-lucide="alert-circle" class="w-4 h-4"></i> <?php esc_html_e( 'No Results', 'life-stats-calculator' ); ?>
		</div>
		<h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
			<?php esc_html_e( 'Nothing Found', 'life-stats-calculator' ); ?>
		</h1>
		
		<div class="page-content prose prose-slate max-w-3xl mx-auto text-slate-600 leading-relaxed text-lg mb-12">
			<?php
			if ( is_home() && current_user_can( 'publish_posts' ) ) :

				printf(
					'<p>' . wp_kses(
						/* translators: 1: link to WP admin new post page. */
						__( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'life-stats-calculator' ),
						array(
							'a' => array(
								'href' => array(),
							),
						)
					) . '</p>',
					esc_url( admin_url( 'post-new.php' ) )
				);

			elseif ( is_search() ) :
				?>

				<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'life-stats-calculator' ); ?></p>
				<div class="max-w-md mx-auto mt-8">
					<?php get_search_form(); ?>
				</div>

				<?php
			else :
				?>

				<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'life-stats-calculator' ); ?></p>
				<div class="max-w-md mx-auto mt-8">
					<?php get_search_form(); ?>
				</div>

				<?php
			endif;
			?>
		</div><!-- .page-content -->
	</div>
</section><!-- .no-results -->
