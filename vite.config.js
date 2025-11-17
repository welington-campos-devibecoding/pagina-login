import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'frontend/login.html'),
        cadastro: resolve(__dirname, 'frontend/cadastro.html'),
        recuperar: resolve(__dirname, 'frontend/recuperar-senha.html'),
        saudacao: resolve(__dirname, 'frontend/saudacao.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
