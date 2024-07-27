import React from "react";
import "./styles.css";
const Cover = ({ onClick }) => {
  return (
    <div
      onClick={() => onClick()}
      className="absolute z-20 top-0 bottom-0 left-0 right-0 bg-[#252525] flex justify-center items-center"
    >
      <div className="cover">
        <span className="text">Гравець 2</span>
      </div>
    </div>
  );
};

export default Cover;
