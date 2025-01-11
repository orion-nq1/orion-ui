const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
    transpileDependencies: true,
    devServer: {
        client: {
            overlay: {
                warnings: false,
                errors: false,
            },
        },
    },
  
    configureWebpack: {
        
        plugins: [
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer']
            }),
            new NodePolyfillPlugin(),
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.vue', '.js', '.json'],
            fallback: {
                crypto: require.resolve('crypto-browserify'),
                fs: false,
                assert: require.resolve('assert/'),
                process: require.resolve('process/browser'),
                util: require.resolve('util/'),
                path: require.resolve('path-browserify'),
                stream: require.resolve('stream-browserify'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: { appendTsSuffixTo: [/\.vue$/] },
                    exclude: /node_modules/,
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                },
                
            ],
        },
    },
    parallel: false,
    chainWebpack: (webpackConfig) => {
        webpackConfig.module.rule('vue').uses.delete('cache-loader');
        webpackConfig.module.rule('js').uses.delete('cache-loader');
        webpackConfig.module.rule('ts').uses.delete('cache-loader');
        webpackConfig.module.rule('tsx').uses.delete('cache-loader');

        webpackConfig.plugin('html')
        .use(HtmlWebpackPlugin, [{
            template: path.resolve(__dirname, 'public/index.html'),
            inject: 'body',
            minify: false,
            templateParameters: {
                // Define any custom parameters here
            }
        }]);

        if (!process.env.SSR) {
            webpackConfig.resolve.alias.set(
              "vue3-component-library/components",
              path.resolve(__dirname, "node_modules/vue3-component-library/dist/esm")
            );
          } else {
            webpackConfig.resolve.alias.set(
              "vue3-component-library/components",
              path.resolve(__dirname, "node_modules/vue3-component-library/dist/cjs")
            );
          }
        

        if (!process.env.SSR) {
            
            webpackConfig.entry('app').clear().add('./src/main.js');
            return;
        }

        webpackConfig.entry('app').clear().add('./src/main.server.js');
        webpackConfig.target('node');
        webpackConfig.output.libraryTarget('commonjs2');

        webpackConfig.plugin('manifest').use(new WebpackManifestPlugin({ fileName: 'ssr-manifest.json' }));

        webpackConfig.externals(
            nodeExternals({
              allowlist: [/\.(css|vue)$/, "vue3-toastify"]
            })
          );

        webpackConfig.optimization.splitChunks(false).minimize(false);

        webpackConfig.plugins.delete('hmr');
        webpackConfig.plugins.delete('preload');
        webpackConfig.plugins.delete('prefetch');
        webpackConfig.plugins.delete('progress');
        webpackConfig.plugins.delete('friendly-errors');
        
    },
};
