let mix = require('laravel-mix');

mix.browserSync({
    proxy: 'https://f2sports.app'
})

mix.js('assets/js/main.js', 'dist/js/')
	.sass('assets/sass/app.scss', 'dist/css/');

