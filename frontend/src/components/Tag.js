import React from "react";
import { colors } from "../colors/colors";

function Tag(props) {
  const { name } = props;
  return (
    <span
      className="badge rounded-pill m-1 fw-normal"
      style={{ backgroundColor: colors.bg.light, color: colors.text.dark }}
    >
      {name}
    </span>
  );
}

export default Tag;
