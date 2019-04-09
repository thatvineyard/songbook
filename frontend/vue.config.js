module.exports = {
  publicPath: process.env.BASE_URL || '/',
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/_variables.scss";',
      },
    },
  },
  // esModule: true
};
