module.exports = {
    configureWebpack: {},
    transpileDependencies: [
        "vuetify"
    ],
    publicPath: process.env.NODE_ENV === 'production' ? '/repository-name/' : '/'
};
