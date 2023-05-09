module.exports = {
  extends: ["next", "turbo", "prettier", "next/core-web-vitals", "plugin:tailwindcss/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  plugins: ["tailwindcss"],
  settings: {
    tailwindcss: {
      callees: ["cn"],
    },
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
