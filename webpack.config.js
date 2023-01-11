const path = require('path')

module.exports = {
    entry: './build/public/scripts/tic_tac_toe_init.js',
    module: {
        rules: []
    },
    output: {
        path: path.resolve(__dirname, './build/public/scripts'),
        filename: 'tic_tac_toe_bundle.js'
    },
    mode: 'production'
};