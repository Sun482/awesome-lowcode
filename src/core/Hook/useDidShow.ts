import { useEffect } from "react";
import { comUtils } from "../DSL/container";

// 在组件第一次被渲染到画布上时触发回调函数
// id - Node节点的id
export const useDidShow = (callback: any, nodeID: string) => {
  useEffect(() => {
    if (!comUtils.beShown(nodeID)) {
      callback();
      comUtils.setShown(nodeID, true);
    }
  }, []);
};
