const webpack = require('webpack')
const path = require('path')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebackPlugin = require('copy-webpack-plugin')

module.exports = (env) => {
    const isProduction = env.production
    return {
        mode: isProduction ? 'production' : 'development',
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? "[chunkhash].file.js" : "[name].file.js",
            chunkFilename: isProduction ? "[id].[chunkhash].js" : "[name].chunkFile.js",
            sourceMapFilename: '[file].map'
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        devtool: isProduction ? '' : 'source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist/public'),
            contentBasePublicPath: '/static',
            open: 'chrome',
            compress: true,
            writeToDisk: true,
            historyApiFallback: true,
            /* openPage: ['', 'three'] */
            openPage: 'three',
            overlay: true
        },
        optimization: {
            /* runtimeChunk: {
                name: 'webpackRuntime'
            } */
            splitChunks: {
                /* { automaticNameDelimiter?, automaticNameMaxLength?, cacheGroups?, chunks?, fallbackCacheGroup?, filename?, hidePathInfo?, maxAsyncRequests?, maxInitialRequests?, maxSize?, minChunks?, minSize?, name? } */
                automaticNameDelimiter: 'dependence-',
                cacheGroups: {                 
                    'vue-x': {
                        name(module, chunks, cacheGroupKey) {
                            return cacheGroupKey
                        },
                        test: /[\\/]node_modules[\\/](vue|vuex)[\\/]/,
                        filename: 'vendors/dependence-[name].js',
                        chunks: 'all'
                    },
                    vueRouter: {
                        name(module, chunks, cacheGroupKey) {
                            return cacheGroupKey
                        },
                        test: /[\\/]node_modules[\\/]vue-router[\\/]/,
                        filename: 'vendors/dependence-[name].js',
                        chunks: 'all'
                    },
                   /*  './src/router/index.js'里需要修改Three的引用方式为非动态导入才能成功split
                    three: {
                        test: /[\\/]node_modules[\\/]three[\\/]/,
                        chunks: 'all',
                        filename: 'vendors/[name].js'
                    } */
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.css$/,
                    use: [isProduction ? miniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader']
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', "eslint-loader"]
                }
            ]
        },
        plugins: [
            new vueLoaderPlugin(),
            new miniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                title: 'threeJS project',
                template: path.resolve(__dirname, './index.html'),
                favicon: './dist/public/resume.jpg',
                inject: 'body'
            }),
            new CleanWebpackPlugin(),
            new webpack.ProvidePlugin({
                TWEEN: ['@tweenjs/tween.js', 'default'],
                COLORS: [path.resolve(path.join(__dirname, 'utils/colors.js')), 'default']
            }),
            new CopyWebackPlugin({
                patterns: [
                    {
                        from: './public',//from的上下文是__dirname
                        to: './public', //to的上下文是OUTPUT.PATH
                        toType: 'dir'
                    }
                ]
            })
        ]
    }
}