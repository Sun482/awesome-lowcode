import { warn } from "@/utils/logger";
import { Button } from "antd";
import { useEffect } from "react";
import { ButtonType } from "./interface/type";

export const Render: ButtonType = ({ text, onClick, children }) => {
  useEffect(() => {
    if (children.length) {
      warn("Lowcode:Button组件不支持子组件！");
    }
  }, [children.length]);
  return <Button onClick={onClick}>{text || "请输入文本"}</Button>;
};
