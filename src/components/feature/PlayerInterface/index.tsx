import { useState } from "react";
import Cover from "./Cover";

const PlayerInterface = ({ player }) => {
  console.log(player);
  const [show, setShow] = useState(false);
  return (
    <div className="w-full h-full">
      {!show && <Cover onClick={() => setShow(true)} />}
      <div>hello</div>
    </div>
  );
};

export default PlayerInterface;
