import { useCallback } from "react";
import type { Node } from "@/core/DSL/interface/node";
import { Tree } from "antd";
import type { FC } from "react";
import { useMemo } from "react";

interface TreeViewProps {
  root: Node;
  setEditingInfo: any;
}
const fn = (node: any) => {
  const children = node.children.length
    ? node.children.map((item: any) => fn(item))
    : undefined;
  return { key: String(node.id), title: String(node.id), children };
};
export const TreeView: FC<TreeViewProps> = ({ root, setEditingInfo }) => {
  const generate = useMemo(() => {
    return [fn(root)];
  }, [root]);
  const handleSelect = useCallback((nodeIDArr: string[]) => {
    const nodeID = nodeIDArr[0];
    if (typeof setEditingInfo === "function") {
      setEditingInfo((prev: any) => ({
        ...prev,
        nodeID
      }));
    }
  }, []);
  return <Tree treeData={generate} onSelect={handleSelect} />;
};
