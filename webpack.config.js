module.exports = {
    entry: "./app/index.js",
    output: {
        filename: "kanban.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        },{ test: /\.css$/,
            loader: "style-loader!css-loader" 
        }]
    },
    devServer: {
        contentBase: './'
    }
};
