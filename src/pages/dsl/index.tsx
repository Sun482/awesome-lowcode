import { dslRender } from "@/package/dslRender";
import { DataTree } from "@/store/tree";
import { useRecoilValue } from "recoil";

export default function DSLPage() {
  const root = useRecoilValue(DataTree);
  const render = dslRender.Layout.Flex.HTML;
  const result = render({ node: root.children[0] });
  return <div>{result}</div>;
}
