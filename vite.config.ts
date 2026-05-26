import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

const injectSWVersionPlugin = {
  name: 'inject-sw-version',
  closeBundle() {
    const swPath = path.resolve(__dirname, 'dist/sw.js');
    if (fs.existsSync(swPath)) {
      let content = fs.readFileSync(swPath, 'utf8');
      const version = Date.now().toString();
      content = content.replace('__BUILD_VERSION__', version);
      fs.writeFileSync(swPath, content, 'utf8');
      console.log(`[Plugin] Injected Service Worker build version: ${version}`);
    }
  }
};

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), injectSWVersionPlugin],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
