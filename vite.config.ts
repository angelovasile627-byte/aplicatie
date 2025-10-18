import { defineConfig } from 'vite';
import { resolve } from 'path';

// Use dynamic import for ESM-only plugins to avoid require() loading issues
export default defineConfig(async () => {
  const reactPluginPkg = await import('@vitejs/plugin-react');
  const react = (reactPluginPkg && (reactPluginPkg as any).default) || reactPluginPkg;

  return {
    root: 'src/renderer',
    base: './',
    plugins: [react()],
    build: {
      outDir: '../../dist/renderer',
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, 'src/renderer/index.html')
      }
    },
    server: {
      port: 5173
    }
  };
});