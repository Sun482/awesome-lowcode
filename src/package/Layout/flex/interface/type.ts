import type { ComponentProps } from "@/package/common";

interface DragItem {
  index: number;
  width: string;
  total: number;
}
export type DragItemType = ComponentProps<DragItem>;
