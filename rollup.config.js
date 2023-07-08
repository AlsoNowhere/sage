import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "./src/index.js",
  output: {
    file: "./dist/index.js",
    format: "esm",
  },
  plugins: [resolve()],
  watch: {
    exclude: "node_modules/**",
  },
};
