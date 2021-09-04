/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Node } from "@/core/DSL/interface/node";
import { useMemo } from "react";
import type { FC } from "react";
import DynamicEngine from "../../../../Dynamic/Dynamic";
import React from "react";
import { DragItem } from "../DragItem/DragItem";
import produce from "immer";

interface NodesViewerProps {
  root: Node;
  setTree: any;
}
export const NodesViewer: FC<NodesViewerProps> = ({ root, setTree }) => {
  const nodes = useMemo(() => {
    return root.children;
  }, [root]);
  const moveItem = (sourceID: number, targetID: number) => {
    if (sourceID !== undefined && targetID !== undefined) {
      setTree(
        produce((draft: Node) => {
          const prev = [...draft.children];
          const tmp = prev[sourceID];
          prev[sourceID] = prev[targetID];
          prev[targetID] = tmp;
          // eslint-disable-next-line no-param-reassign
          draft.children = prev;
        })
      );
    }
  };
  return (
    <div>
      {nodes.map((item, index) => {
        const { type, name, children, ...config } = item;

        return (
          <DragItem
            moveItem={moveItem}
            index={index}
            node={item}
            dragID={"rootDrag"}
            onDrop={() => {}}
            key={index}
          >
            <DynamicEngine
              componentType={type}
              name={name}
              children={children}
              {...config}
            />
          </DragItem>
        );
      })}
    </div>
  );
};
