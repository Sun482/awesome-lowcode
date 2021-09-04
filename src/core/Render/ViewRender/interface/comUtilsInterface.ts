import type { componentType } from "@/constants/componentType";
import type { ComponentProps } from "@/package/common";

export interface componentUtils {
  beShown: (nodeID: string) => boolean; // 用于useDidShow Hook的判定
  setShown: (nodeID: string, shown: boolean) => boolean; // 设置ViewRenderShowMap
  getComponentPath: (type: componentType, name: string) => string; // 获取动态组件导入路径
  hasRender: (componentPath: string) => boolean; // 是否已经加载组件Render
  getRender: (componentPath: string) => ComponentProps<any> | null; // 获取组件Render
  setRender: (componentPath: string, Render: ComponentProps<any>) => boolean; // 缓存Render
  hasInstance: (nodeID: string) => boolean;
  setInstance: (nodeID: string, instance: any) => boolean; // 缓存实例React节点
  getInstance: (nodeID: string) => any | null; // 获取节点实例
}
