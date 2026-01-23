import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'inject-message-channel',
        transform(code, id) {
          // Inject polyfill at the start of the server entry
          if (id.includes('.astro') || id.includes('chunks/')) {
            return `import { MessageChannel as MC } from 'node:worker_threads'; if (!globalThis.MessageChannel) globalThis.MessageChannel = MC;\n${code}`;
          }
        }
      }
    ]
  },

  integrations: [react(), mdx()],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }
});

