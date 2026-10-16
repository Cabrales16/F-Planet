import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// La demo se publica en https://<usuario>.github.io/F-Planet/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === 'demo' ? '/F-Planet/' : '/',
}))
