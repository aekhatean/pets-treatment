import React from "react";
import Options from "../Options/Options";
import { content } from "../../../../translation/translation";

const GeneralOptions = props => {
  let lang = localStorage.getItem("lang");
  const options = [
    {
      name: content[lang].clinicSearch,
      handler: props.actionProvider.handleClinicSearch,
      id: 1,
    },
    {
      name: content[lang].howitworks,
      handler: props.actionProvider.handleHowItWorks,
      id: 2,
    },
    {
      name: content[lang].register,
      handler: props.actionProvider.handleSignUp,
      id: 3,
    },
    {
      name: content[lang].about,
      handler: props.actionProvider.handleAboutUs,
      id: 5,
    },
    {
      name: content[lang].login,
      handler: props.actionProvider.handleLogin,
      id: 6,
    },
  ];

  return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;
