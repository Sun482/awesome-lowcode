export type NodeType = "normal";

export interface LNODE {
  name: string;
  val: unknown;
  children: Node[];
}

export type Node = LNODE & Record<string, any>;
