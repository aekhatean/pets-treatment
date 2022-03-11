import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import animalsgroup from "../assets/animalsgroup.png";
import Image from "react-bootstrap/Image";
import SubtitleText from "./SubtitleText";
import TitleText from "./TitleText";
import { colors } from "../colors/colors";
import { content } from "../translation/translation";
import { LanguageContext } from "../context/LanguageContext";
function HOWHeader(props) {
  const { title, subtitle, bgcolor } = props;
  const { lang, setlang } = useContext(LanguageContext);
  return (
    <Container className="p-5">
      <Row>
        <Col lg="7">
          <Image src={animalsgroup} alt="how-it-works-cat" fluid />
        </Col>
        <Col lg="5">
          <div className="py-4 my-5" style={{ borderRadius: 20 }}>
            <span className="display-1 fw-bold">{title}</span>
          </div>
        </Col>

        <SubtitleText subtitle={subtitle} />
        <div
          className="my-5"
          style={{
            border: "none",
            borderRadius: 30,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <a
            href="#howdoctor"
            className="btn btn-sm btn-outline-dark m-1 shadow-sm"
            style={{
              backgroundColor: colors.bg.primary,
              border: "none",
              borderRadius: 30,
            }}
          >
            <SubtitleText subtitle={content[lang].doctor} />
          </a>
          <a
            href="#howpetowner"
            className="btn btn-sm btn-outline-dark m-1 shadow-sm"
            style={{
              backgroundColor: colors.bg.primary,
              border: "none",
              borderRadius: 30,
            }}
          >
            <SubtitleText subtitle={content[lang].petowner} />
          </a>
          <a
            href="#faq"
            className="btn btn-sm btn-outline-dark m-1 shadow-sm"
            style={{
              backgroundColor: colors.bg.primary,
              border: "none",
              borderRadius: 30,
            }}
          >
            <SubtitleText subtitle={content[lang].faq} />
          </a>
        </div>
      </Row>
    </Container>
  );
}

export default HOWHeader;
