import type { ComponentProps } from "@/package/common";

interface DragItem {
  index: number;
  title: string;
}
export type DragItemType = ComponentProps<DragItem>;
