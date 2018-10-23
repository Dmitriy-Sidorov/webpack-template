let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let conf = {
    entry: path.join(__dirname, './src', 'index'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-bulk-import-loader',
                        }
                    ]
                })
            },

            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: path.join(__dirname, 'dist/assets/')
                        }
                    }
                ]
            },

            {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]'
            },

            {
                test: /\.ttf$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./fonts/[name].[ext]'
            },

            {
                test: /\.eot$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=./fonts/[name].[ext]'
            },

            {
                test: /\.svg$/,
                loader: 'url-loader?limit=10000&mimetype=application/svg+xml&name=./fonts/[name].[ext]'
            }
        ]
    },

    devServer: {
        overlay: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: path.join(__dirname, 'dist', 'index.html')
        }),

        new ExtractTextPlugin('main.css'),
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    conf.devtool = production ? false : 'source-map';
    return conf;
};