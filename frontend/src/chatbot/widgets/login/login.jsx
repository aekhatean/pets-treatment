import React from "react";
import { Link } from "react-router-dom";
import { content } from "../../../translation/translation";

const SignUp = props => {
  let lang = localStorage.getItem("lang");
  return (
    <>
      <Link to="/login" className="btn btn-primary">
        {content[lang].login}
      </Link>
    </>
  );
};

export default SignUp;
