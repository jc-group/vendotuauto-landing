// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    isr: {
      expiration: 60 * 60 * 24, // cache por 1 día
    },
    imageService: true,
    devImageService: 'sharp',
    imagesConfig: {
      sizes: [320, 640, 1280],
    },
    webAnalytics: { enabled: true },
    // Puedes agregar más opciones según tus necesidades
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
