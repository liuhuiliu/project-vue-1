/* eslint-disable @typescript-eslint/no-var-requires */
//如何让vue使用webpack的封装包
const path = require('path')



module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/project-vue-1-show/' : '/',
    lintOnSave: false,

    chainWebpack: config => {
        const dir = path.resolve(__dirname, 'src/assets/icons')

        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)
            .include.add(dir).end() //只需要包含icon目录的svg
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({ extract: false }).end()

        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])
        config.module.rule('svg').exclude.add(dir) // 其他svg loader 排除icons 目录


    }

}