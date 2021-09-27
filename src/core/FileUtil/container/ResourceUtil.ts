import { IDENTIFIERS } from "@/common/container/identifiers";
import type { MapUtilsInterface } from "@/core/DSL/interface/map";
import { inject, injectable } from "inversify";
import type {
  ResourceType,
  ResourceUtilInterface
} from "../interface/ResourceUtil";

@injectable()
export class ResourceUtils implements ResourceUtilInterface {
  private resourceMap: Map<string, ResourceType>;
  constructor(@inject(IDENTIFIERS.MapUtils) mapUtil: MapUtilsInterface) {
    this.resourceMap = mapUtil.ResourceMap;
  }
  addResource(target: ResourceType, path: string) {
    this.resourceMap.set(path, target);
    return path;
  }
  getResource(resourceID: string) {
    if (!this.resourceMap.has(resourceID)) {
      return { success: false, value: null };
    }
    return {
      success: true,
      value: this.resourceMap.get(resourceID) as ResourceType
    };
  }
  removeResource(resourceID: string) {
    return this.resourceMap.delete(resourceID);
  }
}
