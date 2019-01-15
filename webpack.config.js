const path = require('path');

const mode = 'development';
const watch = true;

module.exports = [
    {
        name: 'game',
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
    },
    {
        name: 'lifeWorker',
        entry: './src/lifeWorker.js',
        mode: mode,
        watch: watch,
        output: {
            filename: 'lifeWorker.js',
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
    }
];
