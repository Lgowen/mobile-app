import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from '@unocss/vite'
import path from 'path'
import { execSync } from 'child_process'

const gitHash = (() => {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: path.resolve(__dirname, '../..') }).toString().trim()
  } catch {
    return 'unknown'
  }
})()

export default defineConfig({
  plugins: [UnoCSS(), react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_HASH__: JSON.stringify(gitHash),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3456',
        changeOrigin: true
      }
    }
  }
})
