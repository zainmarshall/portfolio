<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import { projects } from "$lib/projects";

    let visible = $state(false);
    $effect(() => {
        visible = true;
    });
</script>

<div class="max-w-6xl mx-auto px-12 pt-48 pb-40">
    <header class="mb-24 space-y-4">
        {#if visible}
            <span
                in:fade={{ duration: 800 }}
                class="text-[10px] font-black uppercase tracking-[0.4em] text-brand-secondary"
                >Complete Works</span
            >
            <h1
                in:fly={{ y: 30, duration: 800, delay: 200 }}
                class="text-6xl md:text-8xl font-black tracking-tighter"
            >
                Archive.
            </h1>
            <p
                in:fade={{ duration: 1000, delay: 400 }}
                class="text-xl text-brand-muted max-w-xl font-medium leading-relaxed"
            >
                A documented trail of full-stack applications, security tools,
                and technical experiments.
            </p>
        {/if}
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {#each projects as project}
            <ProjectCard {project} />
        {/each}
    </div>
</div>
