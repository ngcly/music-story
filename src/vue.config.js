module.exports = {
    configureWebpack: {
        externals: {
            'jquery':'$'
        }
    },
    devServer:{//代理
        port:9091,
        proxy:'http://127.0.0.1:8082'
    }
}