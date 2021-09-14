/* eslint-disable no-underscore-dangle */

import type { DSLRender } from "@/package/dslRender";
import { Button } from "antd";
import { memo } from "react";
import HyperScript from "hyperscript";
import type { ButtonType } from "./interface/type";

export const Render: ButtonType = memo(({ text, onClick }) => {
  return (
    <Button
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      {text || "请输入文本"}
    </Button>
  );
});
export const HTMLRender: DSLRender = ({ node }) => {
  return `<button>${node.id}<button>`;
};
