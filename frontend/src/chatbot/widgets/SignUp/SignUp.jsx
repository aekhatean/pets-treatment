import React from "react";
import { Link } from "react-router-dom";

const SignUp = props => {
  return (
    <>
      <Link
        to="/search"
        className="btn btn-primary"
        style={{ marginRight: "4px" }}>
        Pet Owner
      </Link>
      <Link to="/search" className="btn btn-secondary">
        Vet
      </Link>
    </>
  );
};

export default SignUp;
