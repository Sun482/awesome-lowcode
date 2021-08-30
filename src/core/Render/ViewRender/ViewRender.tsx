import { DragableItem } from "@/core/DragableItem/DragableItem";

import DynamicEngine from "@/core/Dynamic/Dynamic";
import type { FC } from "react";
import { useMemo } from "react";
import { memo } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { ViewRenderProps } from "./interface/type";
import { commonInject } from "./utils/injectNode";

const ViewRender: FC<ViewRenderProps> = ({
  root,
  handleOnDrop,
  style,
  setTree,
  onClick
}) => {
  const Nodes = useMemo(() => {
    const node = root;
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
  }, [handleOnDrop, onClick, root, setTree]);

  return root ? (
    <DndProvider backend={HTML5Backend}>
      <div style={style}> {Nodes}</div>
    </DndProvider>
  ) : null;
};
export default memo(ViewRender);
