const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'MovieBay - 影视湾'
            return args
        })
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/', // rewrite path
                },
            }
        }
    },
})
