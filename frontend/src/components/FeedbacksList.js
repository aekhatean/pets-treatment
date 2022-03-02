import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import DescriptionText from "./DescriptionText";
import Ratings from "./Ratings";
import SubtitleText from "./SubtitleText";

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
    <>
      {feedbacks.map((feed) => (
        <div>
          {/* username */}
          <SubtitleText subtitle={feed.user.username} />
          {/* comment */}
          {feed.details}
          <DescriptionText description={feed.details} />
          {/* rating */}
          <Ratings rating={feed.rating} />
        </div>
      ))}
    </>
  );
}

export default FeedbacksList;
