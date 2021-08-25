import type { FC } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { DragableItemProps } from "./interface/type";

export const DragableItem: FC<DragableItemProps> = ({
  index,
  children,
  style
}) => {
  const ref = useRef(null);
  const [{ isHovering }, drop] = useDrop({
    accept: "DragableItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHovering: monitor.isOver()
      };
    },
    drop(item: any, monitor) {
      console.log(monitor.getDropResult());
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "DragableItem",
    item: { index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(drop(ref));
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};
