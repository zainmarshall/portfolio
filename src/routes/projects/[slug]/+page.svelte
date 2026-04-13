<script lang="ts">
	let { data } = $props();
	const project = data.project;
</script>

<svelte:head>
	<title>{project.title} - Zain Marshall</title>
</svelte:head>

<div class="max-w-[720px] mx-auto px-8 md:px-16 py-16 md:py-24">
	<a
		href="/projects"
		class="text-sm text-accent hover:text-accent-hover transition-colors mb-8 inline-block"
	>
		&larr; Back to projects
	</a>

	<h1 class="text-3xl md:text-4xl font-bold text-heading mb-2">{project.title}</h1>

	<div class="flex flex-wrap gap-3 text-sm text-muted mb-6">
		{#each project.technologies as tech}
			<span>{tech}</span>
		{/each}
	</div>

	<p class="text-lg mb-8">{project.description}</p>

	<div class="flex flex-wrap gap-4 text-sm">
		{#if project.github}
			<a
				href={project.github}
				target="_blank"
				class="inline-block px-5 py-2 bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
			>
				View on GitHub
			</a>
		{/if}
		{#if project.website}
			<a
				href={project.website}
				target="_blank"
				class="inline-block px-5 py-2 border border-accent text-accent font-medium hover:bg-accent hover:text-white transition-colors"
			>
				Visit Site
			</a>
		{/if}
	</div>

	{#if project.links}
		<div class="mt-8 border-t border-border pt-6">
			<h2 class="text-lg font-bold text-heading mb-3">Related Repos</h2>
			<div class="space-y-2">
				{#each project.links as link}
					<a
						href={link.url}
						target="_blank"
						class="block text-accent hover:text-accent-hover transition-colors"
					>
						{link.label} &rarr;
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>
