import { ResourceType } from "@/core/FileUtil/interface/ResourceUtil";
import { injectable } from "inversify";
import type { MapUtilsInterface } from "../interface/map";

@injectable()
export class MapUtils implements MapUtilsInterface {
  ViewRenderShowMap: Map<string, boolean>;
  ComponentCountMap: Map<string, number>;
  ComponentRenderMap: Map<string, any>;
  ComponentInstanceMap: Map<string, any>;
  ResourceMap: Map<string, ResourceType>;
  constructor() {
    this.ViewRenderShowMap = new Map();
    this.ComponentCountMap = new Map();
    this.ComponentRenderMap = new Map();
    this.ComponentInstanceMap = new Map();
    this.ResourceMap = new Map();
  }
}
