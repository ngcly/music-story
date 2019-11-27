const CompressionPlugin = require('compression-webpack-plugin')
var webpack=require('webpack');

module.exports = {
    chainWebpack: (config) => {
    /* 添加分析工具*/
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end();
                config.plugins.delete('prefetch')
            }
        }
    },
    configureWebpack: (config) => {
        if(process.env.NODE_ENV === 'production'){
            // 为生产环境修改配置...
            config.mode = 'production'
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据进行压缩
                    deleteOriginalAssets: false //是否删除原文件
                }),
                new webpack.ProvidePlugin({
                    'jquery':'$'
                })]
            }
        }
    },
    devServer:{//代理
        port:9091,
        proxy:'http://127.0.0.1:8082'
    }
}