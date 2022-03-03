import React from "react";
import Ratings from "./Ratings";
import Tag from "./Tag";

function FeedbackCard(props) {
  const { feedback } = props;
  return (
    <div
      className="shadow m-2 p-3 text-start"
      style={{
        borderRadius: 10,
      }}
    >
      <Ratings rating={feedback.rating} />
      {/* comment */}
      <div className="fs-6 text-start">
        What user say's
        <span className="fw-light"> {`"${feedback.details}"`}</span>
      </div>
      {/* rating */}
      <div className="fs-6 text-start">
        <span>Rating </span>
        <Tag name={feedback.rating} />
      </div>

      {/* username */}
      <span className="fw-lighter">{`@${feedback.user.username}`}</span>
    </div>
  );
}

export default FeedbackCard;
