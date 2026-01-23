import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import mdx from '@astrojs/mdx';

// Polyfill plugin to inject MessageChannel at the top of the worker bundle
function messageChannelPolyfill() {
  return {
    name: 'message-channel-polyfill',
    enforce: 'pre',
    transform(code, id) {
      // Only inject into the worker entry point
      if (id.includes('_worker.js') || id.includes('entry.mjs')) {
        const polyfill = `
// MessageChannel polyfill for Cloudflare Workers
if (typeof MessageChannel === 'undefined') {
  globalThis.MessageChannel = class MessageChannel {
    port1 = { postMessage: () => {}, onmessage: null, close: () => {} };
    port2 = { postMessage: () => {}, onmessage: null, close: () => {} };
  };
}
`;
        return polyfill + code;
      }
      return null;
    }
  };
}

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    runtime: {
      mode: 'local',
      type: 'pages',
      bindings: {},
    },
    wasmModuleImports: true,
  }),
  vite: {
    plugins: [tailwindcss(), messageChannelPolyfill()],
    ssr: {
      external: ['node:async_hooks'],
      noExternal: ['better-auth', '@better-auth/core']
    }
  },

  integrations: [react(), mdx()],

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }
});

