import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: './mvue/myvue.js',
  output: {
    file: './dist/myvue.js',
    format: 'umd',
    name: 'Vue'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};