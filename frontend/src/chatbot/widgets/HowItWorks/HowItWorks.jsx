import React from "react";
import { Link } from "react-router-dom";
import { content } from "../../../translation/translation";

const HowItWorks = props => {
  let lang = localStorage.getItem("lang");
  return (
    <Link to="/howitworks" className="btn btn-primary">
      {content[lang].howitworks}
    </Link>
  );
};

export default HowItWorks;
