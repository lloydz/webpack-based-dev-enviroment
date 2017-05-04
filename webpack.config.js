// 该配置基于webpack2.0 详情查看 https://webpack.js.org/guides/migrating/

const path = require('path'); // 导入路径包
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // css打包插件

//定义路径
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(APP_PATH, 'build');

module.exports = {
    // entry: APP_PATH, //入口文件，可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        app: path.resolve(APP_PATH, 'index.js')
    },

    output: {
        path: path.resolve(APP_PATH, 'build'), // 指定打包之后的文件夹
        // publicPath: '/assets/', // 指定资源文件引用的目录，也就是说用/assests/这个路径指代path，开启这个配置的话，index.html中应该要引用的路径全部改为'/assets/...'
        // filename: 'bundle.js' // 指定打包为一个文件 bundle.js
        filename: '[name].js' // 可以打包为多个文件
    },

    // 使用loader模块
    module: {
        /*在webpack2.0版本已经将 module.loaders 改为 module.rules 为了兼容性考虑以前的声明方法任然可用，
        同时链式loader(用!连接)只适用于module.loader，同时-loader不可省略*/
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract(['css-loader', {
                loader: "postcss-loader",
                options: {
                    plugins: function() {
                        return [
                            require('autoprefixer')
                        ];
                    }
                }
            }])
        }, {
            test: /\.styl(us)?$/,
            use: ExtractTextPlugin.extract(['css-loader', {
                loader: "postcss-loader",
                options: {
                    plugins: function() {
                        return [
                            require('autoprefixer')
                        ];
                    }
                }
            }, 'stylus-loader'])
        }]
    },

    // 配置devServer
    devServer: {
        contentBase: "./app/", // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true // 实时刷新
    },

    plugins: [
        new HtmlwebpackPlugin({
            template: './app/index.html'
        }),
        new ExtractTextPlugin("styles.css"),
    ]
}
