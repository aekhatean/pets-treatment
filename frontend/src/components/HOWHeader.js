import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import howitworkscat from "../assets/howitworkscat.png";
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
        <Col lg="6">
          <Image src={howitworkscat} alt="how-it-works-cat" fluid />
        </Col>
        <Col lg="4">
          <div
            className="shadow-sm  p-4 "
            style={{ backgroundColor: bgcolor, borderRadius: 20 }}
          >
            <TitleText title={title} />
          </div>
          <div className="p-3">
            <a
              href="#howdoctor"
              className="btn btn-sm btn-outline-dark m-1"
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
              className="btn btn-sm btn-outline-dark m-1"
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
              className="btn btn-sm btn-outline-dark m-1"
              style={{
                backgroundColor: colors.bg.primary,
                border: "none",
                borderRadius: 30,
              }}
            >
              <SubtitleText subtitle={content[lang].faq} />
            </a>
          </div>
        </Col>
        <SubtitleText subtitle={subtitle} />
      </Row>
    </Container>
  );
}

export default HOWHeader;
