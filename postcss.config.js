// postcss.confing.js
const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"), // name your custom tailwind
    require('autoprefixer')(),
  ],
};