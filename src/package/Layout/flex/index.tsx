import type { Node } from "@/core/DSL/interface/node";
import DynamicEngine from "@/core/Dynamic/Dynamic";
import { commonInject } from "@/core/Render/ViewRender/utils/injectNode";
import { useMemo } from "react";

import { memo, useRef } from "react";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from "./index.less";
import type { FlexItemType, FlexType } from "./interface/type";

const FlexItem: FlexItemType = memo(({ children, dragID, node, onDrop }) => {
  const ref = useRef(null);
  const [{ isHovering }, drop] = useDrop({
    accept: dragID,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHovering: monitor.isOver()
      };
    },
    drop(item: any) {
      onDrop(item.node, node);
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: dragID,
    item: { node },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(drop(ref));
  return (
    <div ref={ref} className={isHovering ? style.hovered : null}>
      {children}
    </div>
  );
});
export const Render: FlexType = ({
  style: propStyle,
  setChildren,
  total,
  dragID,
  children,
  onDrop,
  root,
  setTree
}) => {
  const nodes = useMemo(() => {
    return children.length <= total ? (
      children.map((item: Node, index: number) => {
        const { name, type, val, ...config } = item;
        return item ? (
          <FlexItem
            total={total}
            index={index}
            setChildren={setChildren}
            dragID={dragID}
            key={String(item.id)}
            {...commonInject(item, root, setTree)}
            onDrop={onDrop}
          >
            <DynamicEngine
              componentType={type}
              name={name}
              {...commonInject(item, root, setTree)}
              {...config}
            />
          </FlexItem>
        ) : null;
      })
    ) : (
      <div>超过数量限制</div>
    );
  }, [children, dragID, onDrop, root, setChildren, setTree, total]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          ...propStyle
        }}
      >
        {nodes}
      </div>
    </DndProvider>
  );
};
