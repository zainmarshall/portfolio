<script lang="ts">
	import { base } from "$app/paths";
	import { projects } from "$lib/projects";
	import { onMount } from "svelte";

	const email = 'zainmarshall1000@gmail.com';

	type Tech = { name: string; color: string; plain: string; original: string };

	const techStrips: { id: string; label: string; items: Tech[] }[] = [
		{
			id: 'languages', label: 'Languages',
			items: [
				{ name: 'C++', color: '#00599C', plain: '/images/logos/cplusplus-plain.svg', original: '/images/logos/cplusplus-original.svg' },
				{ name: 'Java', color: '#007396', plain: '/images/logos/java-plain.svg', original: '/images/logos/java-original.svg' },
				{ name: 'Python', color: '#3776AB', plain: '/images/logos/python-plain.svg', original: '/images/logos/python-original.svg' },
				{ name: 'TypeScript', color: '#3178c6', plain: '/images/logos/typescript-plain.svg', original: '/images/logos/typescript-original.svg' },
				{ name: 'JavaScript', color: '#f7df1e', plain: '/images/logos/javascript-plain.svg', original: '/images/logos/javascript-original.svg' },
			]
		},
		{
			id: 'frontend', label: 'Frontend',
			items: [
				{ name: 'Svelte', color: '#FF3E00', plain: '/images/logos/svelte-plain.svg', original: '/images/logos/svelte-original.svg' },
				{ name: 'Tailwind', color: '#06B6D4', plain: '/images/logos/tailwind-plain.svg', original: '/images/logos/tailwind-original.svg' },
				{ name: 'HTML', color: '#E34F26', plain: '/images/logos/html5-plain.svg', original: '/images/logos/html5-original.svg' },
			]
		},
		{
			id: 'tools', label: 'Tools',
			items: [
				{ name: 'SQL', color: '#003B57', plain: '/images/logos/postgresql-plain.svg', original: '/images/logos/postgresql-original.svg' },
				{ name: 'Linux', color: '#FCC624', plain: '/images/logos/linux-plain.svg', original: '/images/logos/linux-original.svg' },
			]
		},
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Zain Marshall</title>
	<meta name="description" content="Developer, student, competitive programmer." />
</svelte:head>

<div class="max-w-[720px] mx-auto px-8 md:px-16 py-16 md:py-24">
	<!-- Hero -->
	<section class="flex flex-col sm:flex-row items-start gap-8 mb-16">
		<img
			src="{base}/images/zain.jpg"
			alt="Zain Marshall"
			class="w-28 h-28 object-cover shrink-0"
		/>

		<div class="flex-1">
			<h1 class="text-3xl md:text-4xl font-bold text-heading leading-tight">
				Zain Marshall
			</h1>
			<p class="text-muted mt-1 text-lg">
				Developer. Student. Competitive programmer.
			</p>

			<div class="flex items-center gap-5 mt-5">
				<a
					href="https://github.com/zainmarshall"
					target="_blank"
					class="text-text hover:text-accent transition-colors"
					aria-label="GitHub"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
				</a>
				<a
					href="https://www.linkedin.com/in/zain-marshall-4132b1338"
					target="_blank"
					class="text-text hover:text-accent transition-colors"
					aria-label="LinkedIn"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
				</a>
				<a
					href="https://codeforces.com/profile/zen10"
					target="_blank"
					class="text-text hover:text-accent transition-colors"
					aria-label="Codeforces"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-3c.828 0 1.5.672 1.5 1.5v13.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V6c0-.828.672-1.5 1.5-1.5h3zm9 6c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/></svg>
				</a>
				<a
					href="mailto:{email}"
					class="text-text hover:text-accent transition-colors"
					aria-label="Email"
				>
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/></svg>
				</a>

			</div>
		</div>
	</section>

	<!-- About -->
	<section class="fade-in mb-16">
		<h2 class="text-xl font-bold text-heading mb-4">About</h2>
		<p>
			I'm a 16-year-old developer at Thomas Jefferson High School for Science and Technology.
			I build tools, explore competitive programming, and dig into cybersecurity.
			Currently focused on systems programming and CTF competitions.
		</p>
	</section>

	<!-- Competitive Programming -->
	<section class="fade-in mb-16">
		<h2 class="text-xl font-bold text-heading mb-4">Competitive Programming</h2>
		<p>
			USACO Gold &middot; Codeforces Expert
		</p>
	</section>

	<!-- Technologies -->
	<section class="fade-in mb-16">
		<h2 class="text-xl font-bold text-heading mb-6">Technologies</h2>
		{#each techStrips as strip}
			<div class="mb-4">
				<div class="text-sm text-muted mb-2 font-medium">{strip.label}</div>
				<div class="flex flex-wrap gap-2">
					{#each strip.items as item}
						<div
							class="tech-pill"
							style="--accent:{item.color};"
							title={item.name}
						>
							<span class="logo-stack">
								<img class="logo-plain" src={item.plain} alt="" />
								<img class="logo-orig" src={item.original} alt="" />
							</span>
							<span class="tech-label">{item.name}</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>

	<!-- Education -->
	<section class="fade-in mb-16">
		<h2 class="text-xl font-bold text-heading mb-4">Education</h2>
		<div>
			<h3 class="font-semibold text-heading">Thomas Jefferson High School for Science and Technology</h3>
			<p class="text-sm text-muted">2024 &ndash; Present &middot; Alexandria, VA</p>
			<p class="mt-1">
				Intended Lab: Computer Systems. Relevant Coursework: AP Computer Science A + Data Structures, AP Calculus BC, AP Statistics.
			</p>
		</div>
	</section>

	<!-- Projects -->
	<section class="fade-in mb-16">
		<h2 class="text-xl font-bold text-heading mb-6">Projects</h2>

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
	</section>

	<!-- Contact -->
	<section class="fade-in">
		<h2 class="text-xl font-bold text-heading mb-4">Contact</h2>
		<p class="mb-3">
			<a href="mailto:{email}" class="text-accent hover:text-accent-hover transition-colors">{email}</a>
		</p>
		<div class="flex flex-wrap gap-x-5 gap-y-1 text-sm">
			<a href="https://github.com/zainmarshall" target="_blank" class="text-text hover:text-accent transition-colors">GitHub</a>
			<a href="https://www.linkedin.com/in/zain-marshall-4132b1338" target="_blank" class="text-text hover:text-accent transition-colors">LinkedIn</a>
			<a href="https://codeforces.com/profile/zen10" target="_blank" class="text-text hover:text-accent transition-colors">Codeforces</a>
			<a href="https://ctftime.org/profile/zen10" target="_blank" class="text-text hover:text-accent transition-colors">CTFtime</a>
		</div>
	</section>
</div>

<style>
	:global(.fade-in) {
		opacity: 0;
		transform: translateY(10px);
		transition: opacity 0.5s ease, transform 0.5s ease;
	}

	:global(.fade-in.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	.tech-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.4rem 0.85rem;
		border: 1px solid var(--color-border);
		height: 44px;
		min-width: 110px;
		box-sizing: border-box;
		transition: box-shadow 0.18s, transform 0.12s, border-color 0.18s;
		cursor: default;
	}

	.tech-pill:hover {
		transform: translateY(-2px);
		border-color: var(--accent);
		box-shadow: 0 8px 24px -10px var(--accent);
	}

	.logo-stack {
		position: relative;
		width: 26px;
		height: 26px;
		flex: 0 0 26px;
	}

	.logo-plain, .logo-orig {
		position: absolute;
		left: 0;
		top: 0;
		width: 26px;
		height: 26px;
		transition: opacity 0.18s ease;
	}

	.logo-plain {
		filter: brightness(0) invert(0.7);
		opacity: 1;
	}

	.logo-orig {
		opacity: 0;
	}

	.tech-pill:hover .logo-plain {
		opacity: 0;
	}

	.tech-pill:hover .logo-orig {
		opacity: 1;
	}

	.tech-label {
		color: var(--color-muted);
		font-weight: 600;
		font-size: 13px;
		transition: color 0.18s;
	}

	.tech-pill:hover .tech-label {
		color: var(--color-heading);
	}
</style>
