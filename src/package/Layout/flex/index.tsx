/* eslint-disable react/no-array-index-key */
import type { Node } from "@/core/DSL/interface/node";
import DynamicEngine from "@/core/Dynamic/Dynamic";
import { commonInject } from "@/core/Render/ViewRender/utils/injectNode";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import type { FlexType } from "./interface/type";

export const Render: FlexType = ({
  style: propStyle,

  total,
  dragID,
  children,

  root,
  setTree
}) => {
  const nodes = () => {
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
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
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
        {nodes()}
      </div>
    </DndProvider>
  );
};
