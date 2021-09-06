import { SmileOutlined, EditOutlined, ExportOutlined } from "@ant-design/icons";

export const routes = {
  path: "/",
  routes: [
    {
      path: "/home",
      name: "欢迎",
      icon: <SmileOutlined />
    },
    {
      path: "/editor",
      name: "编辑器",
      icon: <EditOutlined />
    },
    {
      path: "/dsl",
      name: "DSL转换",
      icon: <ExportOutlined />
    }
  ]
};
