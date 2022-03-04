import React, { useContext } from "react";
import CatStepsBar from "../components/CatStepsBar";
import HOWHeader from "../components/HOWHeader";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { Container, Row, Col, Accordion } from "react-bootstrap";
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
        <Container className="p-5" dir={lang === "ar" ? "rtl" : "ltr"}>
          <Accordion style={{ maxWidth: "70%" }}>
            {content[lang].fqalist.map((faq, index) => (
              <Accordion.Item eventKey={index} key={faq.q} className="rounded">
                <Accordion.Header>{faq.q}</Accordion.Header>
                <Accordion.Body
                  className={lang === "ar" ? "text-end" : "text-start"}
                >
                  {faq.a}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Container>
      </div>
    </Container>
  );
}

export default HowItWorks;
