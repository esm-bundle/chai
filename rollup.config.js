import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const chaiModule = require("chai/chai.js");
const namedExports = Object.keys(chaiModule);

function createConfig(format) {
  const dir = format === "module" ? "esm" : format;
  return {
    input: "input.js",

    output: {
      file: `${dir}/chai.js`,
      sourcemap: true,
      format,
      exports: "named",
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
              import chai from 'chai/chai.js';
              ${namedExports
                .map((name) => `var ${name} = chai.${name};`)
                .join("\n")}
              export { ${namedExports.join(", ")} };
              export default chai;`;
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
