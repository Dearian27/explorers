import { FC, useEffect, useState } from "react";
import rolesJSON from "../../assets/data/roles.json";
import RoleItem from "./RoleItem";
import { RolesProps } from "./types";
import { RoleParams } from "../../types";
// import roles from "@/assets/data/roles.json";
// import roles from "@/";

const Roles: FC<RolesProps> = ({ playersCount }) => {
  const [rate, setRate] = useState(0);
  const [roles, setRoles] = useState<(RoleParams & { count: number })[]>(
    rolesJSON.map((el) => ({ ...el, count: 0 }))
  );

  const handleSetRoleCount = (id: number, count: number) => {
    setRoles((prev) => {
      return prev.map((el) => {
        if (el.id === id) {
          return { ...el, count: count };
        }
        return el;
      });
    });
  };

  useEffect(() => {
    setRate(() => {
      const total = roles.reduce(
        (acc, next) => (acc += next.count * next.value),
        0
      );
      return parseFloat(total.toFixed(2));
    });
  }, [roles]);

  return (
    <div className="flex gap-2 flex-col">
      <div className="flex gap-4">
        <h3>rate: {rate}</h3>
        <h3>players: {playersCount}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <RoleItem
            role={role}
            setCount={(count: number) => handleSetRoleCount(role.id, count)}
          />
        ))}
      </div>
    </div>
  );
};

export default Roles;
