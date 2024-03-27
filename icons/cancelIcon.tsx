import React from "react";

const CancelIcon = (props:any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M14.1075 25.8925L25.8926 14.1074"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.1075 14.1075L25.8926 25.8926"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CancelIcon;
