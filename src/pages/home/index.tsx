import { PageContainer } from "@ant-design/pro-layout";
import { Card, Col, Row } from "antd";

export default function Home() {
  return (
    <PageContainer style={{ height: "calc(100vh - 48px)" }}>
      <Row justify="space-between">
        <Col span={7}>
          <Card hoverable>编辑器</Card>
        </Col>
        <Col span={7}>
          <Card hoverable>DSL转换器</Card>
        </Col>
        <Col span={7}>
          <Card hoverable>关于作者</Card>
        </Col>
      </Row>
    </PageContainer>
  );
}
