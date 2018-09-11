<?php
require_once get_template_directory() . '/inc/BulmaWalker.php';
require_once( ABSPATH . 'wp-admin/includes/plugin.php' );


/**
 * Setups images
 */
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'post-thumbnail-large', 1413, 640 );

/**
 * Clean up wp_nav_menu_args
 *
 * Remove the container
 * Remove the id="" on nav menu items
 */
add_filter('wp_nav_menu_args', function ($args = '') {
    $nav_menu_args = [];
    $nav_menu_args['container'] = false;
    if (!$args['items_wrap']) {
        $nav_menu_args['items_wrap'] = '<ul class="%2$s">%3$s</ul>';
    }
    if (!$args['walker']) {
        $nav_menu_args['walker'] = new BulmaWalker();
    }
    return array_merge($args, $nav_menu_args);
});

add_filter('nav_menu_item_id', '__return_null');

/**
 * Register nav menus.
 */
register_nav_menus(
	array(
        'main-menu' => __( 'Main Menu', 'bulmapress' ),
		'footer' => __( 'Rodapé', 'bulmapress' ),
	)
);

/**
 * Slug in body class
 * @param string $classes name class
 */
function add_slug_body_class( $classes ) {
	global $post;
		if ( isset( $post ) ) {
			$classes[] = $post->post_type . '-' . $post->post_name;
		}
			return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );



add_action('wp_enqueue_scripts','bulmapress_enqueue_scripts');

function bulmapress_enqueue_scripts() {


 	wp_enqueue_style('theme_styles', get_stylesheet_uri(), array(), null, 'all' );
	wp_enqueue_script('theme_scripts', get_template_directory_uri().'/dist/js/main.js' , array('jquery'), null, true);
    wp_enqueue_script('masks_scripts', get_template_directory_uri().'/dist/js/jmasks.js' , array('jquery'), null, true);
       if (is_plugin_active( 'contact-form-7/wp-contact-form-7.php' )) {
            wp_enqueue_script('cf7_loading', get_template_directory_uri().'/dist/js/cf7bulma.js' , array('jquery'), null, true);
       }
    wp_enqueue_script('masks_scripts', get_template_directory_uri().'/dist/js/jmasks.js' , array('jquery'), null, true);

}
function filter_styles_uri( $uri, $dir ) {
	return $dir . '/dist/css/app.css';
}
add_filter( 'stylesheet_uri', 'filter_styles_uri', 10, 2 );


add_filter('wpcf7_autop_or_not', '__return_false');







