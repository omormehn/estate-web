import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
    "process.env.SERVER_SIDE": JSON.stringify(env.SERVER_SIDE),
  },
    plugins: [react()],
  }
})
