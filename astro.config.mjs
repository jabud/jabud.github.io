// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import { site } from './src/site.config';

// https://astro.build/config
export default defineConfig({
  site: site.url,
  integrations: [sitemap()],
  markdown: {
    // Los links externos en el contenido Markdown abren en otra pestaña
    // (los internos se quedan en el sitio).
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
});
