const path = require('path');

const mode = 'production';
const watch = false;

module.exports = {
    entry: './src/index.ts',
    mode: mode,
    watch: watch,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    plugins: [],
};
