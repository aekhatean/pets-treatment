import React from "react";
import { Link } from "react-router-dom";
import { content } from "../../../translation/translation";

const About = props => {
  let lang = localStorage.getItem("lang");
  return (
    <Link to="/about" className="btn btn-primary">
      {content[lang].about}
    </Link>
  );
};

export default About;
