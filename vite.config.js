import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replit(그리고 다른 클라우드 IDE)에서는 0.0.0.0으로 서버를 열어야
// 미리보기 창에서 접속이 됩니다. port는 Replit이 자동으로 잡아줍니다.
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
