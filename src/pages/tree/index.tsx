import { RootNode } from "@/models/tree";
import { Tree } from "antd";
import type { FC } from "react";
import { useMemo } from "react";

interface TreeViewProps {
  root: RootNode;
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
