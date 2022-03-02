import React from "react";
import StarIcon from "@mui/icons-material/Star";

function Ratings(props) {
  const { rating } = props;
  return (
    <>
      {[...Array(Math.round(rating))].map((el, index) => (
        <StarIcon key={index} className="text-warning" />
      ))}
    </>
  );
}

export default Ratings;
