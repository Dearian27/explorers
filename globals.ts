import rolesData from "./src/assets/data/roles.json";
import { RoleParams } from "./src/redux/slices/types.ts";
const roles: RoleParams[] = rolesData as RoleParams[];

export { roles };
