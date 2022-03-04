import React, { useContext } from "react";
import CatStepsBar from "../components/CatStepsBar";
import HOWHeader from "../components/HOWHeader";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { colors } from "../colors/colors";
import FAQ from "../components/FAQ";

function HowItWorks() {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <Container>
      <HOWHeader
        title={content[lang].howitworks}
        subtitle={content[lang].slogan}
        bgcolor={colors.bg.primary}
      />
      {/* how it works as a pet owner */}
      <div id="howpetowner">
        <div
          style={{
            backgroundColor: colors.bg.primary,
            borderRadius: 30,
          }}
        >
          <span className="display-6 lh-lg">{content[lang].petowner}</span>
        </div>
        <CatStepsBar steps={content[lang].howsteps} />
      </div>
      {/* how it works as a doctor */}
      <div id="howdoctor">
        <div
          style={{
            backgroundColor: colors.bg.primary,
            borderRadius: 30,
          }}
        >
          <span className="display-6 lh-lg">{content[lang].doctor}</span>
        </div>

        <CatStepsBar steps={content[lang].howsteps_doctor} />
      </div>

      {/* frequentaly asked questions */}
      <div id="faq">
        <div
          style={{
            backgroundColor: colors.bg.primary,
            borderRadius: 30,
          }}
        >
          <span className="display-6 lh-lg">{content[lang].faq}</span>
        </div>
        <FAQ />
      </div>
    </Container>
  );
}

export default HowItWorks;
