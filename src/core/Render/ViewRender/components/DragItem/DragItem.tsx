import type { FlexItemProps } from "@/package/Layout/Flex/interface/type";
import { useMemo } from "react";
import { FC, memo, useRef } from "react";
import type { DropTargetMonitor, XYCoord } from "react-dnd";
import { useDrop, useDrag } from "react-dnd";
import style from "./index.less";

interface DragItemProps {
  moveItem: any;
  index: number;
  onDrop: any;
  node: any;
  dragID: string;
}
export const DragItem: FC<DragItemProps> = memo(
  ({ children, dragID, node, onDrop, index, moveItem }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isHovering }, drop] = useDrop<FlexItemProps, any, any>({
      accept: dragID,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
          isHovering: monitor.isOver()
        };
      },
      hover(item: FlexItemProps, monitor: DropTargetMonitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveItem(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        // eslint-disable-next-line no-param-reassign
        item.index = hoverIndex;
      },
      drop(item: any) {
        onDrop(item.node, node);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ isDragging }, drag] = useDrag({
      type: dragID,
      item: { node },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging()
      })
    });
    const Render = useMemo(() => {
      return children;
    }, [children]);
    drag(drop(ref));
    return (
      <div ref={ref} className={isHovering ? style.hovered : null}>
        {Render}
      </div>
    );
  }
);
