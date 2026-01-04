<script lang="ts">
    import { fly, fade } from "svelte/transition";
    import ScrambleText from "$lib/components/ScrambleText.svelte";
    let { data } = $props();

    const Content = $derived(data.content);
</script>

<article class="max-w-6xl mx-auto px-12 pt-32 pb-24">
    <!-- Header -->
    <header class="mb-16">
        <a
            href="/writeups"
            class="text-xs font-mono text-brand-muted hover:text-brand-primary transition-colors flex items-center gap-2 mb-12 group"
        >
            <span class="group-hover:-translate-x-1 transition-transform"
                >←</span
            > ARCHIVE_ACCESS
        </a>

        <div class="flex flex-wrap gap-2 mb-8">
            {#each data.meta.categories || [] as category}
                <span
                    class="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-primary/10 text-brand-primary uppercase tracking-wider"
                >
                    {category}
                </span>
            {/each}
        </div>

        <h1
            class="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight"
        >
            <ScrambleText text={data.meta.title} delay={300} />
        </h1>

        <div
            class="flex items-center gap-4 text-xs text-brand-muted font-mono uppercase tracking-widest"
        >
            <span>{data.meta.date}</span>
            <span class="w-1 h-1 rounded-full bg-brand-muted/30"></span>
            <span>{data.meta.description}</span>
        </div>
    </header>

    <!-- Mission Summary / Metadata -->
    {#if data.meta.challenge || data.meta.ctf}
        <section
            class="mb-16 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden group"
        >
            <div
                class="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl tracking-tighter rotate-12 group-hover:rotate-6 transition-transform"
            >
                DATA_LOG
            </div>
            <h2
                class="text-xs font-black uppercase tracking-[0.3em] text-brand-primary mb-8 flex items-center gap-3"
            >
                <span
                    class="w-2 h-2 rounded-full bg-brand-primary animate-pulse"
                ></span>
                <ScrambleText text="Mission Summary" delay={500} />
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {#if data.meta.challenge}
                    <div>
                        <div
                            class="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1"
                        >
                            Challenge
                        </div>
                        <div class="text-lg font-bold text-white uppercase">
                            {data.meta.challenge}
                        </div>
                    </div>
                {/if}
                {#if data.meta.ctf}
                    <div>
                        <div
                            class="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1"
                        >
                            CTF Event
                        </div>
                        <div class="text-lg font-bold text-white uppercase">
                            {data.meta.ctf}
                        </div>
                    </div>
                {/if}
                {#if data.meta.challenge_author}
                    <div>
                        <div
                            class="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1"
                        >
                            Challenge Author
                        </div>
                        <div class="text-lg font-bold text-white uppercase">
                            <ScrambleText
                                text={data.meta.challenge_author}
                                delay={600}
                            />
                        </div>
                    </div>
                {/if}
                {#if data.meta.challenge_description}
                    <div class="md:col-span-2">
                        <div
                            class="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2"
                        >
                            Challenge Description
                        </div>
                        <div
                            class="text-sm text-brand-muted/80 leading-relaxed italic max-w-2xl"
                        >
                            {data.meta.challenge_description}
                        </div>
                    </div>
                {/if}

                {#if data.meta.challenge_files && data.meta.challenge_files.length > 0}
                    <div class="md:col-span-2">
                        <div
                            class="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-3"
                        >
                            External Assets
                        </div>
                        <div class="flex flex-wrap gap-3">
                            {#each data.meta.challenge_files as file}
                                <a
                                    href={file.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all group"
                                >
                                    <span class="text-brand-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-4 h-4"
                                            viewBox="0 0 24 24" 
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            ><path
                                                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                            /><polyline
                                                points="7 10 12 15 17 10"
                                            /><line
                                                x1="12"
                                                y1="15"
                                                x2="12"
                                                y2="3"
                                            /></svg
                                        >
                                    </span>
                                    <span
                                        class="text-xs font-mono font-bold tracking-tight text-white group-hover:text-brand-primary transition-colors"
                                    >
                                        {file.name}
                                    </span>
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}

                {#if data.meta.flag}
                    <div class="md:col-span-2 pt-4">
                        <div
                            class="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1"
                        >
                            Final Flag
                        </div>
                        <div
                            class="text-lg font-mono font-bold text-brand-secondary break-all"
                        >
                            {data.meta.flag}
                        </div>
                    </div>
                {/if}
            </div>
        </section>
    {/if}

    <!-- Content -->
    <div class="prose-custom" in:fade={{ duration: 600, delay: 200 }}>
        <Content />
    </div>

    <!-- Footer -->
    <footer class="mt-24 pt-12 border-t border-white/5">
        <div class="glass p-8 rounded-3xl text-center">
            <h3 class="text-xl font-bold mb-2">Enjoyed this writeup?</h3>
            <p class="text-brand-muted mb-6">
                Check out my other projects or get in touch.
            </p>
            <div class="flex justify-center gap-4">
                <a
                    href="/"
                    class="text-brand-primary font-bold hover:text-glow transition-all"
                    >Projects</a
                >
                <span class="text-white/10">|</span>
                <a
                    href="mailto:contact@zain.dev"
                    class="text-brand-primary font-bold hover:text-glow transition-all"
                    >Email</a
                >
            </div>
        </div>
    </footer>
</article>

<style>
    /* Custom Markdown Styling */
    :global(.prose-custom) {
        color: var(--color-brand-text);
        line-height: 1.8;
        font-size: 1.1rem;
    }

    :global(.prose-custom h1, .prose-custom h2, .prose-custom h3) {
        color: white;
        font-weight: 800;
        margin-top: 3.5rem;
        margin-bottom: 1.5rem;
        letter-spacing: -0.02em;
    }

    :global(.prose-custom h2) {
        font-size: 2rem;
        border-bottom: 2px solid rgba(255, 255, 255, 0.03);
        padding-bottom: 0.5rem;
    }
    :global(.prose-custom h3) {
        font-size: 1.5rem;
    }

    :global(.prose-custom p) {
        margin-bottom: 1.75rem;
        color: var(--color-brand-muted);
    }

    :global(.prose-custom strong) {
        color: white;
    }

    :global(.prose-custom code) {
        background: rgba(0, 255, 204, 0.08); /* brand-primary tint */
        padding: 0.2rem 0.5rem;
        border-radius: 0.4rem;
        font-family: var(--font-mono);
        font-size: 0.9em;
        color: var(--color-brand-primary);
        font-weight: 600;
    }

    :global(.prose-custom pre) {
        background: #0a0a0c !important; /* Force matching dark background */
        padding: 2rem;
        border-radius: 1.5rem;
        overflow-x: auto;
        border: 1px solid rgba(255, 255, 255, 0.05);
        margin: 2.5rem 0;
        position: relative;
    }

    :global(.prose-custom pre::before) {
        content: "TERMINAL_OUTPUT";
        position: absolute;
        top: 0;
        right: 2rem;
        font-family: var(--font-mono);
        font-size: 10px;
        font-weight: 800;
        color: rgba(255, 255, 255, 0.1);
        padding: 0.5rem 0;
    }

    :global(.prose-custom pre code) {
        padding: 0;
        font-weight: 400;
        background: none !important;
    }

    :global(.prose-custom ul) {
        list-style: none;
        padding-left: 1.5rem;
        margin-bottom: 2rem;
    }

    :global(.prose-custom ul li) {
        position: relative;
        margin-bottom: 0.75rem;
        color: var(--color-brand-muted);
    }

    :global(.prose-custom ul li::before) {
        content: "•";
        position: absolute;
        left: -1.5rem;
        color: var(--color-brand-primary);
        font-weight: bold;
    }

    :global(.prose-custom blockquote) {
        border-left: 4px solid var(--color-brand-primary);
        padding: 1.5rem 2rem;
        background: rgba(0, 255, 204, 0.03);
        border-radius: 0 1.5rem 1.5rem 0;
        margin: 2.5rem 0;
        font-style: italic;
    }
</style>
