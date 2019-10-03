const withCSS = require("@zeit/next-css");
const withTM = require("next-transpile-modules");

module.exports = withCSS(
  withTM({
    transpileModules: ["lib0"]
  })
);
