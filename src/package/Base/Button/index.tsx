/* eslint-disable no-underscore-dangle */
import { componentType } from "@/constants/componentType";
import container from "@/core/DSL/container";
import { IDENTIFIERS } from "@/core/DSL/container/identifiers";
import type { Node, NodeUtil } from "@/core/DSL/interface/node";
import { injectNode } from "@/core/Render/ViewRender/utils/injectNode";
import { sonButton } from "@/store/tree";
import { Button } from "antd";
import produce from "immer";
import { useRef } from "react";
import { useMemo } from "react";

import type { ButtonType } from "./interface/type";

// todo
// 这里的useDidShow未能生效
const useDidShow = (callback: any) => {
  const ref = useRef<number>(0);

  if (ref.current === 0) {
    ref.current += 1;
    callback();
  }
};
export const Render: ButtonType = ({ text, onClick, setTree }) => {
  const noder = useMemo(() => {
    return container.get<NodeUtil>(IDENTIFIERS.NodeUtil);
  }, []);
  useDidShow(() => {});

  return (
    <Button
      onClick={(e) => {
        setTree(
          produce((draft: Node) => {
            noder.appendChild(draft, {
              name: "Button",
              type: componentType.Base,
              val: "sonButton",
              children: [],
              dragID: "sonButton",
              id: Symbol("Button#2")
            });
          })
        );
        if (onClick) onClick(e);
      }}
    >
      {text || "请输入文本"}
    </Button>
  );
};
