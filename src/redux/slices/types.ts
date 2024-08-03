export type RoleVariants =
  | "clone"
  | "explorer"
  | "detective"
  | "interceptor"
  | "finder"
  | "role";

export interface RoleParams {
  id: number;
  isEvil: boolean;
  name: RoleVariants;
  value: number;
  minCount?: number;
  mandatory?: boolean;
  single?: boolean;
}

export interface IPlayer {
  id: number;
  name: string;
  role: RoleVariants;
  isClone: boolean;
  cloneStartDay?: number; //?  mean start day of setting isClone to true
  disabledCellIds: number[];
}

export interface IMission {
  id: number;
  players: number[];
  votings: { playerId: number; isSuccess: boolean; reason?: string }[];
  isSucceed: boolean;
}
