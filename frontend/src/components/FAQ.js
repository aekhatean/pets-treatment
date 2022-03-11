import React, { useContext } from "react";
import { Accordion, Container } from "react-bootstrap";
import { colors } from "../colors/colors";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";

function FAQ(props) {
  const { lang, setLang } = useContext(LanguageContext);
  return (
    <Container className="p-5" dir={lang === "ar" ? "rtl" : "ltr"}>
      <Accordion
        style={{
          maxWidth: "70%",
        }}
      >
        {content[lang].fqalist.map((faq, index) => (
          <Accordion.Item
            eventKey={index}
            key={faq.q}
            className="rounded shadow-sm"
            style={{ backgroundColor: colors.bg.blond }}
          >
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
  );
}

export default FAQ;
