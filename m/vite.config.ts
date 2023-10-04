import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1890,
    // middleware: {
    //   // پروکسی کردن درخواست‌های API به پروژه ASP.NET Core
    //   "/api": {
    //     target: "https://vtap.ir/delf/serv/api",
    //     changeOrigin: true,
    //   },
    // },
  },
  plugins: [react()],
});
