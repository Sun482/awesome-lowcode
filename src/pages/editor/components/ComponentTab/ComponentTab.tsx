/* eslint-disable react/no-array-index-key */

import { Node } from "@/core/DSL/interface/node";
import type { ComponentSchema } from "@/package/common";
import type { PackageItem } from "@/package/schema";
import { Package } from "@/package/schema";
import { TreeView } from "@/pages/tree";
import { Card, Tabs } from "antd";
import { FC, useRef } from "react";
import { useDrag } from "react-dnd";

const { TabPane } = Tabs;
interface ComponentSourceProps {
  schema: ComponentSchema;
}
const ComponentSource: FC<ComponentSourceProps> = ({ schema }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "ComponentSource",
    item: { schema },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  drag(ref);
  return (
    <div ref={ref}>
      <Card
        style={isDragging ? { opacity: "0.6" } : {}}
      >{`${schema.name} ( ${schema.alia} )`}</Card>
    </div>
  );
};
interface ComponentTabProps {
  root: Node;
}
export const ComponentTab: FC<ComponentTabProps> = ({ root }) => {
  const packageItems = Object.keys(Package) as PackageItem[];
  return (
    <Tabs tabPosition="left">
      {packageItems.map((item, index) => {
        return (
          <TabPane tab={item} key={index}>
            {Package[item].map((schema, key) => {
              return <ComponentSource key={key} schema={schema} />;
            })}
          </TabPane>
        );
      })}
      <TabPane tab={"TreeData"}>
        <TreeView root={root} />
      </TabPane>
    </Tabs>
  );
};
