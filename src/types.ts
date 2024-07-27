export interface RoleParams {
  id: number;
  isEvil: boolean;
  name: string;
  value: number;
  minCount?: number;
  mandatory?: boolean;
  single?: boolean;
}

export type RoleVariants =
  | "clone"
  | "explorer"
  | "detective"
  | "interceptor"
  | "finder"
  | "role";

export interface PlayerMessage {
  id: number;
  senderId: number;
  receiversId: number[];
  sendDay: number;
  receiptDay: number;
  type: "clone";
  text: string;
}
