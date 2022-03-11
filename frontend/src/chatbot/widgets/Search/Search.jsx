import React from "react";
import { Link } from "react-router-dom";
import { content } from "../../../translation/translation";

const Search = props => {
  let lang = localStorage.getItem("lang");
  return (
    <Link to="/doctors" className="btn btn-primary">
      {content[lang].search}
    </Link>
  );
};

export default Search;
