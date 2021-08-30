import { Container } from "inversify";
import type { NodeUtil } from "../interface/node";
import { IDENTIFIERS } from "./identifiers";
import { Noder } from "./Noder";

const container = new Container();
container.bind<NodeUtil>(IDENTIFIERS.NodeUtil).to(Noder);
export default container;
export const noder = container.get<NodeUtil>(IDENTIFIERS.NodeUtil);
