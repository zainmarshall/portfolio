<script lang="ts">
type Tech = { name: string; color: string; plain: string; original: string };

export let selected: string[] = [];
export let compact: boolean = false;

const allTechs: Tech[] = [
  { name: 'TypeScript', color: '#3178c6', plain: '/images/logos/typescript-plain.svg', original: '/images/logos/typescript-original.svg' },
  { name: 'JavaScript', color: '#f7df1e', plain: '/images/logos/javascript-plain.svg', original: '/images/logos/javascript-original.svg' },
  { name: 'Java', color: '#007396', plain: '/images/logos/java-plain.svg', original: '/images/logos/java-original.svg' },
  { name: 'C++', color: '#00599C', plain: '/images/logos/cplusplus-plain.svg', original: '/images/logos/cplusplus-original.svg' },
  { name: 'Python', color: '#3776AB', plain: '/images/logos/python-plain.svg', original: '/images/logos/python-original.svg' },
  { name: 'Svelte', color: '#FF3E00', plain: '/images/logos/svelte-plain.svg', original: '/images/logos/svelte-original.svg' },
  { name: 'Tailwind CSS', color: '#06B6D4', plain: '/images/logos/tailwind-plain.svg', original: '/images/logos/tailwind-original.svg' },
  { name: 'HTML', color: '#E34F26', plain: '/images/logos/html5-plain.svg', original: '/images/logos/html5-original.svg' },
  { name: 'SQL', color: '#003B57', plain: '/images/logos/postgresql-plain.svg', original: '/images/logos/postgresql-original.svg' },
  { name: 'Linux', color: '#FCC624', plain: '/images/logos/linux-plain.svg', original: '/images/logos/linux-original.svg' },
  { name: 'CLI', color: '#333', plain: '/images/logos/terminal-plain.svg', original: '/images/logos/terminal-plain.svg' },
  { name: 'AI', color: '#8b5cf6', plain: '/images/logos/ai-plain.svg', original: '/images/logos/ai-plain.svg' }
];

let techsToShow = selected && selected.length
  ? allTechs.filter(t => selected.includes(t.name))
  : allTechs;
</script>

<style>
.technologies { display:flex; flex-direction:column; gap:1rem; }
.strip-row { display:flex; gap:0.75rem; flex-wrap:wrap; align-items:center; }
.pill { display:inline-flex; align-items:center; gap:0.75rem; padding:0.5rem 1rem; border-radius:999px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); height:56px; min-width:140px; box-sizing:border-box; transition:box-shadow .18s, transform .12s, background .12s; }
.logo { width:32px; height:32px; flex:0 0 32px; border-radius:6px; overflow:hidden; display:block; }
.pill:hover { transform: translateY(-3px); }

/* Hover glow — uses --accent color set inline per pill */
.pill { box-shadow: 0 0 0 rgba(0,0,0,0); }
.pill:hover { border-color: var(--accent); box-shadow: 0 10px 30px -12px var(--accent); }

.pill img { transition:opacity .18s ease, filter .18s ease; }
.logo-stack { position: relative; width: 32px; height: 32px; display: inline-block; }
.logo--plain, .logo--orig { position: absolute; left: 0; top: 0; width: 100%; height: 100%; object-fit: contain; transform-origin: center center; }
.logo--plain { filter: brightness(0) invert(1); opacity: 1; z-index: 1; transition: opacity .18s ease, transform .18s ease; }
.logo--orig { opacity: 0; z-index: 2; transition: opacity .18s ease, transform .18s ease; transform: scale(1); }
.pill { position: relative; }
.pill .label { color: #bfc7cc; font-weight:700; font-size:15px; margin-left:8px; }
.pill:hover .logo--plain { opacity: 0; }
.pill:hover .logo--orig { opacity: 1; }
.pill:hover .label { color: #fff; text-shadow: 0 0 8px var(--accent); }

/* Tweak for icons whose original SVG viewBox/padding differs (Python) */
.pill[data-name="Python"] .logo--orig { transform: scale(1.12); }

/* compact variant used in cards */
.pill--compact { height:44px; min-width:100px; padding:0.35rem 0.75rem; }
.pill--compact .logo { width:24px; height:24px; flex:0 0 24px; }
.pill--compact .label { font-size:13px; margin-left:6px; }
/* ensure the stacked logos scale with compact pills and remain centered */
.pill--compact .logo-stack { width:24px; height:24px; }

@media (max-width: 640px) {
  .pill { min-width: 100px; height:48px; padding:0.4rem 0.8rem; }
  .logo { width:26px; height:26px; flex:0 0 26px; }
  .pill .label { font-size:13px; }
}
</style>

<div class="technologies">
  <div class="strip-row">
    {#each techsToShow as item}
        <div class="pill {compact ? 'pill--compact' : ''}" data-name={item.name} style="--accent:{item.color};" role="group" aria-label={item.name} title={item.name}>
        <span class="logo-stack">
          <img class="logo logo--plain" src={item.plain} alt="" />
          <img class="logo logo--orig" src={item.original} alt="" />
        </span>
        <span class="label">{item.name}</span>
      </div>
    {/each}
  </div>
</div>
