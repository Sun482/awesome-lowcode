import type { FC } from "react";
import { memo } from "react";
import type { componentType } from "@/constants/componentType";

import { useMemo } from "react";
import Loading from "@/components/Loading";

import { dynamic } from "umi";
import type { Node } from "../DSL/interface/node";
import { comUtils } from "../DSL/container";

const DynamicFunc = (type: componentType, name: string, config: any) => {
  const path = comUtils.getComponentPath(type, name);
  if (!comUtils.beShown(config.node.id)) {
    comUtils.setShown(config.node.id, false);
  }

  // 如果已经加载了组件
  // 则直接使用
  if (comUtils.hasRender(path)) {
    const Render = comUtils.getRender(path);
    return () => {
      return Render ? <Render {...config} /> : null;
    };
  }

  // 如果组件未加载
  // 则动态导入
  return dynamic({
    async loader() {
      const { Render } = await import(`@/package/${path}`);
      comUtils.setRender(path, Render);
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
