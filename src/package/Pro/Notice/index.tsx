/* eslint-disable react/no-array-index-key */

import type { NoticeType } from "./interface/type";

import { memo } from "react";

import { dslEngine } from "@/core/DSL/container";
import type { DSLRender } from "@/package/dslRender";
import h from "hyperscript";
import "./index.less";

import "bootstrap/dist/css/bootstrap.min.css";

export const Render: NoticeType = memo(
  ({ node, width, height, title, moreText }) => {
    return (
      <div
        className="window-container"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="title-container">
          <div className="title">{title}</div>
          <div className="title-more">{moreText}</div>
        </div>
        <ul className="list-container">
          <li>
            <div className="list-item">
              <div className="item-date">
                <div className="date-day">3</div>
                <div className="date-year-month">2021-09</div>
              </div>
              <div className="item-title">
                关于加强中秋国庆假期教职工疫情防控工作的通知
              </div>
            </div>
          </li>
          <li>
            <div className="list-item">
              <div className="item-date">
                <div className="date-day">3</div>
                <div className="date-year-month">2021-09</div>
              </div>
              <div className="item-title">
                地理与生物信息学院2022年推荐优秀应届本科毕业生免试攻读研究生工作方案
              </div>
            </div>
          </li>
          <li>
            <div className="list-item">
              <div className="item-date">
                <div className="date-day">3</div>
                <div className="date-year-month">2021-09</div>
              </div>
              <div className="item-title">内容</div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
);

export const HTMLRender: DSLRender = ({ node }) => {
  const childrenContent = node.children.map((item) => {
    return dslEngine.Node2Code(item, "HTML");
  });
  const dom = h("div", {}, [...childrenContent]);
  return dom;
};
