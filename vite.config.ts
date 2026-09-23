// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  base: '/genesis/',
  plugins: [react()],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],

    alias: {
      // Main project alias
      '@': path.resolve(__dirname, './src'),

      // Fix duplicate React issues
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),

      // Asset alias used in Figma imports (your hero image)
      'figma:asset/9a37286e101197d978dc518f5bf9258b949db55b.png':
        path.resolve(__dirname, './src/assets/9a37286e101197d978dc518f5bf9258b949db55b.png'),
    },
  },

  build: {
    target: 'esnext',
    outDir: 'dist',          // IMPORTANT for Vercel
    emptyOutDir: true,
  },

  server: {
    port: 3000,
    open: true,
  },
});
