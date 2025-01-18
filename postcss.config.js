const postcssCustomMedia = require("postcss-custom-media");
const postcssGlobalData = require("@csstools/postcss-global-data");

module.exports = {
  plugins: [
    require("postcss-preset-env"),
    postcssGlobalData({
      files: ["src/app/styles/queries.scss"],
    }),
    postcssCustomMedia(),
  ],
};
