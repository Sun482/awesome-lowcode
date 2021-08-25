import type { FC } from "react";

export type ComponentProps<T> = FC<T & Record<string, any>>;
