const path = require('path')
const webpack = require('webpack'); 
const  HtmlWebpackPlugin =  require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'dist'),
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/.css$/i,
                use:[ 
                    MiniCssExtractPlugin.loader,//使用插件开始进行设置分离
                    // path.resolve('./loader/index'),  
                    'css-loader', 
                    {
                        loader:'cssprite-loader',
                        options: {
                            filename: "cssprite", //需要存放的雪碧图的文件名称CSS Sprites
                            padding: 2,//每张素材的间隙
                            algorithm: 'binary-tree',//计算方法 性能最佳
                            imgType: ['png', 'jpg', 'jpeg'],//能够打成雪碧图的素材类型 直接使用作为正则的匹配
                            htmlFontSize:20,//html的font-size值是多少  用于rem的适配
                            imageRatio:2,//使用的是几倍图的素材
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test:/\.(png|gif|jpg)$/,//定制规则
                use: {
                    loader:'url-loader',
                    options:{
                        limit:1,  //设置小于10Kb的图片转化为base64输出 不在使用image
                        outputPath:'images',//打包后存放的文件夹的位置
                        name:'[name][hash:8].[ext]'//[name]=名字 [ext]=后缀
                    }
                }
            }   
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'index.[hash:8].css'
        }),
        new HtmlWebpackPlugin({//设置模板文件
            template:'./src/index.html',//使用打包后的模板文件
            filename:'index.html'//打包后文件的名字
        }),
        new webpack.HotModuleReplacementPlugin() //热更新插件---添加了这个
    ],
    devServer: {
        port: 9000,
        hot: true,
        contentBase: path.join(__dirname, './src/index.js'),
        watchContentBase: true,//----------这个就是设置要不要html文件更改时，重新刷新页面
      },

}