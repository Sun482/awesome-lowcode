import { routes } from "./src/config/routes";
import { defineConfig } from "umi";
import MonacoWebpackPlugin from "monaco-editor-webpack-plugin";

export default defineConfig({
  devtool: false,
  dynamicImport: {
    loading: "@/components/Loading"
  },
  antd: {},
  nodeModulesTransform: {
    type: "none"
  },
  fastRefresh: {},
  chainWebpack: (memo) => {
    // 更多配置 https://github.com/Microsoft/monaco-editor-webpack-plugin#options
    memo.plugin("monaco-editor-webpack-plugin").use(MonacoWebpackPlugin, [
      // 按需配置
      { languages: ["html"] }
    ]);
    return memo;
  }
});
