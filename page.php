<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
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
						the_content();

						wp_link_pages(
							array(
								'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'life-stats-calculator' ),
								'after'  => '</div>',
							)
						);
						?>
					</div>
				</div><!-- .entry-content -->

				<?php if ( get_edit_post_link() ) : ?>
					<footer class="entry-footer max-w-4xl mx-auto px-4 pb-16">
						<?php
						edit_post_link(
							sprintf(
								wp_kses(
									/* translators: %s: Name of current post. Only visible to screen readers */
									__( 'Edit <span class="screen-reader-text">%s</span>', 'life-stats-calculator' ),
									array(
										'span' => array(
											'class' => array(),
										),
									)
								),
								wp_kses_post( get_the_title() )
							),
							'<span class="edit-link">',
							'</span>'
						);
						?>
					</footer><!-- .entry-footer -->
				<?php endif; ?>
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
