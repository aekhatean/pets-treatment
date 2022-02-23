import React, { useContext } from "react";
import CatStepsBar from "../components/CatStepsBar";
import HOWHeader from "../components/HOWHeader";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";

function HowItWorks() {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <div className="container">
      <HOWHeader
        title={content[lang].howitworks}
        subtitle={content[lang].slogan}
      />
      {/* body */}
      {/* <div className="d-flex"> */}
      <div className="my-5">
        <CatStepsBar steps={content[lang].howsteps} />
      </div>
      {/* <div>df</div> */}
      {/* </div> */}
    </div>
  );
}

export default HowItWorks;
