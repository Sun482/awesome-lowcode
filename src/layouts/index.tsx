import { routes } from "@/config/routes";
import BasicLayout from "@ant-design/pro-layout";

import { useHistory } from "react-router";
import { RecoilRoot } from "recoil";

export default function Layout(props: any) {
  const { pathname } = props.location;
  const history = useHistory();
  return (
    <RecoilRoot>
      <BasicLayout
        logo={null}
        navTheme="light"
        contentStyle={{ margin: "0" }}
        headerHeight={48}
        menuItemRender={(item, dom) => {
          return (
            <div
              onClick={() => {
                if (item && item.path) history.push(item.path);
              }}
            >
              {dom}
            </div>
          );
        }}
        layout="top"
        title="Lowcode"
        route={routes}
        location={{ pathname }}
      >
        {props.children}
      </BasicLayout>
    </RecoilRoot>
  );
}
