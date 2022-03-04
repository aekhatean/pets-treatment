import React, { useContext } from "react";
import CatStepsBar from "../components/CatStepsBar";
import HOWHeader from "../components/HOWHeader";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { Container, Row, Col } from "react-bootstrap";
import { colors } from "../colors/colors";

function HowItWorks() {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <Container>
      <HOWHeader
        title={content[lang].howitworks}
        subtitle={content[lang].slogan}
        bgcolor={colors.bg.primary}
      />

      <CatStepsBar steps={content[lang].howsteps} />
    </Container>
  );
}

export default HowItWorks;
