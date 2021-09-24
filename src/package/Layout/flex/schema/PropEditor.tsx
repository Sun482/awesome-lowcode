import type { PropEditorType } from "@/package/common";
import type { FC } from "react";

export const PropEditor: FC<PropEditorType> = ({ node }) => {
  return <div>当前style:{JSON.stringify(node)}</div>;
};
