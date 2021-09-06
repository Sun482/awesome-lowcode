import { routes } from "./src/config/routes";
import { defineConfig } from "umi";

export default defineConfig({
  devtool: false,

  dynamicImport: {
    loading: "@/components/Loading"
  },
  antd: {},
  nodeModulesTransform: {
    type: "none"
  },
  fastRefresh: {}
});
