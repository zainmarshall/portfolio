<script lang="ts">
	import { base } from "$app/paths";
	let { data } = $props();
</script>

<svelte:head>
	<title>CTFs - Zain Marshall</title>
</svelte:head>

<div class="max-w-[720px] mx-auto px-8 md:px-16 py-16 md:py-24">
	<h1 class="text-3xl font-bold text-heading mb-2">CTFs</h1>
	<p class="text-muted mb-6">
		Member of <a href="https://ctftime.org/team/53812" target="_blank" class="text-accent hover:text-accent-hover transition-colors">TJCSC</a>
		&middot; #2 Global &middot; #1 US
		&middot;
		<a href="https://ctftime.org/profile/zen10" target="_blank" class="text-accent hover:text-accent-hover transition-colors">CTFtime</a>
	</p>

	<h2 class="text-xl font-bold text-heading mb-4">Writeups</h2>

	<div class="border-t border-border">
		{#each data.posts as post}
			<a
				href="{base}/writeups/{post.slug}"
				class="group flex items-baseline justify-between py-4 border-b border-border hover:pl-2 transition-all"
			>
				<div class="flex-1 min-w-0">
					<h2 class="text-heading group-hover:text-accent transition-colors font-medium truncate">
						{post.title}
					</h2>
					<div class="flex gap-2 mt-1">
						{#each post.categories as category}
							<span class="text-xs text-muted uppercase tracking-wider">
								{category}
							</span>
						{/each}
					</div>
				</div>
				<span class="text-sm text-muted ml-4 shrink-0">{post.date}</span>
			</a>
		{/each}
	</div>
</div>
