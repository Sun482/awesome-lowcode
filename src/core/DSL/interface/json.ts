import type { Node } from "./node";
import type { ScreenInfo } from "./screen";

export interface JsonData {
  root: Node;
  screen: ScreenInfo;
}
