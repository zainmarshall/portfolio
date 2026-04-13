<script lang="ts">
	import { base } from "$app/paths";
	import { projects } from "$lib/projects";
</script>

<svelte:head>
	<title>Projects - Zain Marshall</title>
</svelte:head>

<div class="max-w-[720px] mx-auto px-8 md:px-16 py-16 md:py-24">
	<h1 class="text-3xl font-bold text-heading mb-10">Projects</h1>

	<div class="space-y-4">
		{#each projects as project}
			<a href="{base}/projects/{project.slug}" class="block border border-border p-5 hover:border-accent/40 transition-colors">
				<div class="flex items-start justify-between gap-4">
					<div>
						<h3 class="font-semibold text-heading">{project.title}</h3>
						<p class="text-sm mt-1">{project.description}</p>
						<div class="flex gap-3 mt-2 text-sm text-muted">
							{#each project.technologies as tech}
								<span>{tech}</span>
							{/each}
						</div>
					</div>
					<span class="text-muted text-sm shrink-0">&rarr;</span>
				</div>
			</a>
		{/each}
	</div>
</div>
