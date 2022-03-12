import React from "react";
import { Link } from "react-router-dom";
import { content } from "../../../translation/translation";

const SignUp = props => {
  let lang = localStorage.getItem("lang");
  return (
    <>
      <a href="/#contact-us" className="btn btn-primary">
        {content[lang].contact_us}
      </a>
    </>
  );
};

export default SignUp;
