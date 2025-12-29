<script lang="ts">
    import { fly, fade } from "svelte/transition";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import ScrambleText from "$lib/components/ScrambleText.svelte";
    import { projects } from "$lib/projects";
    import Technologies from '$lib/components/Technologies.svelte';

    let visible = $state(false);
    $effect(() => {
        visible = true;
    });

    const email = 'zainmarshall1000@gmail.com';

        // tech list moved into `Technologies.svelte`

    const education = [
        {
            title: "Thomas Jefferson High School for Science and Technology",
            period: "2024 - Present",
            description:
                "Intended Lab: Computer Systems.\nRelevant Coursework: AP Computer Science A+ Data Structures, AP Calculus BC, AP Statistics",
            location: "Alexandria, VA",
        },
    ];
</script>

<svelte:head>
    <title>Zain's Portfolio</title>

</svelte:head>

<div class="max-w-6xl mx-auto px-12 flex flex-col gap-40 pb-40 pt-48 shrink-0">
    <!-- Restructured Hero Section -->
    <section
        class="grid grid-cols-1 md:grid-cols-5 gap-16 items-center relative"
    >
        {#if visible}
            <!-- Text Content (Hero Overwrite) -->
            <div class="md:col-span-3 space-y-10">
                <div class="space-y-6">
                    <h2
                        in:fly={{ y: 30, duration: 800, delay: 200 }}
                        class="text-xs font-black uppercase tracking-[0.5em] text-brand-primary"
                    >
                        Developer • Student • Competetive Programmer
                    </h2>
                    <h1
                        in:fly={{ y: 50, duration: 800, delay: 400 }}
                        class="text-[clamp(3.5rem,8vw,6rem)] font-black leading-[0.9] tracking-tighter"
                    >
                        HI, I'M <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary"
                            >ZAIN MARSHALL.</span
                        >
                    </h1>
                    <p
                        in:fade={{ duration: 1000, delay: 800 }}
                        class="text-xl md:text-2xl text-brand-muted max-w-xl font-medium leading-relaxed"
                    >
                        A 15-year-old developer at TJHSST building fun projects
                        and exploring the world of competetive programming and
                        cybersecurity.
                    </p>
                </div>

                <!-- Social Icons & Stats -->
                <div
                    in:fade={{ duration: 1000, delay: 1000 }}
                    class="flex flex-wrap items-center gap-10"
                >
                    <div class="flex items-center gap-4">
                        <a
                            href="https://github.com/zainmarshall"
                            target="_blank"
                            aria-label="GitHub"
                            class="p-4 bg-white/5 rounded-2xl hover:bg-brand-primary/20 hover:text-brand-primary transition-all group"
                        >
                            <svg
                                class="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                ><path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                /></svg
                            >
                        </a>
                        <a
                            href="https://www.linkedin.com/in/zain-marshall-4132b1338"
                            target="_blank"
                            aria-label="LinkedIn"
                            class="p-4 bg-white/5 rounded-2xl hover:bg-brand-primary/20 hover:text-brand-primary transition-all group"
                        >
                            <svg
                                class="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                ><path
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                /></svg
                            >
                        </a>
                    </div>

                    <!-- Email (icon + address) -->
                    <div class="flex items-center gap-4">
                        <a
                            href="mailto:{email}"
                            aria-label="Email"
                            class="p-4 bg-white/5 rounded-2xl hover:bg-brand-primary/20 hover:text-brand-primary transition-all group flex items-center gap-3"
                        >
                            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <span class="text-sm font-medium">{email}</span>
                        </a>
                    </div>
                </div>

                <div
                    in:fade={{ duration: 1000, delay: 1200 }}
                    class="flex gap-4"
                >
                    <a
                        href="/projects"
                        class="px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                    >
                        View My Work
                    </a>
                    <a
                        href="mailto:{email}"
                        class="px-8 py-4 border border-white/10 text-white font-black text-sm uppercase tracking-widest rounded-full hover:bg-white/5 transition-all"
                    >
                        Get In Touch
                    </a>
                </div>
            </div>

            <!-- Visual Element / Photo Placeholder -->
            <div
                in:fly={{ x: 30, duration: 1000, delay: 600 }}
                class="md:col-span-2 relative hidden md:block"
            >
                <div class="relative aspect-[4/5] group">
                    <div
                        class="absolute inset-0 bg-brand-primary rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-500"
                    ></div>
                    <div
                        class="absolute inset-0 bg-brand-surface rounded-[3rem] overflow-hidden border border-white/10 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"
                    >
                        <img
                            src="/images/zain.jpg"
                            alt="Zain Marshall"
                            class="w-full h-full object-cover object-top"
                        />
                    </div>
                </div>
            </div>
        {/if}
    </section>

    <!-- Technologies Section -->
    <section class="space-y-8">
        <div class="flex flex-col gap-4">
            <span class="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent"
                >Skills</span
            >
            <h2 class="text-6xl font-black tracking-tighter">
                <ScrambleText text="Technologies & Tools" delay={200} />
            </h2>
        </div>

        <div class="mt-12">
            <Technologies />
        </div>
    </section>


    <!-- Education Section -->
    <section class="space-y-16">
        <div class="flex flex-col gap-4">
            <span
                class="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent"
                >Journey</span
            >
            <h2 class="text-6xl font-black tracking-tighter">
                <ScrambleText text="Education." delay={600} />
            </h2>
        </div>

        <div class="relative border-l-2 border-white/5 pl-12 space-y-20">
            {#each education as item}
                <div class="relative">
                    <div
                        class="absolute -left-[53px] top-0 w-4 h-4 rounded-full bg-brand-accent shadow-[0_0_20px_rgba(188,255,0,0.5)]"
                    ></div>
                    <div class="space-y-2">
                        <span
                            class="text-brand-accent font-mono text-sm uppercase tracking-widest"
                            >{item.period}</span
                        >
                        <h3 class="text-3xl font-black">{item.title}</h3>
                        <p class="text-brand-muted max-w-2xl leading-relaxed">
                            {item.description}
                        </p>
                        <span
                            class="text-xs font-bold text-white/30 uppercase tracking-widest"
                            >{item.location}</span
                        >
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <!-- CTA -->
</div>

<style>
    @keyframes marquee {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .animate-marquee {
        display: flex;
        width: max-content;
        animation: marquee 30s linear infinite;
    }

    .animate-marquee:hover {
        animation-play-state: paused;
    }
</style>
