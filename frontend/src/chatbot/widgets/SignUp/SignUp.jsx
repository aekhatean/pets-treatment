import React from "react";
import { Link } from "react-router-dom";
import { content } from "../../../translation/translation";

const SignUp = props => {
  let lang = localStorage.getItem("lang");
  return (
    <>
      <Link
        to="/petowner_register"
        className="btn btn-primary"
        style={{ marginRight: "4px" }}>
        {content[lang].pet_owner}
      </Link>
      <Link to="/doctor_register" className="btn btn-secondary">
        {content[lang].vets}
      </Link>
    </>
  );
};

export default SignUp;
