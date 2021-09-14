import { dslEngine } from "@/core/DSL/container";
import { DataTree } from "@/store/tree";
import { notification } from "antd";
import { useRecoilValue } from "recoil";
import MonacoEditor from "@uiw/react-monacoeditor";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import prettier from "prettier/standalone";
import parser from "prettier/parser-html";

export default function DSLPage() {
  let result;
  const root = useRecoilValue(DataTree);

  try {
    result = dslEngine.Node2Code(root, "HTML");
  } catch (err) {
    notification.error({ message: String(err) });
  }

  return (
    <Layout
      style={{
        height: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Sider theme="light" width="320px" style={{ padding: "10px" }} />
      <Content style={{ overflow: "hidden", minHeight: "calc(100vh - 48px)" }}>
        <MonacoEditor
          width="calc(100vw - 320px)"
          height="calc(100vh - 48px)"
          theme="vs-dark"
          language="html"
          value={prettier.format(result, {
            parser: "html",
            plugins: [parser]
          })}
          options={{
            selectOnLineNumbers: true
          }}
        />
      </Content>
    </Layout>
  );
}
