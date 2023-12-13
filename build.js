import dts from 'bun-plugin-dts'
await Bun.build({
    entrypoints: ['src/generator.ts', 'src/cli.ts'],
    outdir: './dist',
    plugins: [
        dts()
    ],
    minify: {
        whitespace: true,
        identifiers: true,
        syntax: true,
    },
})