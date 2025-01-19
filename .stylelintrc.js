const { rules } = require("eslint-plugin-react");

module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
  rules: {
    "selector-class-pattern": null,
  }
};
