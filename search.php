<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package life-stats-calculator
 */

get_header();
?>

	<main id="primary" class="site-main">

		<?php if ( have_posts() ) : ?>

			<header class="page-header bg-white border-b border-slate-200 pt-24 pb-16 px-4">
				<div class="max-w-4xl mx-auto text-center">
					<div class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
						<i data-lucide="search" class="w-4 h-4"></i> <?php esc_html_e( 'Search Results', 'life-stats-calculator' ); ?>
					</div>
					<h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
						<?php
						/* translators: %s: search query. */
						printf( esc_html__( 'Search Results for: %s', 'life-stats-calculator' ), '<span>' . get_search_query() . '</span>' );
						?>
					</h1>
					<div class="max-w-md mx-auto">
						<?php get_search_form(); ?>
					</div>
				</div>
			</header><!-- .page-header -->

			<div class="max-w-6xl mx-auto px-4 py-16">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<?php
					while ( have_posts() ) :
						the_post();
						?>

						<article id="post-<?php the_ID(); ?>" <?php post_class( 'group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all overflow-hidden flex flex-col' ); ?>>
							<?php if ( has_post_thumbnail() ) : ?>
								<div class="relative h-64 overflow-hidden">
									<?php the_post_thumbnail( 'medium_large', array( 'class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' ) ); ?>
									<div class="absolute top-4 left-4">
										<div class="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
											<?php echo get_the_date(); ?>
										</div>
									</div>
								</div>
							<?php endif; ?>

							<div class="p-8 flex flex-col flex-grow">
								<h2 class="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
									<a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
								</h2>
								<div class="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
									<?php the_excerpt(); ?>
								</div>
								<div class="flex items-center justify-between pt-6 border-t border-slate-50">
									<a href="<?php the_permalink(); ?>" class="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2 hover:gap-3 transition-all">
										<?php esc_html_e( 'Read More', 'life-stats-calculator' ); ?> <i data-lucide="arrow-right" class="w-4 h-4"></i>
									</a>
								</div>
							</div>
						</article><!-- #post-<?php the_ID(); ?> -->

						<?php
					endwhile;
					?>
				</div>

				<?php
				the_posts_navigation(
					array(
						'prev_text' => '<i data-lucide="arrow-left" class="w-4 h-4"></i> ' . esc_html__( 'Older posts', 'life-stats-calculator' ),
						'next_text' => esc_html__( 'Newer posts', 'life-stats-calculator' ) . ' <i data-lucide="arrow-right" class="w-4 h-4"></i>',
					)
				);
				?>
			</div>

		<?php else : ?>

			<?php get_template_part( 'template-parts/content', 'none' ); ?>

		<?php endif; ?>

	</main><!-- #main -->

<?php
get_footer();
