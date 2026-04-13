<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let open = $state(false);
	let query = $state('');
	let selectedIndex = $state(0);
	let inputEl = $state<HTMLInputElement | null>(null);

	type Command = { label: string; hint: string; action: () => void };

	const commands: Command[] = [
		{ label: 'Home', hint: 'h', action: () => goto(`${base}/`) },
		{ label: 'CTFs', hint: 'c', action: () => goto(`${base}/writeups`) },
		{ label: 'GitHub', hint: '', action: () => window.open('https://github.com/zainmarshall', '_blank') },
		{ label: 'LinkedIn', hint: '', action: () => window.open('https://www.linkedin.com/in/zain-marshall-4132b1338', '_blank') },
		{ label: 'Codeforces', hint: '', action: () => window.open('https://codeforces.com/profile/zen10', '_blank') },
		{ label: 'CTFtime', hint: '', action: () => window.open('https://ctftime.org/profile/zen10', '_blank') },
		{ label: 'Email', hint: '', action: () => { window.location.href = 'mailto:zainmarshall1000@gmail.com'; } },
	];

	let filtered = $derived(
		query.trim() === ''
			? commands
			: commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
	);

	export function toggle() {
		if (open) {
			handleClose();
		} else {
			handleOpen();
		}
	}

	function handleOpen() {
		open = true;
		query = '';
		selectedIndex = 0;
		requestAnimationFrame(() => inputEl?.focus());
	}

	function handleClose() {
		open = false;
		query = '';
		selectedIndex = 0;
	}

	function run(cmd: Command) {
		handleClose();
		cmd.action();
	}

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			const tag = (e.target as HTMLElement)?.tagName;
			const isInput = tag === 'INPUT' || tag === 'TEXTAREA';

			if (!open) {
				if (isInput) return;

				if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
					e.preventDefault();
					handleOpen();
					return;
				}
				if (e.key === 'h') { goto(`${base}/`); return; }
				if (e.key === 'c') { goto(`${base}/writeups`); return; }
				if (e.key === '?') { handleOpen(); return; }
				return;
			}

			if (e.key === 'Escape') {
				e.preventDefault();
				handleClose();
				return;
			}
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
				return;
			}
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				return;
			}
			if (e.key === 'Enter' && filtered.length > 0) {
				e.preventDefault();
				run(filtered[selectedIndex]);
				return;
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	// Reset selection when query changes
	$effect(() => {
		query;
		selectedIndex = 0;
	});
</script>

{#if open}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[20vh]"
		onmousedown={handleClose}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="w-full max-w-md bg-surface border border-border shadow-2xl overflow-hidden"
			onmousedown={(e) => e.stopPropagation()}
		>
			<div class="flex items-center gap-3 px-4 py-3 border-b border-border">
				<svg class="w-4 h-4 text-muted shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
				<input
					bind:this={inputEl}
					bind:value={query}
					placeholder="Type a command..."
					class="flex-1 bg-transparent text-heading text-sm outline-none placeholder:text-muted"
				/>
				<kbd class="text-xs text-muted border border-border px-1.5 py-0.5">esc</kbd>
			</div>

			<div class="max-h-64 overflow-y-auto py-1">
				{#each filtered as cmd, i}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-colors {i === selectedIndex ? 'bg-accent/10 text-heading' : 'text-text hover:bg-accent/5'}"
						onmouseenter={() => selectedIndex = i}
						onmousedown={() => run(cmd)}
					>
						<span>{cmd.label}</span>
						{#if cmd.hint}
							<kbd class="text-xs text-muted border border-border px-1.5 py-0.5">{cmd.hint}</kbd>
						{/if}
					</div>
				{/each}
				{#if filtered.length === 0}
					<div class="px-4 py-3 text-sm text-muted">No results</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
