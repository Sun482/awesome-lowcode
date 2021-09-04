/* eslint-disable no-underscore-dangle */

import { useEffect } from "react";
import { useState } from "react";

import type { ButtonType } from "./interface/type";

export const Render: ButtonType = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>Render次数{count}</div>;
};
