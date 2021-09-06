import { Card, Col, Layout, Row } from "antd";

export default function Home() {
  return (
    <Layout>
      <div style={{ height: "calc(100vh - 48px)", width: "100%", margin: 0 }}>
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
      </div>
    </Layout>
  );
}
