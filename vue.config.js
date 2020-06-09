module.exports = {
    publicPath: './',
    outputDir:'dist',
    assetsDir:'static',
    productionSourceMap: false,
	lintOnSave: process.env.NODE_ENV === 'development',
	devServer: {
	    open: false,//启动时,是否自动打开浏览器
	    https: false,//是否为 https的方式
	    overlay: {
	      warnings: false,
	      errors: true
	    },
	    proxy: {
			//工程 A 代理配置规则
	      '/A': {
	        target: process.env.VUE_APP_HRDS_A_API,	// 目标 API 地址
	        changeOrigin: true,	// 允许websockets跨域
	        ws: true,
	        pathRewrite: { //匹配到 /A时,将/A地址重写为 /A/action/hrds/a/biz
	          '^/A': '/A/action/hrds/a/biz'
	        }
		  }
	    }
	  }
}
