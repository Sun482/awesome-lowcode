import { Button, Form, Input } from "antd";
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
import { useCallback } from "react";
import "./index.less";
import type { EditingInfo } from "@/store/node";

interface ComponentPropInterface {
  root: Node;
  setTree: any;
  editingNodeID: string;
  setEditInfo: any;
}
export const ComponentProp: FC<ComponentPropInterface> = memo(
  ({ editingNodeID, root, setTree, setEditInfo }) => {
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
          if (item.name === editingNode?.name && item.editableProp) {
            return Object.keys(item.editableProp);
          }
          return null;
        })[0],
      [editingNode?.name, nodeSchema]
    );

    const handleOnChange = useCallback(
      (propName: string, value: string) => {
        if (setTree) {
          setTree(
            produce((draft: any) => {
              const node = noder.getNode(draft, editingNodeID);
              if (node) node[propName] = value;
            })
          );
        }
      },
      [editingNodeID, setTree]
    );
    const handleDeleteNode = (node: Node | null) => {
      if (setTree) {
        setTree(
          produce((draft: any) => {
            if (node) {
              const parentID = noder.getParent(node);
              const parent =
                (parentID && noder.getNode(draft, parentID)) || null;
              if (parent) noder.moveNode(node, parent);
            }
          })
        );
      }
      if (setEditInfo) {
        setEditInfo((prev: EditingInfo) => {
          return { ...prev, nodeID: "" };
        });
      }
    };
    const getPropItem = (propName: string, key: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      const schema = nodeSchema?.map((item) => {
        if (item.name === editingNode?.name) {
          return item.editableProp;
        }
        return null;
      })[0];
      if (schema && schema[propName] && schema[propName].propEditor) {
        const Render = schema[propName].propEditor;
        const value = (editingNode && editingNode[propName]) || null;
        return (
          (Render && (
            <Render
              value={value}
              key={key}
              node={editingNode || undefined}
              setValue={(valueFn: any) => {
                setTree(
                  produce((draft: any) => {
                    const node = noder.getNode(draft, editingNodeID);
                    // const newValue=typeof valueFn === "function" ? valueFn(value) : valueFn
                    Object.assign(
                      node,
                      typeof valueFn === "function" ? valueFn(value) : valueFn
                    );
                  })
                );
              }}
            />
          )) ||
          null
        );
      }
      return (
        <Form.Item name={propName} label={propName} key={key}>
          <Input onChange={(e) => handleOnChange(propName, e.target.value)} />
        </Form.Item>
      );
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
    }, [editableProp, editingNode, editingNodeID, formHook, root]);

    return (
      <div style={{ padding: "10px" }}>
        {editingNodeID ? (
          <>
            <Form form={formHook}>
              <Form.Item label={"nodeID"}>{editingNodeID}</Form.Item>
              {editableProp?.map((item, index) => {
                return getPropItem(item, index);
              })}
            </Form>
            <div className="default-buttons-container">
              <Button
                type="primary"
                color="red"
                danger
                onClick={() => handleDeleteNode(editingNode)}
              >
                删除
              </Button>
            </div>
          </>
        ) : null}
      </div>
    );
  }
);
