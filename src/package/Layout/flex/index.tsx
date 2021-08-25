import type { Node } from "@/core/DSL/interface/node";
import DynamicEngine from "@/core/Dynamic/Dynamic";

import { useRef } from "react";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from "./index.less";
import type { FlexItemType, FlexType } from "./interface/type";

const FlexItem: FlexItemType = ({ index, setChildren, children, dragID }) => {
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
      setChildren((prev: any) => {
        return [...prev, prev[item.index]];
      });
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: dragID,
    item: { index },
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
};
export const Render: FlexType = ({
  style: propStyle,
  setChildren,
  total,
  dragID,
  children
}) => {
  const processNode = (node: Node, index: number, _dragID: string) => {
    const { name, type, val, ...config } = node;
    return node ? (
      <FlexItem
        total={total}
        index={index}
        setChildren={setChildren}
        dragID={_dragID}
        key={index}
      >
        <DynamicEngine
          componentType={type}
          name={name}
          item={val}
          key={index}
          {...config}
        />
      </FlexItem>
    ) : null;
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          ...propStyle
        }}
      >
        {children.length <= total ? (
          children.map((item: Node, index: number) => {
            return processNode(item, index, dragID);
          })
        ) : (
          <div>超过数量限制</div>
        )}
      </div>
    </DndProvider>
  );
};
