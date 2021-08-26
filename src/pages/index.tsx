/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { componentType } from "@/constants/componentType";
import type { Node } from "@/core/DSL/interface/node";
import { ViewRender } from "@/core/Render/ViewRender/ViewRender";

import { useEffect } from "react";
import { useMemo } from "react";

import { useState } from "react";
import { useDeepCompareEffect } from "react-use";

import { root } from "./root";

const _ = require("lodash/core");

const useNode = <T extends Record<string, any>>(
  node: Node,
  updateFn: any,
  config: T
) => {
  const [ref, setRef] = useState<Node>(node);

  const setter = (fn: (newNode: Node) => any) => {
    const newState = fn(ref);

    setRef((prev) => ({ ...newState }));
    if (typeof updateFn === "function") updateFn({ ...newState, ...config }); // 父组件刷新
  };
  const myUpdateFn = (newState: Node) => {
    setRef((prev) => {
      const { children, ...others } = prev;
      return {
        ...others,
        children: children.map((item) => {
          if (newState.val === item.val) {
            return newState;
          }
          return item;
        })
      };
    });
  };
  return [{ ...ref, ...config }, setter, myUpdateFn] as [
    Node,
    React.Dispatch<React.SetStateAction<Node>>,
    any
  ];
};
interface RootConfig {
  onDrop: (source: Node, target: Node) => any;
}
const newFlex: Node = {
  name: "flex",
  type: componentType.Layout,
  val: "子flex",
  children: [
    {
      name: "Button",
      type: componentType.Base,
      val: "test",
      children: [],
      dragID: "button"
    }
  ],
  dragID: "newFlex",
  total: 10,
  style: { margin: "10px" }
};

const IndexPage = () => {
  const [_root, setRoot, updateFn] = useNode<RootConfig>(root, null, {
    onDrop: (x, y) => {
      setRoot((prev) => {
        return { ...prev, children: [...prev.children, ...prev.children] };
      });
    }
  });

  const [newNode, setNewNode] = useNode<RootConfig>(newFlex, updateFn, {
    onDrop: (s, t) => {
      setNewNode((prev) => {
        return { ...prev, children: [...prev.children, ...prev.children] };
      });
    }
  });

  useEffect(() => {
    setRoot((prev) => {
      return { ...prev, children: [newNode] };
    });
  }, []);
  // useDeepCompareEffect(() => {
  //   console.log("更新了", _root);
  // }, [_root.children[0]]);
  return <ViewRender root={_root} style={{ width: "80vw" }} />;
};

export default IndexPage;
