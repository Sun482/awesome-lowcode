/* eslint-disable no-param-reassign */
import { IDENTIFIERS } from "@/common/container/identifiers";
import type {
  componentPathType,
  componentType
} from "@/constants/componentType";
import { componentPathObj } from "@/constants/componentType";
import type { MapUtilsInterface } from "@/core/DSL/interface/map";
import type { ComponentProps } from "@/package/common";

import { inject, injectable } from "inversify";
import { ReactNode } from "react";
import type { componentUtils } from "../interface/comUtilsInterface";

@injectable()
export class ComUtils implements componentUtils {
  private didShowMap: Map<string, boolean>;
  private componentRenderMap: Map<string, ComponentProps>;
  private componentInstanceMap: Map<string, ReactNode>;
  private mapUtil: MapUtilsInterface;

  constructor(@inject(IDENTIFIERS.MapUtils) mapUtil: MapUtilsInterface) {
    this.mapUtil = mapUtil;
    this.didShowMap = this.mapUtil.ViewRenderShowMap;
    this.componentRenderMap = this.mapUtil.ComponentRenderMap;
    this.componentInstanceMap = this.mapUtil.ComponentInstanceMap;
  }
  hasInstance(nodeID: string) {
    return this.componentInstanceMap.has(nodeID);
  }

  setInstance(nodeID: string, instance: ReactNode) {
    if (this.componentInstanceMap.has(nodeID)) {
      console.warn(`实力${nodeID}已注册!`);
      return false;
    }
    this.componentInstanceMap.set(nodeID, instance);
    return true;
  }
  getInstance(nodeID: string) {
    if (this.componentInstanceMap.has(nodeID)) {
      return this.componentInstanceMap.get(nodeID);
    }
    console.error(`实例${nodeID}不存在!`);
    return null;
  }
  hasRender(componentPath: string) {
    return this.componentRenderMap.has(componentPath);
  }
  getRender(componentPath: string) {
    return this.componentRenderMap.get(componentPath) || null;
  }
  setRender(componentPath: string, Render: ComponentProps) {
    if (this.hasRender(componentPath)) {
      console.warn(`Render: ${componentPath}已加载!`);
      return false;
    }
    this.componentRenderMap.set(componentPath, Render);
    return true;
  }
  beShown(nodeID: string) {
    if (this.didShowMap.has(nodeID)) {
      return this.didShowMap.get(nodeID) as boolean;
    }
    return false;
  }
  setShown(nodeID: string, shown: boolean) {
    this.didShowMap.set(nodeID, shown);
    return true;
  }
  getComponentPath(type: componentType, name: string) {
    const key = Object.keys(componentPathObj)[type] as componentPathType;
    return `${componentPathObj[key]}/${name}`;
  }
}
