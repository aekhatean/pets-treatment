import React, { useContext } from "react";
import Ratings from "./Ratings";
import Tag from "./Tag";
import { colors } from "../colors/colors";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";

function FeedbackCard(props) {
  const { feedback } = props;
  const { lang, setLang } = useContext(LanguageContext);

  return (
    <div
      className={
        lang === "ar" ? "shadow m-2 p-3 text-end" : "shadow m-2 p-3 text-start"
      }
      style={{
        borderRadius: 10,
        backgroundColor: colors.bg.light,
      }}
    >
      <Ratings rating={feedback.rating} />
      {/* comment */}
      <div className={lang === "ar" ? "fs-6 text-end" : "fs-6 text-start"}>
        {content[lang].feedback_details}
        <span className="fw-light"> {`"${feedback.details}"`}</span>
      </div>
      {/* rating */}
      <div className={lang === "ar" ? "fs-6 text-end" : "fs-6 text-start"}>
        <span>{content[lang].rating} </span>
        <Tag name={feedback.rating} />
      </div>

      {/* username */}
      <span className="fw-lighter">{`@${feedback.user.username}`}</span>
    </div>
  );
}

export default FeedbackCard;
