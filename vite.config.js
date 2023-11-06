import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './',
  root: path.join(__dirname, 'src'),
  build: {
    // build as to go in docs folder for us
    //to be able to point to it with GitHub pages
    outDir: 'docs',
  },
});
