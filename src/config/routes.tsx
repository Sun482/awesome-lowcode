export const routes = [
  {
    exact: true,
    path: "/home",
    name: "欢迎",
    icon: "user",
    hideChildrenInMenu: true,
    component: "@/pages/home"
  },
  {
    exact: true,
    path: "/editor",
    name: "编辑器",
    icon: "edit",
    component: "@/pages/editor/index"
  }
];
