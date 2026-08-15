import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectory = path.resolve(rootDirectory, "src");

export default defineConfig({
  resolve: {
    alias: {
      "@": sourceDirectory,
      "@components": path.resolve(sourceDirectory, "components"),
      "@contexts": path.resolve(sourceDirectory, "contexts"),
      "@features": path.resolve(sourceDirectory, "components/features"),
      "@layouts": path.resolve(sourceDirectory, "components/layouts"),
      "@lib": path.resolve(sourceDirectory, "lib"),
      "@styles": path.resolve(sourceDirectory, "styles"),
      "@ui": path.resolve(sourceDirectory, "components/ui"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
});
