<script lang="ts">
	import "./layout.css";
	import { base } from "$app/paths";
	import { page } from "$app/state";
	import CommandPalette from "$lib/components/CommandPalette.svelte";

	let { children } = $props();
	let palette: CommandPalette;

	const navItems = [
		{ name: "Home", path: `${base}/` },
		{ name: "CTFs", path: `${base}/writeups` },
	];
</script>

<CommandPalette bind:this={palette} />

<div class="min-h-screen flex flex-col">
	<!-- Navbar -->
	<nav class="border-b border-border bg-surface">
		<div class="max-w-[1200px] mx-auto px-8 md:px-16 flex justify-between items-center h-14">
			<a href="{base}/" class="text-heading font-bold text-lg tracking-tight">
				Zain Marshall
			</a>

			<div class="flex gap-8 items-center">
				{#each navItems as item}
					<a
						href={item.path}
						class="text-sm transition-colors {page.url.pathname === item.path
							? 'text-accent font-medium'
							: 'text-muted hover:text-heading'}"
					>
						{item.name}
					</a>
				{/each}
				<button
					onclick={() => palette.toggle()}
					class="hidden sm:inline text-xs text-muted border border-border px-1.5 py-0.5 cursor-pointer hover:text-heading hover:border-muted transition-colors bg-transparent"
					title="Open command palette ( / )"
				>/</button>
			</div>
		</div>
	</nav>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-border">
		<div class="max-w-[1200px] mx-auto px-8 md:px-16 py-4 text-sm text-muted">
			<span>&copy; 2026 Zain Marshall</span>
		</div>
	</footer>
</div>
