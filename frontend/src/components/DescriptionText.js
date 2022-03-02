import React from "react";

function DescriptionText(props) {
  const { description } = props;
  return (
    <div>
      <p className="fs-6">{description}</p>
    </div>
  );
}

export default DescriptionText;
