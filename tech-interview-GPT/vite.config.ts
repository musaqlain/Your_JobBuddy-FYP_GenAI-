import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "/tech-interview/", // Ensures assets & routing work correctly
  server: {
    port: 5173,
    strictPort: true,
  }
});
