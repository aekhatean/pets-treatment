import React from "react";
import { Link } from "react-router-dom";

const About = props => {
  return (
    <Link to="/about" className="btn btn-primary">
      About Us
    </Link>
  );
};

export default About;
