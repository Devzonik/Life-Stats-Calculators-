<?php
/**
 * Template Name: Elementor Canvas (Blank Page)
 *
 * This template is designed for Elementor Canvas, providing a completely blank page.
 */

wp_head();
?>

<div id="page" class="site">
    <main id="primary" class="site-main">
        <?php
        while ( have_posts() ) :
            the_post();
            the_content();
        endwhile;
        ?>
    </main>
</div>

<?php
wp_footer();
?>
</body>
</html>
