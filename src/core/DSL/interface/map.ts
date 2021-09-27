import { ResourceType } from "@/core/FileUtil/interface/ResourceUtil";
import type { ComponentProps } from "@/package/common";

// 这里聚集了会用到的一系列map
export interface MapUtilsInterface {
  // ViewRenderShowMap: 画布上组件的useDidShow是否被调用的map
  readonly ViewRenderShowMap: Map<string, boolean>;
  // ComponentCountMap: 树中不同节点的已注册个数map
  readonly ComponentCountMap: Map<string, number>;
  // ComponentRenderMap: 已经加载入内存的组件Render
  readonly ComponentRenderMap: Map<string, ComponentProps>;
  // ComponentInstanceMap: 画布上的React组件实例
  readonly ComponentInstanceMap: Map<string, any>;
  // ResourceMap: 资源管理Map
  readonly ResourceMap: Map<string, ResourceType>;
}
