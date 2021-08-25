export enum componentType {
  Layout = 0, // 布局组件，提供flex的弹性布局
  Base, // 基本组件，例如按钮、文本等
  Chart // 图表
}
const componentPath = {
  Layout: "Layout",
  Base: "Base"
};
type componentPathType = keyof typeof componentPath;

export const getComponentPath = (type: componentType, name: string) => {
  const key = Object.keys(componentPath)[type] as componentPathType;
  return `${componentPath[key]}/${name}`;
};
