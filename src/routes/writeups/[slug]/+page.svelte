<script lang="ts">
	let { data } = $props();
	const Content = $derived(data.content);
</script>

<svelte:head>
	<title>{data.meta.title} - Zain Marshall</title>
</svelte:head>

<article class="max-w-[720px] mx-auto px-8 md:px-16 py-16 md:py-24">
	<header class="mb-12">
		<a
			href="/writeups"
			class="text-sm text-accent hover:text-accent-hover transition-colors mb-6 inline-block"
		>
			&larr; Back to writeups
		</a>

		<div class="flex flex-wrap gap-2 mb-3">
			{#each data.meta.categories || [] as category}
				<span class="text-xs text-muted uppercase tracking-wider">
					{category}
				</span>
			{/each}
		</div>

		<h1 class="text-3xl md:text-4xl font-bold text-heading leading-tight mb-2">
			{data.meta.title}
		</h1>

		<div class="flex items-center gap-3 text-sm text-muted">
			<span>{data.meta.date}</span>
			{#if data.meta.description}
				<span>&middot;</span>
				<span>{data.meta.description}</span>
			{/if}
		</div>
	</header>

	{#if data.meta.challenge || data.meta.ctf}
		<section class="mb-12 border border-border p-6 space-y-4">
			<h2 class="text-xs uppercase tracking-wider text-muted font-medium">Challenge Details</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
				{#if data.meta.challenge}
					<div>
						<div class="text-xs uppercase tracking-wider text-muted mb-1">Challenge</div>
						<div class="text-heading">{data.meta.challenge}</div>
					</div>
				{/if}
				{#if data.meta.ctf}
					<div>
						<div class="text-xs uppercase tracking-wider text-muted mb-1">CTF Event</div>
						<div class="text-heading">{data.meta.ctf}</div>
					</div>
				{/if}
				{#if data.meta.challenge_author}
					<div>
						<div class="text-xs uppercase tracking-wider text-muted mb-1">Author</div>
						<div class="text-heading">{data.meta.challenge_author}</div>
					</div>
				{/if}
				{#if data.meta.challenge_description}
					<div class="md:col-span-2">
						<div class="text-xs uppercase tracking-wider text-muted mb-1">Description</div>
						<div class="text-text italic">{data.meta.challenge_description}</div>
					</div>
				{/if}
				{#if data.meta.challenge_files && data.meta.challenge_files.length > 0}
					<div class="md:col-span-2">
						<div class="text-xs uppercase tracking-wider text-muted mb-2">Files</div>
						<div class="flex flex-wrap gap-3">
							{#each data.meta.challenge_files as file}
								<a
									href={file.link}
									target="_blank"
									rel="noopener noreferrer"
									class="text-sm text-accent hover:text-accent-hover transition-colors"
								>
									{file.name} &darr;
								</a>
							{/each}
						</div>
					</div>
				{/if}
				{#if data.meta.flag}
					<div class="md:col-span-2">
						<div class="text-xs uppercase tracking-wider text-muted mb-1">Flag</div>
						<div class="font-mono text-accent break-all">{data.meta.flag}</div>
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<div class="prose-custom">
		<Content />
	</div>
</article>

<style>
	:global(.prose-custom) {
		color: var(--color-text);
		line-height: 1.8;
		font-size: 1rem;
	}

	:global(.prose-custom h1),
	:global(.prose-custom h2),
	:global(.prose-custom h3) {
		color: var(--color-heading);
		font-weight: 700;
		margin-top: 2.5rem;
		margin-bottom: 1rem;
	}

	:global(.prose-custom h2) {
		font-size: 1.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--color-border);
	}

	:global(.prose-custom h3) {
		font-size: 1.25rem;
	}

	:global(.prose-custom p) {
		margin-bottom: 1.5rem;
	}

	:global(.prose-custom strong) {
		color: var(--color-heading);
	}

	:global(.prose-custom code) {
		background: var(--color-blue-light);
		padding: 0.15rem 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.85em;
		color: var(--color-accent);
	}

	:global(.prose-custom pre) {
		background: var(--color-surface);
		color: var(--color-heading);
		padding: 1.5rem;
		overflow-x: auto;
		border: 1px solid var(--color-border);
		margin: 1.5rem 0;
	}

	:global(.prose-custom pre code) {
		padding: 0;
		background: none;
		color: inherit;
	}

	:global(.prose-custom ul) {
		list-style: disc;
		padding-left: 1.25rem;
		margin-bottom: 1.5rem;
	}

	:global(.prose-custom ul li) {
		margin-bottom: 0.5rem;
	}

	:global(.prose-custom ol) {
		list-style: decimal;
		padding-left: 1.25rem;
		margin-bottom: 1.5rem;
	}

	:global(.prose-custom ol li) {
		margin-bottom: 0.5rem;
	}

	:global(.prose-custom blockquote) {
		border-left: 3px solid var(--color-accent);
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		color: var(--color-muted);
	}

	:global(.prose-custom a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	:global(.prose-custom a:hover) {
		color: var(--color-accent-hover);
	}

	:global(.prose-custom img) {
		border: 1px solid var(--color-border);
		margin: 1.5rem 0;
	}
</style>
