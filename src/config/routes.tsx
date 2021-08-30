export const routes = [
  {
    exact: true,
    path: "/",
    name: "欢迎",
    icon: "user",

    component: "@/pages/home",
    hideInMenu: true
  },
  {
    exact: true,
    path: "/home",
    name: "欢迎",
    icon: "user",

    component: "@/pages/home",
    hideInMenu: true
  },
  {
    exact: true,
    path: "/editor",
    name: "编辑器",
    icon: "edit",
    component: "@/pages/editor/index"
  },
  {
    exact: true,
    path: "/dls",
    name: "DSL转换",
    icon: "export",
    component: "@/pages/dsl/index"
  }
];
