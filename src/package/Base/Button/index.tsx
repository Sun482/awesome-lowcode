/* eslint-disable no-underscore-dangle */

import { noder } from "@/core/DSL/container";
import type { Node } from "@/core/DSL/interface/node";

import { useDidShow } from "@/core/Hook/useDidShow";
import { Button } from "antd";
import produce from "immer";
import { memo } from "react";
import type { ButtonType } from "./interface/type";

export const Render: ButtonType = memo(
  ({ text, onClick, setTree, node, onShow }) => {
    useDidShow(() => {
      if (onShow && typeof onShow === "function") onShow();
    }, node.id);
    return (
      <Button
        onClick={(e) => {
          setTree(
            produce((draft: Node) => {
              const _this = noder.getNode(draft, node.id);
              if (_this) _this.text = `${new Date().toISOString()}`;
            })
          );
          if (onClick) onClick(e);
        }}
      >
        {text || "请输入文本"}
      </Button>
    );
  }
);
