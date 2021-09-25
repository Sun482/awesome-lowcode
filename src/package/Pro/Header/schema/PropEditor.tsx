import { Button, Form, Select, Upload } from "antd";
import type { PropEditorType } from "@/package/common";
import type { FC } from "react";

const bgModeArr = ["color", "img"];
export const BgModePropEditor: FC<PropEditorType> = ({ node, setValue }) => {
  const handleModeChange = (_value: any) => {
    setValue((prev) => {
      return {
        backgroundMode: {
          ...prev,
          mode: _value
        }
      };
    });
  };
  return (
    <>
      <Form.Item label="背景模式">
        <Select
          value={(node && node.backgroundMode.mode) || ""}
          onChange={handleModeChange}
        >
          {bgModeArr.map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Select.Option value={item} key={index}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </>
  );
};
export const BgImgPropEditor: FC<PropEditorType> = ({
  node,
  value,
  setValue
}) => {
  return (
    <>
      {node && node.backgroundMode.mode === "img" ? (
        <Form.Item label="图片">
          <Upload>
            <Button>上传图片</Button>
          </Upload>
        </Form.Item>
      ) : null}
    </>
  );
};
