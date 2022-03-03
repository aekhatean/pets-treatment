import React from "react";

function TitleText(props) {
  const { title } = props;
  return (
    <>
      <span className="display-6">{title}</span>
    </>
  );
}

export default TitleText;
