module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier/react', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    /* 确定不会发生改变的规则 */
    'react/jsx-props-no-spreading': 0, // 允许 jsx 属性使用扩展运算符
    'react/prop-types': 0, // 不需要使用 prop-types 检查组件 props
    'import/prefer-default-export': 0, // 不需要优先使用默认导出
    'import/no-extraneous-dependencies': 0, // 不导入非 dependencies 中的库
    /* 可能会改变的规则 */
    'react/react-in-jsx-scope': 0, // 使用 jsx 的组件无需引入 React
    'jsx-a11y/no-static-element-interactions': 0, // 无障碍暂时用不到
    camelcase: 0, // 后台返回的字段不是驼峰的
  },
};
