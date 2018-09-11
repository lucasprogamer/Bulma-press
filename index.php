<?php get_header(); ?>
<main role="main" class="app_main">
    <?php while (have_posts()): the_post(); ?>
        <?php the_title(); ?>
        <?php the_content( ) ?>
    <?php endwhile; ?>
</main>
<?php get_footer(); ?>
