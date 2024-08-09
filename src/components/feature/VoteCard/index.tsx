import { FC, useState } from "react";
import successIcon from "../../../assets/success.svg";
import failIcon from "../../../assets/fail.svg";
import questionMarkIcon from "../../../assets/question-mark.svg";
import { twMerge } from "tailwind-merge";

type VoteCardParams = {
  status: "success" | "fail";
};

const VoteCard: FC<VoteCardParams> = ({ status }) => {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => {
    setFlipped(true);
  };

  const icon =
    status === "success" ? successIcon : status === "fail" && failIcon;

  return (
    <div
      className="relative h-[80px] w-[60px] cursor-pointer select-none"
      onClick={handleFlip}
      style={{ perspective: "1000px" }}
    >
      <div
        className={twMerge(
          "relative h-full w-full transition-transform duration-700 ease-in-out"
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back Side */}
        <div
          className={twMerge(
            "absolute inset-0 flex items-center justify-center rounded-md bg-light transition-all duration-700"
          )}
          style={{
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <img src={questionMarkIcon} className="w-6" alt="question mark" />
        </div>

        {/* Front Side */}
        <div
          className={twMerge(
            "absolute inset-0 flex items-center justify-center rounded-md bg-light transition-all duration-700"
          )}
          style={{
            transform: flipped
              ? "rotateY(0deg) translateY(-5%)"
              : "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <img src={icon} className="w-6" alt="card voting icon" />
        </div>
      </div>
    </div>
  );
};

export default VoteCard;
