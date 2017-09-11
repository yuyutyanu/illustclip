const path = require("path")

module.exports = {
    entry: {
        bundle: [
            path.resolve('./public/src/js/index.js'),
            path.resolve('./public/src/js/sample.js')
        ]
    },
    output: {
        path: path.resolve("./dist"),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ],
    }
}