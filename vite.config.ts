import path from "path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const rootDir = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(rootDir, "src"),
      },
      {
        find: "~",
        replacement: path.resolve(rootDir, "src", "customs"),
      },
    ],
  },
});
