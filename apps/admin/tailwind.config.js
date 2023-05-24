const sharedConfig = require("tailwind-config/tailwind.config.js");

module.exports = {
  presets: [sharedConfig],
  content: ["../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}", "src/**/*.{js,ts,jsx,tsx,mdx}"],
};
