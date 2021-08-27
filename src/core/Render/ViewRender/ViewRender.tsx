import { DragableItem } from "@/core/DragableItem/DragableItem";
import type { Node } from "@/core/DSL/interface/node";
import DynamicEngine from "@/core/Dynamic/Dynamic";
import type { FC } from "react";
import { useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { ViewRenderProps } from "./interface/type";
import { commonInject } from "./utils/injectNode";

export const ViewRender: FC<ViewRenderProps> = ({
  root,
  handleOnDrop,
  style,
  setTree,
  onClick
}) => {
  const getNodes = useCallback(
    (node: Node) => {
      const { type, name, children, index, ...config } = node;

      return (
        <div onClick={onClick}>
          <DragableItem
            index={index}
            style={{ marginBottom: "10px" }}
            {...commonInject(node, root, setTree)} // ViewRender拖动会用到
            onDrop={handleOnDrop}
          >
            <DynamicEngine
              componentType={type}
              name={name}
              children={children}
              {...commonInject(node, root, setTree)}
              {...config}
            />
          </DragableItem>
        </div>
      );
    },
    [handleOnDrop, onClick, root, setTree]
  );
  return root ? (
    <DndProvider backend={HTML5Backend}>
      <div style={style}> {getNodes(root)}</div>
    </DndProvider>
  ) : null;
};
