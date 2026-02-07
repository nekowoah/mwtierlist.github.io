import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base must match GitHub Pages repo path for correct asset URLs
export default defineConfig({
  plugins: [react()],
  base: '/mwtierlist/',
});
