import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/hades-game-guide/',
  plugins: [react()],
});
