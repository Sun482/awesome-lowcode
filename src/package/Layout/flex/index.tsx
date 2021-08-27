import type { Node } from "@/core/DSL/interface/node";
import DynamicEngine from "@/core/Dynamic/Dynamic";
import { commonInject } from "@/core/Render/ViewRender/utils/injectNode";

import { useMemo, useRef } from "react";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from "./index.less";
import type { FlexItemType, FlexType } from "./interface/type";

const FlexItem: FlexItemType = ({ children, dragID, node, onDrop }) => {
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
};
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
  const processNode = useMemo(() => {
    return (node: Node, index: number, _dragID: string) => {
      const { name, type, val, ...config } = node;
      return node ? (
        <FlexItem
          total={total}
          index={index}
          setChildren={setChildren}
          dragID={_dragID}
          key={index}
          {...commonInject(node, root, setTree)}
          onDrop={onDrop}
        >
          <DynamicEngine
            componentType={type}
            name={name}
            item={val}
            key={index}
            {...commonInject(node, root, setTree)}
            {...config}
          />
        </FlexItem>
      ) : null;
    };
  }, [setChildren, total, onDrop, root, setTree]);

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
