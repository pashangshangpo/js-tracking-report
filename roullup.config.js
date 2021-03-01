import pluginCommonjs from '@rollup/plugin-commonjs'
import pluginJson from '@rollup/plugin-json'
import pluginImage from '@rollup/plugin-image'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import { name } from './package.json'

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: 'dist/index.js',
        name: name.replace(/.*\//, '').replace(/-([\s\S])/g, (_, $0) => {
          return $0.toUpperCase()
        }),
        format: 'umd',
        compact: true,
        exports: 'auto',
      }
    ],
    plugins: [
      pluginImage({
        exclude: ['node_modules/**'],
      }),
      nodeResolve({
        preferBuiltins: true,
        browser: true,
      }),
      pluginCommonjs(),
      pluginJson(),
      terser(),
    ],
    cache: true,
  }
]
