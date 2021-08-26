import { DragableItem } from "@/core/DragableItem/DragableItem";
import type { Node } from "@/core/DSL/interface/node";
import DynamicEngine from "@/core/Dynamic/Dynamic";
import type { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { ViewRenderProps } from "./interface/type";

// 没有检测ViewRender是否根据子节点的不同更新了
export const ViewRender: FC<ViewRenderProps> = ({
  root,
  handleOnDrop,
  style
}) => {
  console.log("直接打印node", root);
  const getNodes = (node: Node) => {
    const { type, name, children, index, ...config } = node;
    console.log("getNode里面", node);
    return (
      <>
        <DragableItem
          index={index}
          style={{ marginBottom: "10px" }}
          node={node}
          onDrop={handleOnDrop}
        >
          <DynamicEngine
            componentType={type}
            name={name}
            children={children}
            {...config}
          />
        </DragableItem>
      </>
    );
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={style}> {getNodes(root)}</div>
    </DndProvider>
  );
};
