import React from "react";
interface props {
  height?: string;
  width?: string;
}
const Thundericon = (props: props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ? props.width : "12"}
      height={props.height ? props.height : "12"}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M6.5 1L1.5 7H6L5.5 11L10.5 5H6L6.5 1Z"
        stroke="#6CE9A6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Thundericon;
