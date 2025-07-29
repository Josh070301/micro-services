import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Add console logs to see what's happening during config loading
  const env = loadEnv(mode, process.cwd(), '');
  console.log('Loaded environment variables:', env);
  // Define default values if env vars are missing
  const VITE_API_SERVICE_URL = env.VITE_API_SERVICE_URL || '';
  
  return {
    define: {
      'import.meta.env.VITE_API_SERVICE_URL': JSON.stringify(VITE_API_SERVICE_URL),
    },
    optimizeDeps: {
      include: ['@angular/common', '@angular/core'],
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    server: {
      hmr: true
    }
  };
});