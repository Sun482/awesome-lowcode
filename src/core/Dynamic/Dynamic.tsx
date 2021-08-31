import type { FC } from "react";
import { memo } from "react";
import type { componentType } from "@/constants/componentType";
import { useMemo } from "react";
import Loading from "@/components/Loading";

import { getComponentPath } from "@/constants/componentType";
import { dynamic } from "umi";
import type { Node } from "../DSL/interface/node";
import { comUtils } from "../Render/ViewRender/container";

export const map = new Map<string, any>();

const DynamicFunc = (type: componentType, name: string, config: any) => {
  const path = getComponentPath(type, name);
  // 如果已经加载了组件
  // 则直接使用
  if (!comUtils.beShown(config.node.id)) {
    comUtils.initializeComponent(config.node);
  }
  if (map.has(`@/package/${path}`)) {
    const Render = map.get(`@/package/${path}`);
    return () => {
      return <Render {...config} />;
    };
  }

  // 如果组件未加载
  // 则动态导入
  return dynamic({
    async loader() {
      const { Render } = await import(`@/package/${path}`);
      map.set(`@/package/${path}`, Render);
      return () => {
        return <Render {...config} />;
      };
    },
    loading: () => (
      <div style={{ paddingTop: 10, textAlign: "center" }}>
        <Loading />
      </div>
    )
  });
};
type DynamicType = {
  componentType: componentType;
  name: string;
  children: Node[];
};

const DynamicEngine = <T extends DynamicType>(props: T) => {
  const { componentType: type, name, ...config } = props;

  const Dynamic = useMemo(() => {
    return DynamicFunc(type, name, config) as FC<T>;
  }, [type, name, config]);

  return <Dynamic {...props} />;
};

export default memo(DynamicEngine);
