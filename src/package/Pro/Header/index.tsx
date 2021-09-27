/* eslint-disable react/no-array-index-key */

import type { HeaderType } from "./interface/type";

import { memo, useMemo } from "react";

import { dslEngine, resourceUtil } from "@/core/DSL/container";

import type { DSLRender } from "@/package/dslRender";
import h from "hyperscript";

export const Render: HeaderType = memo(({ title, node }) => {
  const bgMode = useMemo(() => {
    return node.backgroundMode;
  }, [node.backgroundMode]);
  const bgImgSrc = useMemo(() => {
    const res = resourceUtil.getResource(`${node?.id}#bgImg`);
    return (res.success && res.value) || "";
  }, [node?.id]);
  const headerHeight = useMemo(() => {
    return node.height || 100;
  }, [node.height]);
  const bgProp =
    bgMode.mode === "color"
      ? {
          backgroundColor: bgMode.value,
          backgroundSize: "100% 100%",
          height: `${headerHeight}px`
        }
      : {
          backgroundImage: `url(${bgImgSrc})`,
          backgroundSize: "100% 100%",
          height: `${headerHeight}px`
        };
  return <div style={bgProp}>{title}</div>;
});

export const HTMLRender: DSLRender = ({ node }) => {
  const childrenContent = node.children.map((item) => {
    return dslEngine.Node2Code(item, "HTML");
  });
  const dom = h("div", {}, [...childrenContent]);
  return dom;
};
