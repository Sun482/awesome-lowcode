/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { componentType } from "@/constants/componentType";
import type { Node } from "@/core/DSL/interface/node";
import { injectNode } from "@/core/Render/ViewRender/utils/injectNode";

import { ViewRender } from "@/core/Render/ViewRender/ViewRender";
import { ButtonInject } from "@/package/Base/Button/interface/inject";
import type { onDropInject } from "@/package/Layout/flex/interface/inject";
import { DataTree } from "@/store/tree";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import { RecoilRoot, useRecoilState } from "recoil";

const IndexPage = () => {
  const [tree, setTree] = useRecoilState(DataTree);
  const handleOnDrop = (source: Node, target: Node) => {
    console.log(`from ${String(source.id)} to ${String(target.id)}`);
    setTree((prev) => {
      return {
        ...prev,
        children: [
          ...prev.children,
          injectNode<ButtonInject>(
            {
              name: "Button",
              type: componentType.Base,
              children: [],
              id: Symbol("inject#1")
            },
            { text: "inject" }
          )
        ]
      };
    });
  };
  // useEffect(() => {
  //   setTree((prev) => {
  //     return {
  //       ...prev,
  //       children: [
  //         injectNode<onDropInject>(sonFlex, {
  //           onDrop: handleOnDrop
  //         })
  //       ]
  //     };
  //   });
  // }, []);
  const root = useMemo(() => {
    console.log("改变了");
    return injectNode<onDropInject>(tree, {
      onDrop: handleOnDrop
    });
  }, [tree]);
  return <ViewRender root={root} handleOnDrop={handleOnDrop} />;
};
const App = () => {
  return (
    <RecoilRoot>
      <IndexPage />
    </RecoilRoot>
  );
};

export default App;
