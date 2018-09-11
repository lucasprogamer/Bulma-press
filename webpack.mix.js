let mix = require('laravel-mix');



mix.js('assets/js/main.js', 'dist/js/')
    .js('assets/js/jmasks.js', 'dist/js/')
    .js('assets/js/cf7bulma.js', 'dist/js/')
   .sass('assets/sass/app.scss', 'dist/css/')
   .copy('assets/images/*.*', 'dist/img')
   .copy('assets/fonts/*.*', 'dist/fonts')
   .sourceMaps();

mix.webpackConfig({
    externals: {
        "jquery": "jQuery"
    },
     devtool: 'inline-source-map',
})

    mix.browserSync({
        proxy: 'https://bulma-press.app', //your url ex. http://localhost
         files: [
                  "assets/**/*",
                  "*"
                ]
})
mix.options({
    processCssUrls: false,
});

