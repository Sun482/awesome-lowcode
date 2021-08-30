/* eslint-disable no-underscore-dangle */
import { componentType } from "@/constants/componentType";
import { noder } from "@/core/DSL/container";
import type { Node } from "@/core/DSL/interface/node";

import { useDidShow } from "@/core/Hook/useDidShow";
import { Button } from "antd";
import produce from "immer";
import { memo } from "react";
import type { ButtonType } from "./interface/type";

export const Render: ButtonType = memo(({ text, onClick, setTree, node }) => {
  useDidShow(() => {
    if (text === "勿忘我")
      setTree(
        produce((draft: Node) => {
          noder.appendChild(draft, {
            name: "Button",
            type: componentType.Base,
            val: "sonButton",
            children: [],
            dragID: "sonButton",
            id: "Button#3"
          });
        })
      );
  }, node.id);
  return (
    <Button
      onClick={(e) => {
        setTree(
          produce((draft: Node) => {
            const _this = noder.getNode(draft, node.id);
            _this.text = `${new Date().toISOString()}`;
          })
        );
        if (onClick) onClick(e);
      }}
    >
      {text || "请输入文本"}
    </Button>
  );
});
