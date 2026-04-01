<?php
/**
 * Template Name: Full Width (Elementor Optimized)
 *
 * This template is designed to be used with Elementor to create full-width pages.
 */

get_header();
?>

<main id="primary" class="site-main">

    <?php
    while ( have_posts() ) :
        the_post();

        the_content();

    endwhile; // End of the loop.
    ?>

</main><!-- #main -->

<?php
get_footer();
