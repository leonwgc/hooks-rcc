// params: --cfg --env  --flex --report --nocdn (publicPath='') --mkt

// --cfg  e.g. ./config/index.mycfg.js pass mycfg
// --env test/pre/prd
// --flex  compile css px to rem for h5 site
// --report  generate webpack compilation report
// --nocdn  used for test in localhost with http-server host
// --mkt deploy to oss mkt folder and node proxy that folder

/**
 * notice:
 * --cfg and --env is required , others are optional.
 **/

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackBar = require('webpackbar');
const process = require('process');
const chalk = require('chalk');
const pkg = require('./package.json');
const prefixMap = {
  prd: 'p',
  test: 't',
  pre: 'u',
  dev: 'd',
};
const port = 9002;
const dist = getPath('./dist');
const deployEnvs = ['prd', 'test', 'pre', 'dev'];

const getHtmlTpl = require('./tpl');
function getPath(_path) {
  return path.resolve(__dirname, _path);
}

const configKeys = ['env', 'flex', 'report', 'nocdn', 'mkt', 'WEBPACK_SERVE'];

module.exports = (cfg) => {
  // console.log(cfg);
  const envKeys = Object.keys(cfg);
  let cfgEnv = envKeys.find((k) => !configKeys.includes(k));

  if (!fs.existsSync(getPath(`./config/index.${cfgEnv}.js`))) {
    exit('config not exist');
  }
  cfg.cfg = cfgEnv;

  const env = cfg.env;
  const isDev = env === 'dev'; // build mode: development
  const isProd = !isDev; // build mode: production
  const repoName = pkg.name;
  const genReport = cfg.report === true;
  const entry = Object.create(null);
  const htmlsPlugins = [];
  const compileConfig = 'index.' + cfg.cfg;
  const defaultEntry = 'index'; // 默认模块的入口文件必须是index.jsx
  const flex = cfg.flex;
  const prefix = prefixMap[env] + '.' + cfg.cfg;
  const stats = 'errors-only';
  const cache = {
    type: 'filesystem',
    name: cfg.cfg + `${isProd ? 'prd' : 'dev'}`,
    cacheDirectory: path.resolve(__dirname, 'node_modules', '.cache', 'webpack-cache'),
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
      // By default webpack and loaders are build dependencies
    },
  };
  const alias = {
    '~': path.resolve(__dirname, './src'),
  };
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  const configFile = getPath(`./config/${compileConfig}.js`);

  if (!env) {
    exit('env is required');
  }
  if (deployEnvs.indexOf(env) === -1) {
    exit('env must be' + deployEnvs);
  }
  if (!cfg.cfg) {
    exit('cfg is required');
  }

  if (!fs.existsSync(configFile)) {
    exit(`${configFile} does not exist`);
  }

  // Do this as the first thing so that any code reading it knows the right env.
  process.env.BABEL_ENV = isProd ? 'production' : 'development';
  process.env.NODE_ENV = isProd ? 'production' : 'development';

  // Makes the script crash on unhandled rejections instead of silently
  // ignoring them. In the future, promise rejections that are not handled will
  // terminate the Node.js process with a non-zero exit code.
  process.on('unhandledRejection', (err) => {
    throw err;
  });

  function getPublicPath() {
    // if (isMkt) {
    //   return `https://static.site.com/${env}/mkt/${repoName}/`;
    // }
    // return useCDN ? `https://static.site.com/${env}/${repoName}/` : '';
    return '';
  }

  const configObject = require(`./config/${compileConfig}`);
  const modules = Object.keys(configObject);

  if (!modules.length) {
    exit(`please config compile module`);
  }

  for (let srcModule of modules) {
    if (!fs.existsSync(path.resolve(`./src/${srcModule}`))) {
      exit(`can't find module folder: ${srcModule}`);
    }
    let moduleEntry = '';
    if (
      !fs.existsSync(getPath(`./src/${srcModule}/${defaultEntry}.jsx`)) &&
      !fs.existsSync(getPath(`./src/${srcModule}/${defaultEntry}.tsx`))
    ) {
      exit(`entry not exist:${srcModule}`);
    }

    moduleEntry = getPath(`./src/${srcModule}/${defaultEntry}`);

    entry[srcModule] = [getPath('./src/polyfill'), moduleEntry];

    htmlsPlugins.push(
      new HtmlWebpackPlugin(
        Object.assign(
          {
            filename: `${srcModule}.html`,
            templateContent: ({ htmlWebpackPlugin }) =>
              getHtmlTpl(flex, htmlWebpackPlugin, configObject[srcModule].title),
            inject: false,
            hash: false,
            chunks: [srcModule, 'vendor', 'common', 'runtime'],
          },
          isProd
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      )
    );
  }

  function exit(error) {
    console.log(chalk.red(error));
    process.exit(9);
  }
  function getStyleLoaders(useCss = false) {
    const loaders = [
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDev,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            flex,
            sourceMap: isDev,
          },
        },
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            relativeUrls: false,
            sourceMap: isDev,
            javascriptEnabled: true,
          },
        },
      },
    ];
    if (useCss) {
      loaders.pop();
    }
    loaders.unshift({
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: false,
      },
    });
    if (isDev) {
      loaders.shift();
      loaders.unshift({ loader: 'style-loader' });
    }
    return loaders;
  }

  function getDist() {
    if (env === 'prd') {
      return getPath(`./dist/${repoName}`);
    } else if (env === 'test') {
      return getPath(`./t-dist/${repoName}`);
    } else if (env === 'pre') {
      return getPath(`./u-dist/${repoName}`);
    }
  }

  const config = {
    stats,
    cache,
    mode: isDev ? 'development' : 'production',
    bail: isProd,
    entry,
    output: {
      path: isDev ? undefined : getDist(),
      pathinfo: isDev,
      chunkFilename: `${prefix}.[name].[contenthash:8].js`,
      filename: isDev ? '[name].js' : `${prefix}.[name].[contenthash:8].js`,
      publicPath: isDev ? '' : getPublicPath(),
    },
    devtool: isDev ? 'cheap-module-source-map' : false,
    target: ['web', 'es5'],
    module: {
      rules: [
        {
          test: /\.[j|t]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.less$/,
          use: getStyleLoaders(),
        },
        {
          test: /\.css$/,
          use: getStyleLoaders(true),
        },
        {
          test: /\.(png|jpg|gif|jpeg|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: isProd ? 10000 : 1,
              name: './images/[name].[contenthash:8].[ext]',
            },
          },
        },
        {
          test: /\.(ttf|otf|woff|woff2|eot)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: './fonts/[name].[ext]',
              limit: 8192,
            },
          },
        },
      ],
    },
    resolve: {
      extensions,
      alias,
    },
    optimization: {
      minimize: isProd,
      minimizer: [new CssMinimizerPlugin()],
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      splitChunks: {
        name: false,
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'all',
            minChunks: 2,
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10,
          },
        },
      },
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${prefix}.[name].[contenthash:8].css`,
        chunkFilename: `${prefix}.[name].[contenthash:8].css`,
      }),
      new webpack.DefinePlugin({
        __client__: true,
        __dev__: isDev,
        __env__: JSON.stringify(env),
      }),
      new WebpackBar(),
      new AntdDayjsWebpackPlugin(),
      ...htmlsPlugins,
    ],
  };

  if (isDev) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin());
    config.devServer = {
      disableHostCheck: true,
      contentBase: dist,
      host: '0.0.0.0',
      useLocalIp: true,
      port,
      inline: true,
      hot: false,
      publicPath: '',
      stats,
      compress: true,
    };
    console.log(chalk.green(`开发测试地址:http://localhost:${port}/${modules[0]}.html`));
  } else {
    if (genReport) {
      config.plugins.push(
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          openAnalyzer: true,
          analyzerMode: 'static',
          reportFilename: getPath('report.html'),
        })
      );
    }
  }
  return config;
};
