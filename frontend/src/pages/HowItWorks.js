import React, { useContext } from "react";
import CatStepsBar from "../components/CatStepsBar";
import HOWHeader from "../components/HOWHeader";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { Container, Row, Col, Accordion, Image } from "react-bootstrap";
import { colors } from "../colors/colors";
import FAQ from "../components/FAQ";
import howitworkscat from "../assets/howitworkscat.png";
import animalsgroup from "../assets/animalsgroup.png";
import doctorandpets from "../assets/doctorandpets.png";
import doctorwithpet from "../assets/doctorwithpet.png";
import dogheaderBlond from "../assets/dogheaderBlond.png";
import dogheaderPrimary from "../assets/dogheaderPrimary.png";
import doctordog from "../assets/doctordog.png";
import petfriend from "../assets/petfriend.png";
import cats from "../assets/cats.png";

function HowItWorks() {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <Container>
      <HOWHeader
        title={content[lang].howitworks}
        subtitle={content[lang].slogan}
        bgcolor={colors.bg.blond}
      />
      {/* how it works as a pet owner */}
      <div id="howpetowner">
        <div
          style={{
            backgroundColor: colors.bg.primary,
          }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <span className="display-6 lh-lg">{content[lang].petowner}</span>
          <Image src={petfriend} alt="how-it-works-cat" fluid />
        </div>
        <CatStepsBar steps={content[lang].howsteps} />
      </div>
      {/* how it works as a doctor */}
      <div id="howdoctor">
        <div
          style={{
            backgroundColor: colors.bg.primary,
          }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <Image src={doctorwithpet} alt="how-it-works-cat" fluid />
          <span className="display-6 lh-lg">{content[lang].doctor}</span>
        </div>

        <CatStepsBar steps={content[lang].howsteps_doctor} />
      </div>

      {/* frequentaly asked questions */}
      <div id="faq">
        <div
          style={{
            backgroundColor: colors.bg.primary,
          }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <span className="display-6 lh-lg">{content[lang].faq}</span>
          <Image src={doctordog} alt="how-it-works-cat" fluid />
        </div>
        <FAQ />
      </div>
    </Container>
  );
}

export default HowItWorks;
