import { routes } from "./src/config/routes";
import { defineConfig } from "umi";

export default defineConfig({
  devtool: false,
  layout: {
    navTheme: "light",
    layout: "top",
    contentWidth: "Fixed",
    headerHeight: 48,
    title: "Lowcode",
    primaryColor: "#1890ff",
    logo: null
  },
  dynamicImport: {
    loading: "@/components/Loading"
  },
  antd: {},
  nodeModulesTransform: {
    type: "none"
  },
  routes: routes,
  fastRefresh: {}
});
