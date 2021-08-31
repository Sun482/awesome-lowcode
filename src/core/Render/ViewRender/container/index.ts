import { container } from "@/common/container";
import { IDENTIFIERS } from "@/constants/identifiers";
import type { componentUtils } from "../interface/map";
import { ComUtils } from "./ComUtils";

container.bind<componentUtils>(IDENTIFIERS.ComponentUtils).to(ComUtils);
export const comUtils = container.get<componentUtils>(
  IDENTIFIERS.ComponentUtils
);
