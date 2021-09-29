import { Button, Form, Select, Upload, Image, notification, Input } from "antd";
import type { PropEditorType } from "@/package/common";
import type { FC } from "react";

import { useMemo } from "react";
import { resourceUtil } from "@/core/DSL/container";
import { useCallback, useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { Carousel } from "react-bootstrap";

export const MenuBackgroundEditor: FC<PropEditorType> = ({
  node,
  value,
  setValue
}) => {
  const [formHook] = useForm();
  const handleMenuBgChanged = useCallback(
    (e) => {
      setValue((prev) => {
        return { menuItem: { ...prev, menuBackground: e.target.value } };
      });
    },
    [setValue]
  );
  useEffect(() => {
    formHook.setFieldsValue(value);
  }, [formHook, value]);
  return (
    <Form form={formHook}>
      <Form.Item label="MenuBackground" name="menuBackground">
        <Input onChange={handleMenuBgChanged} />
      </Form.Item>
    </Form>
  );
};
