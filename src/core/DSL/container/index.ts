import type { NodeUtil } from "../interface/node";
import { IDENTIFIERS } from "../../../constants/identifiers";
import { Noder } from "./Noder";
import { container } from "@/common/container";

container.bind<NodeUtil>(IDENTIFIERS.NodeUtil).to(Noder);
export const noder = container.get<NodeUtil>(IDENTIFIERS.NodeUtil);
