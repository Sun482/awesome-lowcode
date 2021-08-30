import { useEffect } from "react";
import { didShowMap } from "../Dynamic/Dynamic";

// 在组件第一次被渲染到画布上时触发回调函数
// id - Node节点的id
export const useDidShow = (callback: any, nodeID: string) => {
  useEffect(() => {
    if (didShowMap.has(nodeID)) {
      if (didShowMap.get(nodeID)) {
        return;
      }
      callback();
      didShowMap.set(nodeID, true);
    }
  }, []);
};
