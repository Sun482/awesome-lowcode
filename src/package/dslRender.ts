import type { Node } from "@/core/DSL/interface/node";
import { HTMLRender as flexHTML } from "./Layout/Flex";

export type DSLInput = { node: Node };
export type DSLOutput = any;
export type DSLRender = (input: DSLInput) => DSLOutput;
type dslRenderType = Record<string, Record<string, Record<string, DSLRender>>>;
export const dslRender: dslRenderType = {
  Layout: {
    Flex: {
      HTML: flexHTML
    }
  }
};
