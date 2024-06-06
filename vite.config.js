import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // change the default port to 3000
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
