import type { componentType } from "@/constants/componentType";
import { injectable } from "inversify";
import type { MapUtilsInterface } from "../interface/map";

@injectable()
export class MapUtils implements MapUtilsInterface {
  ViewRenderShowMap: Map<string, boolean>;
  ComponentCountMap: Map<componentType, number>;
  ComponentRenderMap: Map<string, any>;
  constructor() {
    this.ViewRenderShowMap = new Map();
    this.ComponentCountMap = new Map();
    this.ComponentRenderMap = new Map();
  }
}
