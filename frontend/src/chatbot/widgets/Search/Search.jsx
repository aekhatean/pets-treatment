import React from "react";
import { Link } from "react-router-dom";

const Search = props => {
  return (
    <Link to="/search" className="btn btn-primary">
      Search
    </Link>
  );
};

export default Search;
