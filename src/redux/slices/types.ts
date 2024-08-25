export type RoleVariants =
  | "clone"
  | "explorer"
  | "patriot"
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
  roles: string[];
}

export interface IPlayer {
  id: number;
  name: string;
  role: RoleParams;
  isClone: boolean;
  cloneStartDay?: number; //?  mean start day of setting isClone to true (delay??)
  disabledCellIds: number[];
}

export interface IMission {
  id: number;
  playersCapacity: number;
  players: number[];
  type: "default" | "clone";
  minClonesToLose: number;
  votings: {
    playerId: number;
    isSuccess: boolean;
    isShown: boolean;
    reason?: string;
  }[];
  status: "success" | "failure" | "";
}

export type MissionStatusVatiants = "success" | "failure" | "";
export type MissionVoteParams = {
  playerId: number;
  isSuccess: boolean;
  reason?: string;
};
