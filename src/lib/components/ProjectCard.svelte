<script lang="ts">
	let { project } = $props();
</script>

<div class="border border-border rounded-sm overflow-hidden hover:border-muted transition-colors">
	{#if project.image}
		<div class="bg-surface aspect-[16/9]">
			<img
				src={project.image}
				alt={project.title}
				class="w-full h-full object-cover"
			/>
		</div>
	{/if}

	<div class="p-6 space-y-3">
		<h3 class="text-heading font-medium text-lg">{project.title}</h3>
		<p class="text-sm text-text leading-relaxed">{project.description}</p>

		<div class="flex flex-wrap gap-x-3 gap-y-1">
			{#each project.technologies as tech}
				<span class="text-[11px] font-mono text-muted">{tech}</span>
			{/each}
		</div>

		<div class="flex gap-4 pt-1 text-[11px] font-mono">
			{#if project.github}
				<a href={project.github} target="_blank" class="text-text hover:text-accent transition-colors">source</a>
			{/if}
			{#if project.website}
				<a href={project.website} target="_blank" class="text-text hover:text-accent transition-colors">visit</a>
			{/if}
		</div>
	</div>
</div>
