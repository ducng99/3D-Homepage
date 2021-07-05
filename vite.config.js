const { resolve } = require('path')

module.exports = {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                landing: resolve(__dirname, 'landing.html')
            }
        }
    }
}