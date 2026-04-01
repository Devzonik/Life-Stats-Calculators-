<?php
/**
 * Life Stats Calculator functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package life-stats-calculator
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function life_stats_calculator_setup() {
	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );

	// Register navigation menus.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'life-stats-calculator' ),
			'footer' => esc_html__( 'Footer', 'life-stats-calculator' ),
		)
	);

	// Switch default core markup for search form, comment form, and comments to output valid HTML5.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	// Add support for core custom logo.
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'life_stats_calculator_setup' );

/**
 * Enqueue scripts and styles.
 */
function life_stats_calculator_scripts() {
	// Enqueue Google Fonts
	wp_enqueue_style( 'life-stats-calculator-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap', array(), null );

	// Enqueue Tailwind (via CDN for simplicity in this conversion, or local if preferred)
	wp_enqueue_script( 'tailwind-cdn', 'https://cdn.tailwindcss.com', array(), null, false );

	// Enqueue main stylesheet.
	wp_enqueue_style( 'life-stats-calculator-style', get_stylesheet_uri(), array(), '1.0.0' );

	// Enqueue Lucide Icons
	wp_enqueue_script( 'lucide-icons', 'https://unpkg.com/lucide@latest', array(), null, true );

	// Enqueue Framer Motion (via CDN)
	wp_enqueue_script( 'framer-motion', 'https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js', array(), null, true );

	// Enqueue Custom Calculator Logic
	wp_enqueue_script( 'life-stats-calculator-logic', get_template_directory_uri() . '/assets/js/calculator.js', array('jquery'), '1.0.0', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'life_stats_calculator_scripts' );

/**
 * Add Elementor Support
 */
function life_stats_calculator_add_elementor_support() {
	add_theme_support( 'elementor-full-width' );
	add_theme_support( 'elementor-canvas' );
}
add_action( 'after_setup_theme', 'life_stats_calculator_add_elementor_support' );

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Import blog posts and pages.
 */
require get_template_directory() . '/inc/import-blog.php';
