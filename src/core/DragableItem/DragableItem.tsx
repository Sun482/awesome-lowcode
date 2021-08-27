/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { DragableItemProps } from "./interface/type";
import _style from "./DragableItem.less";

export const DragableItem: FC<DragableItemProps> = ({
  index,
  children,
  style,
  onDrop,
  node
}) => {
  const ref = useRef(null);
  const [{ isHovering }, drop] = useDrop<
    DragableItemProps,
    void,
    Record<any, any>
  >({
    accept: "DragableItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHovering: monitor.isOver()
      };
    },
    drop: (item, monitor) => {
      if (typeof onDrop === "function") onDrop(node, item.node);
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "DragableItem",
    item: { node },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(drop(ref));

  return (
    <div ref={ref} style={style} className={isHovering ? _style.hovered : null}>
      {children}
    </div>
  );
};
