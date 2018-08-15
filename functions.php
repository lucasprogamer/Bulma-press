<?php
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
}
function filter_styles_uri( $uri, $dir ) {
	return $dir . '/dist/css/app.css';
}
add_filter( 'stylesheet_uri', 'filter_styles_uri', 10, 2 );