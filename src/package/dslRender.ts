import type { Node } from "@/core/DSL/interface/node";
import { HTMLRender as flexHTML } from "./Layout/Flex";
import { HTMLRender as buttonHTML } from "./Base/Button";
import { dslEngine } from "@/core/DSL/container";

export type DSLInput = { node: Node };
export type DSLOutput = any;
export type DSLRender = (input: DSLInput) => DSLOutput;
export type targetPlatform = "HTML";
export type dslRenderType = Record<
  string,
  Record<string, Record<targetPlatform, DSLRender>>
>;
const rootRender: DSLRender = ({ node }) => {
  const result = node.children.map((item) => {
    return dslEngine.Node2Code(item, "HTML");
  });
  return result.join("\n");
};
export const dslRender: dslRenderType = {
  Layout: {
    Flex: {
      HTML: flexHTML
    },
    Root: {
      HTML: rootRender
    }
  },
  Base: {
    Button: {
      HTML: buttonHTML
    }
  }
};
