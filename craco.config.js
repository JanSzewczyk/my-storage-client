const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@UI": path.resolve(__dirname, "src/components/UI/"),
      "@containers": path.resolve(__dirname, "src/containers/"),
      "@hoc": path.resolve(__dirname, "src/hoc/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@shared": path.resolve(__dirname, "src/shared/"),
      "@config": path.resolve(__dirname, "src/shared/config/"),
      "@utils": path.resolve(__dirname, "src/shared/utils/"),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@(.*)$": "<rootDir>/src$1",
      },
    },
  },
};
