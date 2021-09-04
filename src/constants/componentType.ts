export enum componentType {
  Layout = 0, // 布局组件，提供flex的弹性布局
  Base, // 基本组件，例如按钮、文本等
  Chart, // 图表
  Pro // 业务组件
}
export const componentPathObj = {
  Layout: "Layout",
  Base: "Base",
  Chart: "Chart",
  Pro: "Pro"
};
export type componentPathType = keyof typeof componentPathObj;
