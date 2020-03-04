const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appAssets: resolveApp('src/assets'), // For images and other assets
  appBuild: resolveApp('build'), // Prod built files end up here
  appConfig: resolveApp('webpack'), // App config files
  appHtml: resolveApp('public/index.html'), // For Index
  appIndexJs: resolveApp('src/index.tsx'), // Main entry point
  appSrc: resolveApp('src'), // App source
  appPublic: resolveApp('public'), // Public source
  appTsConfig: resolveApp('./tsconfig.json')
};
