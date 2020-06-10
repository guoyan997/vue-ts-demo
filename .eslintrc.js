module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'object-curly-spacing': [0, "never"], // 大括号内是否允许不必要的空格,never标识不允许
    "no-unused-vars": "off",
    "prefer-const": "off",
    // 设置typescript-eslint规则
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
    "@typescript-eslint/interface-name-prefix": 'off',
    "@typescript-eslint/no-explicit-any": 'off',
    "@typescript-eslint/member-delimiter-style": 'off',
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "always"
    }]
  }
};
