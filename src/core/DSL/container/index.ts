import type { NodeUtil } from "../interface/node";
import { IDENTIFIERS } from "../../../common/container/identifiers";
import { Noder } from "./Noder";
import { container } from "@/common/container";
import type { MapUtilsInterface } from "../interface/map";
import { MapUtils } from "./MapUtil";
import type { componentUtils } from "@/core/Render/ViewRender/interface/comUtilsInterface";
import { ComUtils } from "@/core/Render/ViewRender/container/ComUtils";
import type { DSLEngineInterface } from "../interface/DSLEngine";
import { DSLEngine } from "./DSLEngine";
import type { ResourceUtilInterface } from "@/core/FileUtil/interface/ResourceUtil";

import { ResourceUtils } from "@/core/FileUtil/container/ResourceUtil";

container.bind<NodeUtil>(IDENTIFIERS.NodeUtil).to(Noder);
container.bind<componentUtils>(IDENTIFIERS.ComponentUtils).to(ComUtils);
container.bind<MapUtilsInterface>(IDENTIFIERS.MapUtils).to(MapUtils);
container.bind<DSLEngineInterface>(IDENTIFIERS.DSLEngine).to(DSLEngine);
container
  .bind<ResourceUtilInterface>(IDENTIFIERS.ResourceUtils)
  .to(ResourceUtils);

export const noder = container.get<NodeUtil>(IDENTIFIERS.NodeUtil);
export const comUtils = container.get<componentUtils>(
  IDENTIFIERS.ComponentUtils
);
export const dslEngine = container.get<DSLEngineInterface>(
  IDENTIFIERS.DSLEngine
);
export const resourceUtil = container.get<ResourceUtilInterface>(
  IDENTIFIERS.ResourceUtils
);
