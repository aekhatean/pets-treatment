import React from "react";

export default function SubtitleText(props) {
  const { subtitle } = props;
  return (
    <>
      <span className="fs-4">{subtitle}</span>
    </>
  );
}
