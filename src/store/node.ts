import { atom } from "recoil";

export type EditingInfo = {
  nodeID: string; // 正在编辑的节点id
};
export const editingInfo = atom({
  key: "editingInfo",
  default: {
    nodeID: "123"
  } as EditingInfo
});
