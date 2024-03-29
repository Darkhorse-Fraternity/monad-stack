import { defineConfig } from "tsup"

export default defineConfig((options) => ({
  minify: !options.watch,
  entry: ["./index.ts"],
  format: ["esm", "cjs"],
  clean: true,
  dts: true,
  external: ["react", "@tanstack/react-query", "axios"],
  sourcemap: true,
}))
