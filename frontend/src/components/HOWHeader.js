import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import howitworkscat from "../assets/howitworkscat.png";
import Image from "react-bootstrap/Image";
import SubtitleText from "./SubtitleText";
import TitleText from "./TitleText";
function HOWHeader(props) {
  const { title, subtitle, bgcolor } = props;
  return (
    <Container className="p-5">
      <Row>
        <Col lg="6">
          <Image src={howitworkscat} alt="how-it-works-cat" fluid />
        </Col>
        <Col lg="4">
          <div
            className="shadow-sm rounded-circle p-4"
            style={{ backgroundColor: bgcolor }}
          >
            <TitleText title={title} />
          </div>
        </Col>
        <SubtitleText subtitle={subtitle} />
      </Row>
    </Container>
  );
}

export default HOWHeader;
