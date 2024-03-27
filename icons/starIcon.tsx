import React from "react";

interface StarIconProps {
  state?: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({ state }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
    >
      <g clipPath="url(#clip0_399_1715)">
        <path
          d="M1.80606 7.72151C1.61306 7.82051 1.39406 7.64701 1.43306 7.42551L1.84806 5.06051L0.0865591 3.38251C-0.0779409 3.22551 0.00755914 2.93851 0.228059 2.90751L2.67706 2.55951L3.76906 0.396006C3.86756 0.201006 4.13406 0.201006 4.23256 0.396006L5.32456 2.55951L7.77356 2.90751C7.99406 2.93851 8.07956 3.22551 7.91456 3.38251L6.15356 5.06051L6.56856 7.42551C6.60756 7.64701 6.38856 7.82051 6.19556 7.72151L4.00006 6.59351L1.80556 7.72151H1.80606Z"
          fill={state ? "#FFBA00" : "#f7f7f7"}
        />
      </g>
      <defs>
        <clipPath id="clip0_399_1715">
          <rect width="8" height="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StarIcon;
