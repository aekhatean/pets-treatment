import React from "react";
import Options from "../Options/Options";

const GeneralOptions = props => {
  const options = [
    {
      name: "Search for a clinic",
      handler: props.actionProvider.handleClinicSearch,
      id: 1,
    },
    {
      name: "How it works",
      handler: props.actionProvider.handleHowItWorks,
      id: 2,
    },
    {
      name: "Sign up here",
      handler: props.actionProvider.handleSignUp,
      id: 3,
    },
    {
      name: "About Us",
      handler: props.actionProvider.handleAboutUs,
      id: 5,
    },
  ];

  return <Options options={options} />;
};

export default GeneralOptions;
