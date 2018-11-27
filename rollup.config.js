import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import minify from 'rollup-plugin-babel-minify';

import pkg from './package.json'

export default {
    input: 'src/finput.ts',
    output: {
        file: pkg.unpkg,
        format: 'iife',
        name: 'finput'
    },
    plugins: [
        commonjs(),
        resolve(),
        typescript({
            typescript: require('typescript'),
        }),
        minify({
            comments: false
        })
    ],
}