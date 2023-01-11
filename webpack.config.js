const path = require('path')

module.exports = {
    entry: './build/public/scripts/tic_tac_toe_init.js',
    module: {
        rules: []
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    }
};