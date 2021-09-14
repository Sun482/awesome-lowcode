import { dslEngine } from "@/core/DSL/container";
import { DataTree } from "@/store/tree";
import { Input, notification } from "antd";
import { useRecoilValue } from "recoil";

export default function DSLPage() {
  let result;
  const root = useRecoilValue(DataTree);

  try {
    result = dslEngine.Node2Code(root, "HTML");
  } catch (err) {
    notification.error({ message: String(err) });
  }

  return <Input.TextArea value={result} style={{ height: "60vh" }} />;
}
