import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const chaiModule = require("chai/chai.js");
const namedExports = Object.keys(chaiModule).join(", ");

function createConfig(format) {
  const dir = format === "module" ? "esm" : format;
  return {
    input: "input.js",

    output: {
      file: `${dir}/chai.js`,
      sourcemap: true,
      format,
    },
    plugins: [
      {
        resolveId(id) {
          if (id === "input.js") {
            return id;
          }
        },

        load(id) {
          if (id === "input.js") {
            return `
              import * as chai from 'chai/chai.js'; 
              const { ${namedExports} } = chai;
              export { ${namedExports} };`;
          }
        },
      },
      nodeResolve(),
      commonjs(),
      terser(),
    ],
  };
}

export default [createConfig("module"), createConfig("system")];
