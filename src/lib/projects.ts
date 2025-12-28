import portfolioImg from '$lib/assets/portfolio.png';

export const projects = [
    {
        title: 'Aegish',
        description: 'A lightweight CLI application for quickly converting natural language into linux commands.',
        github: 'https://github.com/zainmarshall/aegish',
        website: '', // Add website if available
        technologies: ['Python'],
        image: '', // Add image later
        featured: true
    },
    {
        title: 'Portfolio Website',
        description: 'This website! Built with SvelteKit and Tailwind CSS for a smooth, modern experience.',
        github: 'https://github.com/zainmarshall/portfolio',
        website: 'https://zainm.me/',
        technologies: ['Svelte', 'Tailwind CSS', 'JavaScript'],
        image: portfolioImg,
    }
];
