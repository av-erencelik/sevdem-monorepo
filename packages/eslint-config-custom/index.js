module.exports = {
  extends: ["next", "turbo", "prettier", "next/core-web-vitals", "plugin:tailwindcss/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
  plugins: ["tailwindcss"],
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: path.join(__dirname, "./tailwind.config.js"),
    },
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
