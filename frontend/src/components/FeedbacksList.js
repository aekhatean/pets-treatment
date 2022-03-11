import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api";
import SubtitleText from "./SubtitleText";
import { Container, Row, Col } from "react-bootstrap";
import FeedbackCard from "./FeedbackCard";
import { colors } from "../colors/colors";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";

function FeedbacksList(props) {
  const { doctor_id } = props;
  const { lang, setLang } = useContext(LanguageContext);

  const [feedbacks, updateFeedbacks] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`users/doctors/rating/${doctor_id}`)
      .then((res) => {
        if (res.status === 200) {
          updateFeedbacks(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [doctor_id]);
  return (
    <Container
      className="p-3 my-5 shadow-sm"
      style={{ width: "97%", borderRadius: 10 }}
    >
      <div className={lang === "ar" ? "text-end m-1" : "text-start m-1"}>
        <SubtitleText subtitle={content[lang].feedbacks} />
      </div>
      <Row>
        <Col>
          {feedbacks.map((feed) => (
            <FeedbackCard key={feed.id} feedback={feed} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default FeedbacksList;
