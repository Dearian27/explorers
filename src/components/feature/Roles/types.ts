import { Dispatch, SetStateAction } from "react";
import { RoleParams } from "../../../types";

export interface RolesProps {
  playersCount: number;
  roles: (RoleParams & { count: number })[];
  setRoles: Dispatch<SetStateAction<(RoleParams & { count: number })[]>>;
}
export interface RoleItemProps {
  role: RoleParams & { count: number };
  setCount: (count: number) => void;
  disabled?: boolean;
}
