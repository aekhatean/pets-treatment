import React from "react";
import { Link } from "react-router-dom";

const SignUp = props => {
  return (
    <>
      <Link
        to="/petowner_register"
        className="btn btn-primary"
        style={{ marginRight: "4px" }}>
        Pet Owner
      </Link>
      <Link to="/doctor_register" className="btn btn-secondary">
        Vet
      </Link>
    </>
  );
};

export default SignUp;
