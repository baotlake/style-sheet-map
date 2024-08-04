/// <reference types="node" />

import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "StyleSheetMap",
      fileName: "index",
    },
    chunkSizeWarningLimit: 5,
    emptyOutDir: true,
  },
});
