import { PropEditorType } from "@/package/common";
import { FC } from "react";

export const PropEditor: FC<PropEditorType> = ({ value, setValue, node }) => {
  return <div>当前style:{JSON.stringify(node.style)}</div>;
};
