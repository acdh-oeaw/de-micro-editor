import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["esm"],
  dts: true,
  minify: true,
  treeshake: true,
  shims: true,
  esbuildOptions(options) {
    options.packages = "external";
  },
  external: ["openseadragon"],
});
