import { twMerge } from "tailwind-merge";

export const TriangleIcon = ({ className = "" }) => {
  return (
    <svg
      viewBox="-2 -4 24 24"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin"
      className={twMerge("jam jam-triangle-f fill-light", className)}
      transform="rotate(180)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M12.547 1.621l6.095 9.794A3 3 0 0 1 16.095 16H3.905a3 3 0 0 1-2.547-4.585L7.453 1.62a3 3 0 0 1 5.094 0z"></path>
      </g>
    </svg>
  );
};
