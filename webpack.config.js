const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'client', '/index.ts'),
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'static')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};