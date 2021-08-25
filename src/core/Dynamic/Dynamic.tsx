import type { FC } from "react";
import type { componentType } from "@/constants/componentType";
import { useMemo } from "react";
import Loading from "@/components/Loading";

import { getComponentPath } from "@/constants/componentType";
import { dynamic } from "umi";

const DynamicFunc = (type: componentType, name: string, config: any) => {
  const path = getComponentPath(type, name);
  return dynamic({
    async loader() {
      // 组件动态导入
      const { Render } = await import(`@/package/${path}`);
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
};

const DynamicEngine = <T extends DynamicType>(props: T) => {
  const { componentType: type, name, ...config } = props;

  const Dynamic = useMemo(() => {
    return DynamicFunc(type, name, config) as FC<T>;
  }, [type, name, config]);

  return <Dynamic {...props} />;
};

export default DynamicEngine;
