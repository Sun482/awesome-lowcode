import { Form, Input } from "antd";
import { noder } from "@/core/DSL/container";
import type { Node } from "@/core/DSL/interface/node";

import type { FC } from "react";
import { Package } from "@/package/schema";
import type { componentPathType } from "@/constants/componentType";
import { componentPathObj } from "@/constants/componentType";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useMemo } from "react";
import { memo } from "react";
import produce from "immer";

interface ComponentPropInterface {
  root: Node;
  setTree: any;
  editingNodeID: string;
}
export const ComponentProp: FC<ComponentPropInterface> = memo(
  ({ editingNodeID, root, setTree }) => {
    const [formHook] = useForm();
    const editingNode = useMemo(
      () => noder.getNode(root, editingNodeID),
      [editingNodeID, root]
    );
    const componentType = useMemo(
      () =>
        editingNode &&
        (Object.keys(componentPathObj)[editingNode.type] as componentPathType),
      [editingNode]
    );
    const nodeSchema = useMemo(
      () => componentType && Package[componentType],
      [componentType]
    );
    const editableProp = useMemo(
      () =>
        nodeSchema?.map((item) => {
          if (item.name === editingNode?.name) {
            return Object.keys(item.editableProp);
          }
          return null;
        })[0],
      [editingNode?.name, nodeSchema]
    );
    const handleOnChange = (propName: string, value: string) => {
      if (setTree) {
        setTree(
          produce((draft: any) => {
            const node = noder.getNode(draft, editingNodeID);
            if (node) node[propName] = value;
          })
        );
      }
    };
    useEffect(() => {
      if (editableProp && editingNode) {
        const info = {};
        // eslint-disable-next-line array-callback-return
        editableProp.map((prop) => {
          Object.assign(info, { [prop]: editingNode[prop] });
        });
        formHook.setFieldsValue(info);
      }
    }, [editableProp, editingNode, formHook]);

    return (
      <div style={{ padding: "10px" }}>
        <Form form={formHook}>
          {editableProp?.map((item) => {
            return (
              <Form.Item name={item} label={item}>
                <Input onChange={(e) => handleOnChange(item, e.target.value)} />
              </Form.Item>
            );
          })}
        </Form>
      </div>
    );
  }
);
