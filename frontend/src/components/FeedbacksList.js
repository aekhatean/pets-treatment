import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import DescriptionText from "./DescriptionText";
import Ratings from "./Ratings";
import SubtitleText from "./SubtitleText";
import { Container, Row, Col } from "react-bootstrap";
function FeedbacksList(props) {
  const { doctor_id } = props;
  const [feedbacks, updateFeedbacks] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`users/doctors/rating/${doctor_id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          updateFeedbacks(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [doctor_id]);
  return (
    <Container>
      <Row>
        <Col>
          {feedbacks.map((feed) => (
            <div
              key={feed.id}
              className="shadow"
              style={{
                borderRadius: 10,
              }}
            >
              {/* username */}
              <SubtitleText subtitle={`@${feed.user.username}`} />
              <Ratings rating={feed.rating} />
              {/* comment */}
              <DescriptionText description={feed.details} />
              {/* rating */}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default FeedbacksList;
