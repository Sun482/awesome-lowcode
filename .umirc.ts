import { defineConfig } from "umi";

export default defineConfig({
  dynamicImport: {
    loading: "@/components/Loading"
  },
  nodeModulesTransform: {
    type: "none"
  },
  routes: [{ path: "/", component: "@/pages/index" }],
  fastRefresh: {}
});
