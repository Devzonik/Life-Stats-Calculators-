<article id="post-<?php the_ID(); ?>" <?php post_class('bg-white p-8 rounded-3xl shadow-sm border border-slate-100'); ?>>
    <header class="mb-4">
        <h2 class="text-2xl font-bold mb-2">
            <a href="<?php the_permalink(); ?>" class="hover:text-indigo-600 transition-colors"><?php the_title(); ?></a>
        </h2>
        <div class="text-slate-400 text-sm font-medium">
            <?php echo get_the_date(); ?>
        </div>
    </header>
    <div class="text-slate-600 leading-relaxed mb-6">
        <?php the_excerpt(); ?>
    </div>
    <a href="<?php the_permalink(); ?>" class="text-indigo-600 font-bold hover:underline">Read More &rarr;</a>
</article>
