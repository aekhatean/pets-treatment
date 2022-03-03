import React from "react";

function DescriptionText(props) {
  const { description } = props;
  return <div className="fs-6 fw-light">{description}</div>;
}

export default DescriptionText;
