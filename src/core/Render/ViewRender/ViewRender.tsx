import type { FC } from "react";
import { useRef } from "react";
import { memo } from "react";
import { useDrop } from "react-dnd";
import type { ViewRenderProps } from "./interface/viewRenderProps";
import "./index.less";
import produce from "immer";
import { noder } from "@/core/DSL/container";
import type { ComponentSchema } from "@/package/common";
import { NodesViewer } from "./components/NodesViewer/NodesViewer";

const ViewRender: FC<ViewRenderProps> = ({
  root,
  style,
  setTree,
  setEditingInfo,
  editingInfo
}) => {
  const ref = useRef(null);
  const [{ isOverHovering }, drop] = useDrop({
    accept: "ComponentSource", // 接受添加组件的请求
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHovering: monitor.isOver(),
        isOverHovering: monitor.isOver({ shallow: true })
      };
    },
    drop(item: any, monitor) {
      if (monitor.didDrop()) return;
      const schema = item.schema as ComponentSchema;
      if (setTree) {
        const newNode = noder.fromSchema(schema);
        setTree(
          produce((draft: any) => {
            noder.appendChild(draft, newNode);
          })
        );
      }
    }
  });
  drop(ref);

  return root ? (
    <div ref={ref} style={style} className={isOverHovering ? "hovered" : ""}>
      <NodesViewer
        root={root}
        setTree={setTree}
        setEditingInfo={setEditingInfo}
        editNodeID={editingInfo.nodeID}
      />
    </div>
  ) : null;
};
export default memo(ViewRender);
