const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

// 线上打包路径，请根据项目实际线上情况
// const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
module.exports = {
  publicPath: './', // 默认''，部署应用包时的基本 URL
  outputDir: 'dist', // 'dist', 生产环境构建文件的目录
  lintOnSave: true,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  assetsDir: './', // 放置生成的静态资源路径，默认在outputDir, 相对于outputDir的静态资源(js、css、img、fonts)目录
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
  },
  css: {
    modules: false,
    extract: true,
    sourceMap: false,
    loaderOptions: {
      // px转换为rem
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 75, // 换算的基数
            // selectorBlackList: ['weui', 'el'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  },
  parallel: require('os').cpus().length > 1,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    open: process.env.NODE_ENV === 'production',
    host: '0.0.0.0',
    // port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }
  }
}
