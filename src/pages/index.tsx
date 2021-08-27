/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */

import container from "@/core/DSL/container";
import { IDENTIFIERS } from "@/core/DSL/container/identifiers";
import type { Node, NodeUtil } from "@/core/DSL/interface/node";
import { injectNode } from "@/core/Render/ViewRender/utils/injectNode";

import { ViewRender } from "@/core/Render/ViewRender/ViewRender";

import type { onDropInject } from "@/package/Layout/flex/interface/inject";
import { DataTree } from "@/store/tree";
import produce from "immer";
import { useMemo } from "react";
import { useState } from "react";

const IndexPage = () => {
  const [tree, setTree] = useState<Node>(DataTree);
  const noder = useMemo(
    () => container.get<NodeUtil>(IDENTIFIERS.NodeUtil),
    []
  );
  const handleOnDrop = (source: Node, target: Node) => {
    setTree(
      produce((draft) => {
        const _source = noder.getNode(draft, source.id);
        if (_source) noder.appendChild(_source, target);
      })
    );
  };

  const root = useMemo(() => {
    console.log("改变了");
    return injectNode<onDropInject>(tree, {
      onDrop: handleOnDrop
    });
  }, [tree]);
  return <ViewRender root={root} handleOnDrop={handleOnDrop} />;
};
const App = () => {
  return <IndexPage />;
};

export default App;
