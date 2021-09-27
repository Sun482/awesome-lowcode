export type ResourceType = string | ArrayBuffer | null;
export type ResourceResponse = { success: boolean; value: ResourceType };
export interface ResourceUtilInterface {
  // 添加资源到指定路径
  addResource: (target: ResourceType, path: string) => string;
  getResource: (resourceID: string) => ResourceResponse;
  removeResource: (resourceID: string) => boolean;
}
