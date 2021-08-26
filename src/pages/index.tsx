/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { componentType } from "@/constants/componentType";
import type { Node } from "@/core/DSL/interface/node";

import { injectNode, ViewRender } from "@/core/Render/ViewRender/ViewRender";
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
