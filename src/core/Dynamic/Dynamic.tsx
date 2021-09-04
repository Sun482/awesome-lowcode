import type { FC } from "react";
import { memo } from "react";
import type { componentType } from "@/constants/componentType";

import { useMemo } from "react";
import Loading from "@/components/Loading";

import { dynamic } from "umi";
import type { Node } from "../DSL/interface/node";
import { comUtils } from "../DSL/container";
import { notification } from "antd";
import { useEffect } from "react";

const DynamicFunc = (type: componentType, name: string, config: any) => {
  const path = comUtils.getComponentPath(type, name);

  const nodeID = config.id;

  if (comUtils.hasInstance(nodeID)) {
    const Instance: FC<any> = comUtils.getInstance(nodeID);
    notification.success({ message: `${nodeID}实例读取成功` });
    return () => {
      return Instance ? <Instance {...config} /> : null;
    };
  }
  if (comUtils.hasRender(path)) {
    notification.success({ message: `${nodeID}Render读取成功` });
    const Render = comUtils.getRender(path);
    const Instance = (props: any) => {
      return Render ? <Render {...props} /> : null;
    };
    comUtils.setInstance(nodeID, Instance);
    return () => {
      return <Instance {...config} />;
    };
  }

  // 如果组件未加载
  // 则动态导入
  return dynamic({
    async loader() {
      const { Render } = await import(`@/package/${path}`);

      const Instance = (props: any) => {
        return <Render {...props} />;
      };
      comUtils.setRender(path, Render);
      comUtils.setInstance(nodeID, Instance);
      return () => {
        return <Instance {...config} />;
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
  console.log(props);
  const Dynamic = useMemo(() => {
    return DynamicFunc(type, name, config) as FC<T>;
  }, [config, name, type]);

  return <Dynamic {...props} />;
};

export default memo(DynamicEngine);
