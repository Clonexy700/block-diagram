const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
const serverUrl = process.env.VUE_APP_SERVER_URL || ''

module.exports = {
    publicPath: serverUrl || '/',
    outputDir: 'dist',
    assetsDir: 'assets', // (js, css, img, fonts)
    lintOnSave: false,

    pluginOptions: {

    }
}
