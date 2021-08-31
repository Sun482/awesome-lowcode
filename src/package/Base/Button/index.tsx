/* eslint-disable no-underscore-dangle */

import { useDidShow } from "@/core/Hook";
import { Button } from "antd";
import { memo } from "react";
import type { ButtonType } from "./interface/type";

export const Render: ButtonType = memo(({ text, onClick, node, onShow }) => {
  useDidShow(() => {
    if (onShow && typeof onShow === "function") onShow();
  }, node.id);
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
