import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "dist/esm/umd-entrypoint.js",
  output: {
    file: "dist/umd/bundle.js",
    format: "umd",
  },
  plugins: [
    commonjs(),
    nodeResolve({ browser: true }),
    babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] })
  ],
};

export default config;
