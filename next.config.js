const withTM = require("next-transpile-modules");
const process = require("process");

module.exports = withTM({
  publicRuntimeConfig: {
    session: process.env.SESSION
  },
  transpileModules: ["lib0"]
});
