const path = require('path');

const mode = 'production';
const watch = false;

module.exports = {
    entry: './src/game.js',
    mode: mode,
    watch: watch,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: []
};
