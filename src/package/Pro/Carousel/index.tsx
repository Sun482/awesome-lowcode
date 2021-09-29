/* eslint-disable react/no-array-index-key */

import type { CarouselType } from "./interface/type";

import { memo, useMemo } from "react";

import { dslEngine, resourceUtil } from "@/core/DSL/container";

import type { DSLRender } from "@/package/dslRender";
import h from "hyperscript";
import "./index.less";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Render: CarouselType = memo(({ node, width, height }) => {
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <img
            style={{
              height: `${height}px !important`,
              width: `${width}px !important`
            }}
            className="d-block w-100"
            src="http://cgb.njupt.edu.cn/_upload/article/images/6a/74/97c59c6e4eb697e89199c695034f/1ac41a45-293a-48d8-92b5-3d45a38a455f.jpg"
          />
          <Carousel.Caption>
            <h5>标题</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
});

export const HTMLRender: DSLRender = ({ node }) => {
  const childrenContent = node.children.map((item) => {
    return dslEngine.Node2Code(item, "HTML");
  });
  const dom = h("div", {}, [...childrenContent]);
  return dom;
};
