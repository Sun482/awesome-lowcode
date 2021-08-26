// import type { Node } from "../DSL/interface/node";
// // useNode是消费Node的hook,提供属性注入
// // 提供节点与节点之间的联系
// // 要做到一个节点更新的时候能够唤醒父节点同样做到状态更新(重绘)
// export const useNode = <T extends Record<string, any>>(
//   node: Node, // 要消费的node节点
//   updateFn: any, // 能使父节点强制更新的函数
//   config: T // 想注入node节点的属性
// ) => {
//   const [ref, setRef] = useState<Node>(node);
//   const [forceFlag, setForceFlag] = useState(0);
//   const setter = (fn: (newNode: Node) => any) => {
//     const newState = fn(ref);
//     setRef(newState);

//     if (updateFn) updateFn({ ...newState, ...config });
//   };

//   // 使本组件更新的函数
//   const myUpdateFn = (newState: Node) => {
//     setRef((prev) => {
//       const { children, ...others } = prev;
//       return {
//         ...others,
//         children: children.map((item) => {
//           if (newState.val === item.val) {
//             return newState;
//           }
//           return item;
//         })
//       };
//     });
//     setForceFlag((prev) => prev + 1);
//   };

//   return [{ ...ref, ...config }, setter, myUpdateFn] as [
//     Node,
//     React.Dispatch<React.SetStateAction<Node>>,
//     any
//   ];
// };
