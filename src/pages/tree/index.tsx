import type { Node } from "@/core/DSL/interface/node";
import { Tree } from "antd";
import { DataNode } from "antd/lib/tree";
import type { FC } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

interface TreeViewProps {
  root: Node;
}
const fn = (node: any) => {
  const children = node.children.length
    ? node.children.map((item: any) => fn(item))
    : undefined;
  return { key: String(node.id), title: String(node.id), children };
};
export const TreeView: FC<TreeViewProps> = ({ root }) => {
  const generate = useMemo(() => {
    return [fn(root)];
  }, [root]);

  return <Tree treeData={generate} />;
};
