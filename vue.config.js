module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  transpileDependencies: [
    'quasar',
  ],
  devServer: {
    disableHostCheck: true,
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_BACKEND_URL,
        baseURL: '/api',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      },
    },
  },
};
