import { PropEditorType } from "@/package/common";
import { Button, Space } from "antd";
import { FC } from "react";

export const ColorEditor: FC<PropEditorType> = ({ value, setValue }) => {
  const handleChange = () => {
    setValue(() => {
      return {
        style: {
          color: "blue"
        }
      };
    });
  };
  return (
    <Space>
      当前颜色:{value}
      <Button onClick={handleChange}>切换颜色</Button>
    </Space>
  );
};
