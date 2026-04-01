<?php
/**
 * Life Stats Pro Customizer functionality
 */

if ( ! function_exists( 'lifestats_pro_customize_register' ) ) :
    function lifestats_pro_customize_register( $wp_customize ) {
        // Add Section for Theme Colors
        $wp_customize->add_section( 'lifestats_pro_colors', array(
            'title'    => esc_html__( 'Theme Colors', 'lifestats-pro' ),
            'priority' => 30,
        ) );

        // Accent Color
        $wp_customize->add_setting( 'accent_color', array(
            'default'           => '#4f46e5',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'refresh',
        ) );

        $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'accent_color', array(
            'label'    => esc_html__( 'Accent Color', 'lifestats-pro' ),
            'section'  => 'lifestats_pro_colors',
            'settings' => 'accent_color',
        ) ) );
    }
endif;
add_action( 'customize_register', 'lifestats_pro_customize_register' );

/**
 * Output Customizer CSS
 */
if ( ! function_exists( 'lifestats_pro_customize_css' ) ) :
    function lifestats_pro_customize_css() {
        $accent_color = get_theme_mod( 'accent_color', '#4f46e5' );
        ?>
        <style type="text/css">
            .text-indigo-600 { color: <?php echo esc_attr( $accent_color ); ?> !important; }
            .bg-indigo-600 { background-color: <?php echo esc_attr( $accent_color ); ?> !important; }
            .border-indigo-500 { border-color: <?php echo esc_attr( $accent_color ); ?> !important; }
            .shadow-indigo-200 { --tw-shadow-color: <?php echo esc_attr( $accent_color ); ?>40 !important; }
        </style>
        <?php
    }
endif;
add_action( 'wp_head', 'lifestats_pro_customize_css' );
