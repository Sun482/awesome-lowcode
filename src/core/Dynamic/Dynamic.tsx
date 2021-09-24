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

  if (comUtils.hasRender(path)) {
    const Render = comUtils.getRender(path);
    return () => (Render ? <Render {...config} /> : null);
  }

  // 如果组件未加载
  // 则动态导入
  return dynamic({
    async loader() {
      const { Render } = await import(`@/package/${path}`);
      // 保存Render
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
  [key: string]: any;
};

const DynamicEngine = <T extends DynamicType>(props: T) => {
  const { componentType: type, name, ...config } = props;

  const Dynamic = useMemo(() => {
    return DynamicFunc(type, name, config) as FC<T>;
  }, [config, name, type]);

  return <Dynamic {...props} />;
};

export default memo(DynamicEngine);
