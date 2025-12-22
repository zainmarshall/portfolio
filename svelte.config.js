import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';

let highlighter;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			smartypants: true,
			highlight: {
				highlighter: async (code, lang) => {
					if (!highlighter) {
						highlighter = await createHighlighter({
							themes: ['github-dark'],
							langs: ['javascript', 'typescript', 'python', 'cpp', 'java', 'bash', 'json', 'yaml', 'c', 'text', 'markdown']
						});
					}

					try {
						const html = highlighter.codeToHtml(code, { lang: lang || 'text', theme: 'github-dark' });
						// Escape Svelte special characters and binary/non-ASCII data to avoid compiler errors
						return html.replace(/[{}`$]/g, (c) => `&#${c.charCodeAt(0)};`)
							.replace(/[^\x00-\x7F]/g, (c) => `&#${c.charCodeAt(0)};`);
					} catch (e) {
						console.error('[Shiki Error]', e);
						return `<pre class="shiki github-dark"><code>${code}</code></pre>`;
					}
				}
			}
		})
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '' : '',
		}
	}
};

export default config;
