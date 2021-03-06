import React, { useLayoutEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import paw from "../assets/paw.svg";
import DescriptionText from "./DescriptionText";
import Tag from "./Tag";
import { colors } from "../colors/colors";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
function CatStep(props) {
  const { step, content, index } = props;
  const { lang, setLang } = useContext(LanguageContext);
  const [width, height] = useWindowSize();

  return (
    <Container>
      {width < 992 ? (
        <Row dir={lang === "ar" ? "rtl" : "ltr"}>
          <Col className="py-5">
            <div
              className="d-flex justify-content-center align-items-start"
              style={{
                transform: lang === "ar" ? "rotate(-270deg)" : "rotate(270deg)",
                height: 130,
              }}
            >
              <hr
                width="130"
                size="5"
                style={{ color: colors.bg.primary }}
                className="shadow-sm"
              />
              <span>
                <img
                  src={paw}
                  alt="catpaw"
                  className="shadow-sm"
                  style={{
                    width: 40,
                    transform: "rotate(270deg)",
                    borderRadius: "50%",
                  }}
                />
              </span>
              <hr
                width="40"
                size="5"
                style={{ color: colors.bg.primary }}
                className="shadow-sm"
              />
            </div>
          </Col>
          <Col>
            <Card
              className="shadow-sm"
              style={{
                transform: "skew(-10deg)",
                borderRadius: 30,
                backgroundColor: colors.bg.light,
                borderColor: colors.bg.blond,
              }}
            >
              <Card.Body>
                <span
                  className={
                    lang === "ar"
                      ? "float-end fs-5 translate-middle-y"
                      : "float-start fs-5 translate-middle-y"
                  }
                >
                  <Tag name={step} />
                </span>
                <DescriptionText description={content} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row
          dir={
            lang === "ar"
              ? index % 2 === 0
                ? "ltr"
                : "rtl"
              : index % 2 === 0
              ? "rtl"
              : "ltr"
          }
        >
          <Col></Col>
          <Col className="py-5">
            <div
              dir="ltr"
              className="d-flex justify-content-center align-items-center"
              style={{
                transform: "rotate(270deg)",
                height: 90,
              }}
            >
              <hr
                width="90"
                size="5"
                style={{ color: colors.bg.primary }}
                className="shadow-sm"
              />
              <span>
                <img
                  src={paw}
                  alt="catpaw"
                  className="shadow-sm"
                  style={{
                    width: 40,
                    transform: "rotate(270deg)",
                    borderRadius: "50%",
                  }}
                />
              </span>
              <hr
                width="40"
                size="5"
                style={{ color: colors.bg.primary }}
                className="shadow-sm"
              />
            </div>
          </Col>
          <Col>
            <Card
              className="shadow my-5"
              style={{
                transform: "skew(-10deg)",
                borderRadius: 30,
                backgroundColor: colors.bg.light,
                borderColor: colors.bg.blond,
              }}
            >
              <Card.Body className="p-4">
                <span
                  className={
                    lang === "ar"
                      ? "float-end fs-4 translate-middle-y"
                      : "float-start fs-4 translate-middle-y"
                  }
                >
                  <Tag name={step} />
                </span>
                <p
                  className={
                    lang === "ar" ? "fs-5 text-end" : "fs-5 text-start"
                  }
                >
                  {content}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CatStep;
