module.exports = {
  proxy: {
    '/api' : { //使用"/api"来代替"http://api.jxzhjy.com"
      target: 'http://api.jxzhjy.com',
      secure: false,
      changeOrigin: true, // 支持跨域
      pathRewrite: {
        '^/api': '/api'
      }
    },
    '/uploadavatar' : { //使用"/api"来代替"http://api.jxzhjy.com"
      target: 'http://fstore.jxzhjy.com',
      secure: false,
      changeOrigin: true, // 支持跨域
      pathRewrite: {
        '^/uploadavatar': '/uploadavatar'
      }
    }
  }
}
