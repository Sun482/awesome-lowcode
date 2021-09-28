import type { Node } from "@/core/DSL/interface/node";
import { HTMLRender as flexHTML } from "./Layout/Flex";
import { HTMLRender as buttonHTML } from "./Base/Button";
import { HTMLRender as headerHTML } from "./Pro/Header";
import { HTMLRender as navigationHTML } from "./Pro/Navigation";
import { dslEngine } from "@/core/DSL/container";
import h from "hyperscript";

export type DSLInput = { node: Node };
export type DSLOutput = any;
export type DSLRender = (input: DSLInput) => DSLOutput;
export type targetPlatform = "HTML";
export type dslRenderType = Record<
  string,
  Record<string, Record<targetPlatform, DSLRender>>
>;
const rootRender: DSLRender = ({ node }) => {
  const childrenContent = node.children.map((item) => {
    return dslEngine.Node2Code(item, "HTML");
  });
  const dom = h("div", {}, [...childrenContent]);
  return dom.outerHTML;
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
  },
  Pro: {
    Header: {
      HTML: headerHTML
    },
    Navigation: {
      HTML: navigationHTML
    }
  }
};
