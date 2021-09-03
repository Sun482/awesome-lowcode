import type { Node } from "@/core/DSL/interface/node";
import DynamicEngine from "@/core/Dynamic/Dynamic";
import { commonInject } from "@/core/Render/ViewRender/utils/injectNode";

import produce from "immer";
import { useMemo } from "react";

import { memo, useRef } from "react";

import type { DropTargetMonitor, XYCoord } from "react-dnd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from "./index.less";
import type { FlexItemProps, FlexItemType, FlexType } from "./interface/type";

import { useCallback } from "@umijs/renderer-react/node_modules/@types/react";

const FlexItem: FlexItemType = memo(
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
  }
);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveItem = (sourceID: number, targetID: number) => {
    if (sourceID !== undefined && targetID !== undefined) {
      setTree(
        produce((draft: Node) => {
          const prev = [...draft.children];
          const tmp = prev[sourceID];
          prev[sourceID] = prev[targetID];
          prev[targetID] = tmp;
          // eslint-disable-next-line no-param-reassign
          draft.children = prev;
        })
      );
    }
  };
  const nodes = useMemo(() => {
    if (!children.length) return <div>请添加元素</div>;
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
            moveItem={moveItem}
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
  }, [children, dragID, moveItem, onDrop, root, setChildren, setTree, total]);

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
        {nodes}
      </div>
    </DndProvider>
  );
};
