import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    dts: true, //declarations
    format:['esm','cjs','iife'],
    splitting: false,
    sourcemap: true,
    clean: true,
})
