/* eslint-disable no-underscore-dangle */

import { Button } from "antd";
import { memo } from "react";
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
