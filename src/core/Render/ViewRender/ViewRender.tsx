import { DragableItem } from "@/core/DragableItem/DragableItem";

import DynamicEngine from "@/core/Dynamic/Dynamic";
import type { FC } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { memo } from "react";

import { useDrop } from "react-dnd";

import type { ViewRenderProps } from "./interface/viewRenderProps";
import { commonInject } from "./utils/injectNode";
import "./index.less";

import produce from "immer";
import { noder } from "@/core/DSL/container";
import type { ComponentSchema } from "@/package/common";

const ViewRender: FC<ViewRenderProps> = ({
  root,
  handleOnDrop,
  style,
  setTree,
  onClick
}) => {
  const ref = useRef(null);
  const [{ isHovering }, drop] = useDrop({
    accept: "ComponentSource", // 接受添加组件的请求
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHovering: monitor.isOver()
      };
    },
    drop(item: any) {
      const schema = item.schema as ComponentSchema;
      setTree(
        produce((draft: any) => {
          noder.appendChild(draft, noder.fromSchema(schema));
        })
      );
    }
  });
  drop(ref);
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
    <div ref={ref} style={style} className={isHovering ? "hovered" : ""}>
      {Nodes}
    </div>
  ) : null;
};
export default memo(ViewRender);
