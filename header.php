<!DOCTYPE html>
<html class="no-js" <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="profile" href="http://gmpg.org/xfn/11" />
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
        <?php wp_head(); ?>
    </head>
    <body <?php body_class(); ?>>
        <?php if (is_admin_bar_showing()): ?>
        <style>
	        html { margin-top: 32px !important; }
	        * html body { margin-top: 32px !important; }
        </style>
        <?php endif; ?>
        <header>
            <nav class="navbar is-fixed-top-touch" id="main-menu" role="navigation" aria-label="main navigation">
                <div class="container is-fullhd">
                    <div class="navbar-start">
                        <div class="navbar-brand">
                            <a class="navbar-item" href="/">
                                BULMAPRESS
                            </a>
                            <a role="button" class="navbar-burger" aria-label="menu" data-target="menu_itens" aria-expanded="false">
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>
                        <?php  wp_nav_menu(['theme_location' => 'main-menu', 'menu_class' => 'navbar-menu',  'menu_id' => 'menu_itens']) ?>
                    </div>
                </div>
            </nav>
        </header>
