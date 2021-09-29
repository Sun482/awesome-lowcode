/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */

import type { Node } from "@/core/DSL/interface/node";
import { injectNode } from "@/core/Render/ViewRender/utils/injectNode";
import type { DraggableEvent, DraggableData } from "react-draggable";
import Draggable from "react-draggable";

import type { onDropInject } from "@/package/Layout/Flex/interface/inject";

import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

import { useMemo, useRef } from "react";
import { useState } from "react";

import ViewRender from "@/core/Render/ViewRender/ViewRender";

import { ComponentTab } from "./components/ComponentTab/ComponentTab";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRecoilState } from "recoil";
import { DataTree } from "@/store/tree";
import { ComponentProp } from "./components/ComponentProp/ComponentProp";
import { LeftSquareOutlined } from "@ant-design/icons";
import { editingInfo } from "@/store/node";

const IndexPage = () => {
  const [tree, setTree] = useRecoilState(DataTree);
  const [editInfo, setEditInfo] = useRecoilState(editingInfo);
  const [dragState, setDragState] = useState({ x: 0, y: 0 });

  const handleOnDrop = useMemo(() => {
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

  const root = useMemo(() => tree, [tree]);
  const [siderVisible, setSiderVisible] = useState(true);
  const [propEditorVisible, setPropEditorVisible] = useState(true);
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout style={{ height: "calc(100vh - 48px)" }}>
        <Sider
          theme="light"
          width={siderVisible ? "320px" : "35px"}
          style={{ padding: "10px" }}
        >
          <ComponentTab root={root} visible={siderVisible} />
          <LeftSquareOutlined
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              transform: siderVisible ? "rotate(0deg)" : "rotate(180deg)"
            }}
            onClick={() => {
              setSiderVisible((prev) => !prev);
            }}
          />
        </Sider>
        <Content style={{ overflow: "hidden" }}>
          <div style={{ display: "flex" }}>
            <div
              onMouseDown={mousedownfn}
              onMouseMove={mousemovefn}
              onMouseUp={mouseupfn}
              onMouseLeave={mouseupfn}
              ref={containerRef}
              style={{
                display: "flex",
                justifyContent: "center",
                flexGrow: 1,
                overflow: "hidden"
              }}
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
                  setEditingInfo={setEditInfo}
                  editingInfo={editInfo}
                  style={{
                    minHeight: "calc(100vh - 48px)",
                    width: "1200px",
                    backgroundColor: "white",
                    boxShadow: "rgb(140 188 236 / 8%) 0px 2px 13px 1px"
                  }}
                />
              </Draggable>
            </div>
            <div
              style={{
                width: propEditorVisible ? "300px" : "35px",
                backgroundColor: "white",
                position: "relative",
                height: "calc(100vh - 48px)"
              }}
            >
              {propEditorVisible ? (
                <ComponentProp
                  setTree={setTree}
                  root={root}
                  editingNodeID={editInfo.nodeID}
                  setEditInfo={setEditInfo}
                />
              ) : null}
              <LeftSquareOutlined
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  transform: propEditorVisible
                    ? "rotate(180deg)"
                    : "rotate(0deg)"
                }}
                onClick={() => {
                  setPropEditorVisible((prev) => !prev);
                }}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </DndProvider>
  );
};
export default function Index() {
  return <IndexPage />;
}
