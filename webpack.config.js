const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src',),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    mode: "development"
};