/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Node } from "@/core/DSL/interface/node";
import { useMemo } from "react";
import type { FC } from "react";
import DynamicEngine from "../../../../Dynamic/Dynamic";

import { DragItem } from "../DragItem/DragItem";
import produce from "immer";

import { commonInject } from "../../utils/injectNode";
import type { EditingInfo } from "@/store/node";
import type { SetterOrUpdater } from "recoil";

interface NodesViewerProps {
  root: Node;
  setTree: any;
  setEditingInfo: SetterOrUpdater<EditingInfo>;
  editNodeID: string;
}
export const NodesViewer: FC<NodesViewerProps> = ({
  root,
  setTree,
  setEditingInfo,
  editNodeID
}) => {
  const nodes = useMemo(() => {
    return root.children;
  }, [root]);
  const moveItem = useMemo(() => {
    return (sourceID: number, targetID: number) => {
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
  }, [setTree]);
  const handleClick = (nodeID: string) => {
    if (nodeID !== editNodeID)
      setEditingInfo((prev: EditingInfo) => {
        return { ...prev, nodeID };
      });
    else {
      setEditingInfo((prev: EditingInfo) => {
        return { ...prev, nodeID: "" };
      });
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
            onClick={() => handleClick(item.id)}
            editNodeID={editNodeID}
          >
            <DynamicEngine
              componentType={type}
              name={name}
              children={children}
              {...commonInject(item, root, setTree, editNodeID, setEditingInfo)}
              {...config}
            />
          </DragItem>
        );
      })}
    </div>
  );
};
