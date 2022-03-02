import React from "react";

function Tag(props) {
  const { name } = props;
  return <span className="badge rounded-pill bg-primary m-1 ">{name}</span>;
}

export default Tag;
