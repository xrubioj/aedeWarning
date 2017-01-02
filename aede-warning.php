<?php
/*
Plugin Name: AEDE Warning
Plugin URI: http://xrubio.com
Description: Small plugin that checks if you're visiting the page from Spain and warns you about the new "Google tax" that is beign approved in the country.
Version: 1.0
Author: Xavier Rubio Jansana
Author URI: http://xrubio.com
License: MIT
*/

function aede_warning_scripts(){
	wp_enqueue_script(
		'aede-warning',
		plugins_url( '/js/aede-warning.js' , __FILE__ ),
		array( 'jquery' )
	);
}

add_action('wp_enqueue_scripts', 'aede_warning_scripts');

?>