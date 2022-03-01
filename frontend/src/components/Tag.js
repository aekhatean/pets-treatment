import React from "react";

function Tag(props) {
  const { name } = props;
  return <span className="badge rounded-pill bg-primary">{name}</span>;
}

export default Tag;
