import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import SubtitleText from "./SubtitleText";
import { Container, Row, Col } from "react-bootstrap";
import FeedbackCard from "./FeedbackCard";
function FeedbacksList(props) {
  const { doctor_id } = props;
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
    <Container className="p-3">
      <div className="text-start m-1">
        <SubtitleText subtitle="Feedbacks" />
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
