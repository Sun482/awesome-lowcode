export type NodeType = 'normal';

export interface LNODE {
  name: string;
  val: Object;
  type: NodeType;
  children: Array<Node>;
}

export type Node = LNODE
& Record<string, any>
