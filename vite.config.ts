/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      extension: ["ts", "tsx"],
      include: [
        "src/components/**/*.{ts,tsx}",
        "src/App.{ts,tsx}",
        "src/main.{ts,tsx}",
      ],
    },
  },
});
