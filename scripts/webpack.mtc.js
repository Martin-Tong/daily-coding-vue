const webpack = require('webpack')
const path = require('path')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = /* library config */(env) => {
    const isProduction = env.production
    return {
        mode: isProduction ? 'production' : 'development',
        entry: './src/components/global_components/index.js', //entry路径相对的是项目根目录
        output: {
            path: path.resolve(__dirname, '../build/mt_components'), //ouput.path路径相对的是该webpacl配置文件所在的目录
            filename: 'mt-components.js',
            library: 'mtComponents',
            libraryTarget: 'var'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    css: {
                        name: function(module, chunks, cacheGroupKey) {
                            return cacheGroupKey
                        },
                        test: /\.css$/i,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/i,
                    use: 'vue-loader'
                },
                {
                    test: /\.css$/i,
                    use: [isProduction ? miniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader']
                },
                {
                    test: /\.js$/i,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new vueLoaderPlugin(),
            new miniCssExtractPlugin({
                filename: 'style.css',
                chunkFilename: 'scoped.css',
                ignoreOrder: true
            }),
            new CleanWebpackPlugin(),
        ]
    }
}