import { FC, useEffect, useState } from "react";
import RoleItem from "./RoleItem";
import { RolesProps } from "./types";
import { twMerge } from "tailwind-merge";
// import roles from "@/assets/data/roles.json";

const Roles: FC<RolesProps> = ({ playersCount, roles, setRoles }) => {
  const [rate, setRate] = useState(0);

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
      <div
        className={twMerge(
          "flex gap-4",
          rate < 0 ? "text-red-500" : rate > 0 && "text-blue-400"
        )}
      >
        <h3>Баланс: {rate}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <RoleItem
            key={role.id}
            disabled={
              roles.reduce((acc, role) => acc + role.count, 0) >= playersCount
            }
            role={role}
            setCount={(count: number) => handleSetRoleCount(role.id, count)}
          />
        ))}
      </div>
    </div>
  );
};

export default Roles;
