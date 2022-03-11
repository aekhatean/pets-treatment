import React from "react";
import { Link, useHistory } from "react-router-dom";
import { colors } from "../colors/colors";

function Tag(props) {
  const { name, clickable } = props;
  const history = useHistory();
  const goToSearch = (name) => {
    history.push({ pathname: "/doctors", state: { specialization: name } });
  };
  return (
    <>
      {clickable ? (
        <span
          className="badge rounded-pill m-1 fw-normal shadow-sm"
          style={{
            backgroundColor: colors.bg.primary,
            color: colors.text.dark,
          }}
          onClick={() => goToSearch(name)}
        >
          {name}
        </span>
      ) : (
        <span
          className="badge rounded-pill m-1 fw-normal shadow-sm"
          style={{
            backgroundColor: colors.bg.primary,
            color: colors.text.dark,
          }}
        >
          {name}
        </span>
      )}
    </>
  );
}

export default Tag;

// history.push({ pathname: "/search" });
