const path = require('path');

const mode = 'development';
const watch = true;

module.exports = [
    {
        name: 'game',
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
                    use: ['babel-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.ts'],
        },
        plugins: [],
    },
];
