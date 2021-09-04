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

const ViewRender: FC<ViewRenderProps> = ({ root, style, setTree }) => {
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

  return root ? (
    <div ref={ref} style={style} className={isHovering ? "hovered" : ""}>
      <NodesViewer root={root} setTree={setTree} />
    </div>
  ) : null;
};
export default memo(ViewRender);
