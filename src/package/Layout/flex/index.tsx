import { useRef, useState } from "react";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import style from "./index.less";
import type { DragItemType } from "./interface/type";

const DragItem: DragItemType = ({ index, setChildren, total, children }) => {
  const ref = useRef(null);
  const [{ isHovering }, drop] = useDrop({
    accept: "123",
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
    type: "123",
    item: { index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(drop(ref));
  return total <= 5 ? (
    <div ref={ref} className={isHovering ? style.hovered : null}>
      {children}
    </div>
  ) : (
    <div ref={ref}>null</div>
  );
};
export const Render = (props: any) => {
  const [children, setChildren] = useState(props.data.children);
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "1px solid red"
        }}
      >
        {children.map((item, index) => (
          <DragItem
            index={index}
            width="200px"
            total={children.length}
            setChildren={setChildren}
            key={index}
          >
            {item}
          </DragItem>
        ))}
      </div>
    </DndProvider>
  );
};
