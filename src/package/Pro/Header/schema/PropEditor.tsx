import { Button, Form, Select, Upload, Image, notification } from "antd";
import type { PropEditorType } from "@/package/common";
import type { FC } from "react";

import { useMemo } from "react";
import { resourceUtil } from "@/core/DSL/container";

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
  const handleGetFile = (file: Blob) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const base64 = fileReader.result;
      const resID = resourceUtil.addResource(base64, `${node?.id}#bgImg`);
      notification.success({ message: "资源获取成功!" });
      setValue((prev) => {
        return { ...node, backgroundImg: { ...prev, resID } };
      });
    };
    return false;
  };

  const bgImgSrc = useMemo(() => {
    return resourceUtil.getResource(value.resID);
  }, [value.resID]);

  return (
    <>
      {node && node.backgroundMode.mode === "img" ? (
        <Form.Item label="图片">
          {bgImgSrc.value ? (
            <Image src={bgImgSrc.value as string} />
          ) : (
            <Upload beforeUpload={handleGetFile}>
              <Button>上传图片</Button>
            </Upload>
          )}
        </Form.Item>
      ) : null}
    </>
  );
};
