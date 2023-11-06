import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    // build as to go in docs folder for us
    //to be able to point to it with GitHub pages
    outDir: 'docs',
  },
});
