
export default {
    input: "./src/main.js",
    output: {
        file: "./dist/sage.js",
        format: "esm"
    },
    watch: {
        exclude: "node_modules/**"
    }
}
