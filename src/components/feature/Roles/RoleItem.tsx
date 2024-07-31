import { FC } from "react";
import { RoleItemProps } from "./types";
import NumberInput from "../../common/NumberInput";

const RoleItem: FC<RoleItemProps> = ({
  role,
  removeRole,
  setCount,
  disabled,
}) => {
  // const [count, setCount] = useState(role.count);
  return (
    <div className="flex items-center cursor-pointer capitalize text-md font-semibold px-4 py-2 gap-2 rounded-md bg-green-200">
      <span> {role.name}</span>
      <NumberInput
        styleType="small"
        value={role.count}
        setValue={setCount}
        plusDisabled={disabled}
        minusDisabled={role.minCount && role.minCount >= role.count}
      />
      <button onClick={() => removeRole()}>x</button>
    </div>
  );
};

export default RoleItem;
