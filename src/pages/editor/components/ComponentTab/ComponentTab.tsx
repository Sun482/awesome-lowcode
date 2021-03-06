/* eslint-disable react/no-array-index-key */

import { Node } from "@/core/DSL/interface/node";
import type { ComponentSchema } from "@/package/common";
import type { PackageItem } from "@/package/schema";
import { Package } from "@/package/schema";
import { TreeView } from "@/pages/tree";
import { editingInfo } from "@/store/node";

import { Card, Tabs } from "antd";
import type { FC } from "react";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { useSetRecoilState } from "recoil";

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
  visible: boolean;
}
export const ComponentTab: FC<ComponentTabProps> = ({ root, visible }) => {
  const setEditInfo = useSetRecoilState(editingInfo);
  const packageItems = Object.keys(Package) as PackageItem[];
  return visible ? (
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
        <TreeView root={root} setEditingInfo={setEditInfo} />
      </TabPane>
    </Tabs>
  ) : null;
};
