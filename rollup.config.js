import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

function createConfig(format) {
  const dir = format === "module" ? "esm" : format;
  return {
    input: require.resolve("chai"),
    output: {
      file: `${dir}/chai.js`,
      sourcemap: true,
      format,
    },
    plugins: [nodeResolve(), commonjs(), terser()],
  };
}

export default [createConfig("module"), createConfig("system")];
