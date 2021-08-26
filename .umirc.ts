import { defineConfig } from "umi";

export default defineConfig({
  dynamicImport: {
    loading: "@/components/Loading"
  },

  antd: {},
  nodeModulesTransform: {
    type: "none"
  },
  routes: [{ path: "/", component: "@/pages/index" }],
  fastRefresh: {}
});
