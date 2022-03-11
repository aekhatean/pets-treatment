import React, { useContext } from "react";
import AboutUsImage from "../assets/AboutUsImage.png";
import "../style.css";
import Khaled from "../assets/khaled.jpg";
import Adham from "../assets/adham.jpg";
import Alaa from "../assets/alaa.jpg";
import Saleh from "../assets/saleh.jpg";
import AyaMaged from "../assets/maged_basha.jpg";
import AyaMohammed from "../assets/mohammed_basha.jpg";
import { Col, Container, Image, Row } from "react-bootstrap";
import animalsgroup from "../assets/animalsgroup.png";
import doctorandpets from "../assets/doctorandpets.png";
import doctorwithpet from "../assets/doctorwithpet.png";
import dogheaderBlond from "../assets/dogheaderBlond.png";
import dogheaderPrimary from "../assets/dogheaderPrimary.png";
import doctordog from "../assets/doctordog.png";
import petfriend from "../assets/petfriend.png";
import cats from "../assets/cats.png";
import TitleText from "../components/TitleText";
import SubtitleText from "../components/SubtitleText";
import { content } from "../translation/translation";
import { LanguageContext } from "../context/LanguageContext";
import DescriptionText from "../components/DescriptionText";
import { colors } from "../colors/colors";

function About() {
  const { lang } = useContext(LanguageContext);
  const teamList = [
    { name: content[lang].team_members.khaled, src: Khaled },
    { name: content[lang].team_members.adham, src: Adham },
    { name: content[lang].team_members.alaa, src: Alaa },
    { name: content[lang].team_members.saleh, src: Saleh },
    { name: content[lang].team_members.ayamaged, src: AyaMaged },
    { name: content[lang].team_members.ayamohamed, src: AyaMohammed },
  ];

  return (
    <Container className="p-5">
      <Row>
        <Col>
          <Image src={doctordog} alt="how-it-works-cat" fluid />
        </Col>
        <Col className="my-5">
          <span className="display-1 fw-bold">{content[lang].about}</span>
        </Col>
      </Row>

      <SubtitleText subtitle={content[lang].slogan} />

      <Row className="my-5 p-5">
        <Col>
          <p className={lang === "ar" ? "fs-5 text-end" : "fs-5 text-start"}>
            {content[lang].about_petsania}
          </p>
        </Col>
      </Row>
      <div
        style={{
          backgroundColor: colors.bg.primary,
        }}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Image src={cats} alt="how-it-works-cat" fluid />
        <span className="display-6 lh-lg">{content[lang].team}</span>
      </div>

      <Container className="p-5 my-4">
        <Row>
          {teamList.map((member) => {
            return (
              <Col lg={4}>
                <Image
                  src={member.src}
                  alt={`${member.name}'s Images`}
                  width={300}
                  className="rounded-circle"
                />
                <p className="fs-5 fw-bold h4 mt-4">{member.name}</p>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
}

export default About;
