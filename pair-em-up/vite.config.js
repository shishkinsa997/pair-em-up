import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    base: '/shishkinsa997-JSFE2025Q3/pair-em-up/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },

    build: {
      outDir: 'build',
      emptyOutDir: true,
      sourcemap: isDev,
      minify: false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },

    server: {
      port: 3000,
      open: true,
      strictPort: true,
    },

    preview: {
      port: 8080,
      open: true,
    },
  }
})
