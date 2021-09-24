/* eslint-disable react/no-array-index-key */
import type { Node } from "@/core/DSL/interface/node";
import DynamicEngine from "@/core/Dynamic/Dynamic";
import { commonInject } from "@/core/Render/ViewRender/utils/injectNode";

import { useDrop } from "react-dnd";

import type { FlexType } from "./interface/type";
import style from "./index.less";
import { memo, useRef } from "react";
import type { ComponentSchema } from "@/package/common";
import produce from "immer";
import { dslEngine, noder } from "@/core/DSL/container";
import { useMemo } from "react";
import type { DSLRender } from "@/package/dslRender";
import h from "hyperscript";

import { useCallback } from "react";
import { useState } from "react";

export const Render: FlexType = memo(
  ({
    style: propStyle,
    total,
    dragID,
    children,
    root,
    setTree,
    node,
    editNodeID,
    setEditingInfo
  }) => {
    const [hoverID, setHoverID] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    const [{ isOverHovering }, drop] = useDrop({
      accept: "ComponentSource", // 接受添加组件的请求
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
          isHovering: monitor.isOver(),
          isOverHovering: monitor.isOver({ shallow: true })
        };
      },
      drop(item: any, monitor) {
        if (monitor.didDrop()) return;
        const schema = item.schema as ComponentSchema;
        setTree(
          produce((draft: any) => {
            const parent = noder.getNode(draft, node.id);
            if (parent) noder.appendChild(parent, noder.fromSchema(schema));
          })
        );
      }
    });
    drop(ref);
    const handleClick = useCallback(
      (_node: Node, e: Event) => {
        setEditingInfo((prev: any) => ({ ...prev, nodeID: _node.id }));
        e.stopPropagation();
      },
      [setEditingInfo]
    );
    const handleMouseEnter = (nodeID: string) => {
      setHoverID(nodeID);
    };
    const handleMouseLeave = () => {
      setHoverID("");
    };
    const nodes = useMemo(() => {
      if (!children.length) return <div>请添加元素</div>;
      return children.length <= total ? (
        children.map((item: Node, index: number) => {
          const { name, type, val, ...config } = item;
          return (
            <DynamicEngine
              componentType={type}
              name={name}
              key={index}
              {...commonInject(item, root, setTree, editNodeID, setEditingInfo)}
              {...config}
              onClick={(e: Event) => handleClick(item, e)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave()}
              className={editNodeID === item.id ? style.mouseHovered : ""}
            />
          );
        })
      ) : (
        <div>超过数量限制</div>
      );
    }, [children, handleClick, root, setEditingInfo, setTree, total]);

    return (
      <div
        ref={ref}
        className={isOverHovering ? style.hovered : null}
        style={
          dragID === "root"
            ? {
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }
            : {
                display: "flex",
                justifyContent: "center",
                ...propStyle
              }
        }
      >
        {nodes}
      </div>
    );
  }
);

export const HTMLRender: DSLRender = ({ node }) => {
  const childrenContent = node.children.map((item) => {
    return dslEngine.Node2Code(item, "HTML");
  });
  const dom = h("div", {}, [...childrenContent]);
  return dom;
};
