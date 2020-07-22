const path = require("path");

module.exports = {
  // rootDir: path.resolve(__dirname, "./"),

  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@config": path.resolve(__dirname, "src/shared/config/"),
      "@containers": path.resolve(__dirname, "src/containers/"),
      "@hoc": path.resolve(__dirname, "src/hoc/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@shared": path.resolve(__dirname, "src/shared/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@UI": path.resolve(__dirname, "src/components/UI/"),
      "@utils": path.resolve(__dirname, "src/shared/utils/"),
    },
  },
  jest: {
    configure: {
      globals: {
        CONFIG: true,
      },
      // moduleFileExtensions: [
      //   "web.js",
      //   "js",
      //   "web.ts",
      //   "ts",
      //   "web.tsx",
      //   "tsx",
      //   "json",
      //   "web.jsx",
      //   "jsx",
      //   "node",
      // ],
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
  },
};
