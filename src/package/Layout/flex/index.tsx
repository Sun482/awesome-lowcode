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
import { noder } from "@/core/DSL/container";
import { useMemo } from "react";
import type { DSLRender } from "@/package/dslRender";

export const Render: FlexType = memo(
  ({ style: propStyle, total, dragID, children, root, setTree, node }) => {
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
              {...commonInject(item, root, setTree)}
              {...config}
            />
          );
        })
      ) : (
        <div>超过数量限制</div>
      );
    }, [children, root, setTree, total]);

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
  return `
  <div>
    this is a ${node.name}
  </div>
  `;
};
