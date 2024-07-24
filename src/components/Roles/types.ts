import { RoleParams } from "../../types";

export interface RolesProps {
  playersCount: number;
}
export interface RoleItemProps {
  role: RoleParams & { count: number };
  setCount: (count: number) => void;
}
