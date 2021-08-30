/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */

import type { Node } from "@/core/DSL/interface/node";
import { injectNode } from "@/core/Render/ViewRender/utils/injectNode";
import type { DraggableEvent, DraggableData } from "react-draggable";
import Draggable from "react-draggable";

import type { onDropInject } from "@/package/Layout/flex/interface/inject";
import { DataTree } from "@/store/tree";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

import { useMemo, useRef } from "react";
import { useState } from "react";
import { Card, Tabs } from "antd";
import ViewRender from "@/core/Render/ViewRender/ViewRender";
import { useCallback } from "react";
import { TreeView } from "../tree";

const { TabPane } = Tabs;
const IndexPage = () => {
  const [tree, setTree] = useState<Node>(DataTree);
  const [dragState, setDragState] = useState({ x: 0, y: 0 });
  // const noder = useMemo(
  //   () => container.get<NodeUtil>(IDENTIFIERS.NodeUtil),
  //   []
  // );

  const handleOnDrop = useCallback(() => {
    return (source: Node, target: Node) => {};
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [diffmove, setDiffMove] = useState({
    start: { x: 0, y: 0 },
    move: false
  });
  const mousedownfn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === containerRef.current) {
        setDiffMove({
          start: {
            x: e.clientX,
            y: e.clientY
          },
          move: true
        });
      }
    };
  }, []);

  const mousemovefn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (diffmove.move) {
        const newX = e.clientX;
        const newY = e.clientY;
        const diffx = newX - diffmove.start.x;
        const diffy = newY - diffmove.start.y;
        setDiffMove({
          start: {
            x: newX,
            y: newY
          },
          move: true
        });
        setDragState((prev) => {
          return {
            x: prev.x + diffx,
            y: prev.y + diffy
          };
        });
      }
    };
  }, [diffmove.move, diffmove.start.x, diffmove.start.y]);

  const mouseupfn = useMemo(() => {
    return () => {
      setDiffMove({
        start: { x: 0, y: 0 },
        move: false
      });
    };
  }, []);
  const root = useMemo(() => {
    return injectNode<onDropInject>(tree, {
      onDrop: handleOnDrop
    });
  }, [tree]);
  return (
    <Layout style={{ height: "calc(100vh - 48px)" }}>
      <Sider theme="light" width="350px" style={{ padding: "10px" }}>
        <Tabs tabPosition="left">
          <TabPane tab={"Base"} key={1}>
            Content of tab 1
          </TabPane>
          <TabPane tab={"Layout"} key={2}>
            <TreeView root={root} />
          </TabPane>
        </Tabs>
      </Sider>
      <Content style={{ overflow: "hidden" }}>
        <div
          onMouseDown={mousedownfn}
          onMouseMove={mousemovefn}
          onMouseUp={mouseupfn}
          onMouseLeave={mouseupfn}
          ref={containerRef}
        >
          <Draggable
            position={dragState}
            handle=".js_box"
            onStop={(e: DraggableEvent, data: DraggableData) => {
              setDragState({ x: data.x, y: data.y });
            }}
          >
            <ViewRender
              root={root}
              setTree={setTree}
              handleOnDrop={handleOnDrop}
              style={{
                minHeight: "calc(100vh - 48px)",
                width: "400px",
                backgroundColor: "white",
                boxShadow: "rgb(140 188 236 / 8%) 0px 2px 13px 1px"
              }}
            />
          </Draggable>
        </div>
      </Content>
    </Layout>
  );
};

export default IndexPage;
