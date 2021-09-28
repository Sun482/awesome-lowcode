/* eslint-disable react/no-array-index-key */

import type { HeaderType } from "./interface/type";

import { memo, useMemo } from "react";

import { dslEngine, resourceUtil } from "@/core/DSL/container";

import type { DSLRender } from "@/package/dslRender";
import h from "hyperscript";
import "./index.less";

export const Render: HeaderType = memo(({ title, subTitle, node }) => {
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
  const headerIconSrc = useMemo(() => {
    const res = resourceUtil.getResource(`${node?.id}#iconImg`);
    return (res.success && res.value) || "";
  }, [node?.id]);
  return (
    <div className="header" style={bgProp}>
      <div className="header-container">
        <div className="header-left">
          <img className="header-icon" src={headerIconSrc as string} />
          <div className="header-title-container">
            <div className="header-title">{title}</div>
            <div className="header-subTitle">{subTitle}</div>
          </div>
        </div>
        <div className="header-right">
          <div className="search-container">
            <input className="search-input" placeholder="请输入搜索内容" />
            <div className="search-button">搜索</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const HTMLRender: DSLRender = ({ node }) => {
  const childrenContent = node.children.map((item) => {
    return dslEngine.Node2Code(item, "HTML");
  });
  const dom = h("div", {}, [...childrenContent]);
  return dom;
};
