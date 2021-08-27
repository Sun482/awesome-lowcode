/* eslint-disable no-underscore-dangle */
import container from "@/core/DSL/container";
import { IDENTIFIERS } from "@/core/DSL/container/identifiers";
import type { NodeUtil } from "@/core/DSL/interface/node";
import { injectNode } from "@/core/Render/ViewRender/utils/injectNode";
import { sonButton } from "@/store/tree";
import { Button } from "antd";
import produce from "immer";
import { useEffect } from "react";
import { ButtonInject } from "./interface/inject";
import type { ButtonType } from "./interface/type";

export const Render: ButtonType = ({ text, onClick }) => {
  return <Button onClick={onClick}>{text || "请输入文本"}</Button>;
};
