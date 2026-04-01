<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package life-stats-calculator
 */

get_header();
?>

	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();
			?>

			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<header class="entry-header bg-white border-b border-slate-200 pt-24 pb-16 px-4">
					<div class="max-w-4xl mx-auto text-center">
						<div class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
							<i data-lucide="calendar" class="w-4 h-4"></i> <?php echo get_the_date(); ?>
						</div>
						<h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
							<?php the_title(); ?>
						</h1>
						<?php if ( has_post_thumbnail() ) : ?>
							<div class="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 mb-12">
								<?php the_post_thumbnail( 'full', array( 'class' => 'w-full h-auto object-cover' ) ); ?>
							</div>
						<?php endif; ?>
					</div>
				</header><!-- .entry-header -->

				<div class="entry-content max-w-4xl mx-auto px-4 py-16">
					<div class="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
						<?php
						the_content(
							sprintf(
								wp_kses(
									/* translators: %s: Name of current post. Only visible to screen readers */
									__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'life-stats-calculator' ),
									array(
										'span' => array(
											'class' => array(),
										),
									)
								),
								wp_kses_post( get_the_title() )
							)
						);

						wp_link_pages(
							array(
								'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'life-stats-calculator' ),
								'after'  => '</div>',
							)
						);
						?>
					</div>
				</div><!-- .entry-content -->

				<footer class="entry-footer max-w-4xl mx-auto px-4 pb-16">
					<?php life_stats_calculator_entry_footer(); ?>
				</footer><!-- .entry-footer -->
			</article><!-- #post-<?php the_ID(); ?> -->

			<?php
			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
