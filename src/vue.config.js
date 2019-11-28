const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    publicPath: './',
    chainWebpack: config => {
      // 解决ie11兼容ES6
      config.entry('main').add('babel-polyfill')
      // 开启图片压缩
      config.module.rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true })
      // 开启js、css压缩
      if (process.env.NODE_ENV === 'production') {
        config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          test:/\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }))
      }
    },

    configureWebpack: {
        externals: {
            'jquery':'$'
        }
    },

    transpileDependencies: [
        'biyi-admin', // 指定对第三方依赖包进行babel-polyfill处理
    ],

    devServer:{//代理
        port:9091,
        proxy:'http://127.0.0.1:8082'
    }
}