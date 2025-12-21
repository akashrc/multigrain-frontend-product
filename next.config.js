const NextFederationPlugin = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config, options) {
        config.plugins.push(
            new NextFederationPlugin({
                name: 'product',
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    // Example: './ProductList': './components/ProductList.tsx',
                },
                shared: {},
            })
        );
        return config;
    },
};

module.exports = nextConfig;
