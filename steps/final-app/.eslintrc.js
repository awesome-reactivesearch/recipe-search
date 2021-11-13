module.exports = {
  parser: "babel-eslint",
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["jest", "prettier"],
  env: {
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  parser: "babel-eslint",
  rules: {
    "prettier/prettier": ["warn"],
    "react/prop-types": 0,
    indent: 0,
    "no-tabs": 0,
    "eol-last": ["warn", "always"],
    "no-underscore-dangle": 0,
    // allow specifying true explicitly for boolean props
    "react/jsx-boolean-value": 0,
  },
};
