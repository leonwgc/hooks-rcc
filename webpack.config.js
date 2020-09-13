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
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBar = require('webpackbar');
const process = require('process');
const chalk = require('chalk');
const pkg = require('./package.json');
const argv = require('yargs').argv;
const port = 9001;
const dist = getPath('./dist');
const isDev = argv.env === 'dev'; // build mode: development
const isProd = !isDev; // build mode: production
const isMkt = argv.mkt; // deploy to oss mkt folder
process.env.NODE_ENV = isProd ? 'production' : 'development';
const env = argv.env;
const deployEnvs = ['prd', 'test', 'pre', 'dev'];
let useCDN = true; // 使用阿里cdn ,默认使用
const getHtmlTpl = require('./tpl');
if (argv.nocdn) {
  useCDN = false; // 本地用http-server/serve host, test purpose.
}
const prefixMap = {
  prd: 'p',
  test: 't',
  pre: 'u',
  dev: 'd',
};

if (!env && !isDev) {
  exit('env is required');
}

console.log(chalk.blue(`env: ${env}`));

if (env && deployEnvs.indexOf(env) === -1) {
  exit('env must be' + deployEnvs);
}
let prefix = prefixMap[env] + '.' + argv.cfg;

const repoName = pkg.name;

const genReport = argv.report === true;
const entry = Object.create(null);
const htmlsPlugins = [];
let compileConfig = 'index';
const defaultEntry = 'index'; // 默认模块的入口文件必须是index.jsx

const isUsingFlexH5 = argv.flex;

if (argv.cfg) {
  compileConfig = 'index.' + argv.cfg;
}

const resolveAlias = {
  '~': path.resolve(__dirname, './src'),
  'react-dom': '@hot-loader/react-dom',
};

function getPublicPath() {
  if (isMkt) {
    return `https://static.site.com/${env}/mkt/${repoName}/`;
  }
  return useCDN ? `https://static.site.com/${env}/${repoName}/` : '';
}
const configFile = getPath(`./config/${compileConfig}.js`);

if (!fs.existsSync(configFile)) {
  exit(`${configFile} does not exist`);
}

const configObject = require(`./config/${compileConfig}`);
const modules = Object.keys(configObject);

if (!modules.length) {
  exit(`please config modules to prerender in ${configFile}`);
}
console.log(chalk.blue(`config: ${compileConfig}.js`));

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

  console.log(chalk.blue(`module: ${srcModule}`));

  entry[srcModule] = [getPath('./src/polyfill'), moduleEntry];

  htmlsPlugins.push(
    new HtmlWebpackPlugin(
      Object.assign(
        {
          filename: `${srcModule}.html`,
          templateContent: ({ htmlWebpackPlugin }) =>
            getHtmlTpl(isUsingFlexH5, htmlWebpackPlugin, configObject[srcModule].title),
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
        sourceMap: isDev,
        ident: 'postcss',
        plugins: (loader) => {
          const rt = [require('postcss-flexbugs-fixes'), require('autoprefixer')];
          if (isUsingFlexH5 && !/node_modules/.test(loader.resourcePath)) {
            rt.push(require('postcss-px2rem')({ remUnit: 100 }));
          }
          return rt;
        },
      },
    },
    {
      loader: 'less-loader',
      options: {
        relativeUrls: false,
        sourceMap: isDev,
        javascriptEnabled: true,
      },
    },
  ];
  if (useCss) {
    loaders.pop();
  }
  loaders.unshift({
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDev,
      reloadAll: true,
    },
  });
  if (isDev) {
    loaders.shift();
    loaders.unshift({ loader: 'style-loader' });
  }
  return loaders;
}

function getPath(_path) {
  return path.resolve(__dirname, _path);
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
  mode: isDev ? 'development' : 'production',
  bail: isProd,
  entry,
  output: {
    path: getDist(),
    chunkFilename: `${prefix}.[name].[contenthash:6].js`,
    filename: isDev ? '[name].js' : `${prefix}.[name].[contenthash:6].js`,
    publicPath: isDev ? '' : getPublicPath(),
  },
  devtool: isDev ? 'cheap-module-source-map' : false,
  target: 'web',
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
            name: './images/[name].[contenthash:6].[ext]',
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
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: resolveAlias,
  },
  optimization: {
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
      name: 'runtime',
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${prefix}.[name].[contenthash:6].css`,
      chunkFilename: `${prefix}.[name].[contenthash:6].css`,
    }),
    new webpack.DefinePlugin({
      __client__: true,
      __dev__: isDev,
      __env__: JSON.stringify(env),
    }),
    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: 20,
    }),
    new WebpackBar(),
    ...htmlsPlugins,
  ],
};

function getOpenUrl() {
  return modules[0] + '.html';
}

if (isDev) {
  config.stats = 'errors-warnings';
  // config.module.rules.unshift({
  //   enforce: 'pre',
  //   test: /\.jsx?$/,
  //   exclude: /node_modules/,
  //   loader: 'eslint-loader',
  //   options: {
  //     failOnError: false,
  //     failOnWarning: false,
  //   },
  // });

  config.devServer = {
    disableHostCheck: true,
    contentBase: dist,
    // host: '0.0.0.0',
    port,
    hot: true,
    inline: true,
    useLocalIp: true,
  };
  console.log(chalk.green(`开发测试地址:http://localhost:${port}/${modules[0]}.html`));
} else {
  config.stats = 'errors-only';
  config.plugins.push(new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { safe: true } }));

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

module.exports = config;
