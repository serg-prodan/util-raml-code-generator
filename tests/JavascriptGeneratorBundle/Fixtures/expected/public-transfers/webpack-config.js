const path = require('path');

module.exports = (env, argv) => {
    const config = {
        entry: {
            index: path.resolve(__dirname, 'src/index.js'),
        },
        output: {
            libraryTarget: 'umd',
            library: 'vendorPublicTransfersClient'
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ],
        },
        devtool: 'source-map',
        context: path.resolve(__dirname),
        target: 'web',
        externals: {
            '@paysera/money': {
                'root': 'PayseraMoney',
                'commonjs': '@paysera/money',
                'commonjs2': '@paysera/money',
                'amd': '@paysera/money',
            },
            '@paysera/http-client-common': {
                'root': 'PayseraHttpClientCommon',
                'commonjs': '@paysera/http-client-common',
                'commonjs2': '@paysera/http-client-common',
                'amd': '@paysera/http-client-common',
            },
        }
    };

    if (argv.mode === 'development') {
        config.devServer = {
            contentBase: [
                path.join(__dirname, 'demo'),
                path.join(__dirname, 'node_modules'),
            ],
            watchContentBase: true,
            port: 9000
        };
    }

    return config;
};
