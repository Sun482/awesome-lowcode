// /* eslint-disable no-param-reassign */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { componentType } from "@/constants/componentType";
// import type { Node } from "@/core/DSL/interface/node";
// import type { Effect, Reducer, Subscription } from "umi";
// import type { ImmerReducer } from "umi";

// export interface TreeModelState {
//   root: Node;
// }

// export interface TreeModelType {
//   namespace: "TreeData";
//   state: TreeModelState;
//   effects: {
//     query: Effect;
//   };
//   reducers: {
//     save: ImmerReducer<TreeModelType>;
//   };
//   subscriptions: { setup: Subscription };
// }

// const IndexModel: TreeModelType = {
//   namespace: "TreeData",
//   state: {
//     root: {
//       name: "flex",
//       type: componentType.Layout,
//       val: "test",
//       children: [],
//       dragID: "root",
//       addChild: (node: Node, addFn) => {
//         addFn(node);
//       }
//     }
//   },

//   effects: {
//     *query({ payload }, { call, put }) {}
//   },
//   reducers: {},
//   subscriptions: {
//     setup({ dispatch, history }) {
//       return history.listen(({ pathname }) => {
//         if (pathname === "/") {
//           dispatch({
//             type: "query"
//           });
//         }
//       });
//     }
//   }
// };

// export default IndexModel;
