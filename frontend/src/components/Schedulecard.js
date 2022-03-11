import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/doctor_card.css";
import { content } from "../translation/translation";

function ScheduleCard(props) {
  const { lang } = useContext(LanguageContext);
  function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? content[lang].am : content[lang].pm; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  return (
    <>
      <div className="col-4">
        <div className="card card-block caard rounded">
          <div class="card text-center">
            <div
              class="card-header myfontsize rounded-3"
              style={{
                fontWeight: "bold",
                backgroundColor: "gray",
                color: "white",
              }}
            >
              {content[lang].weekdays[props.schedule.day.toLowerCase()]}
              {/* <h5 class="card-title" style={{fontSize:"0.85rem"}}>{props.schedule['date']}</h5> */}
            </div>
            <div class="card-body">
              <p class="card-text text-left myfontsize">
                {content[lang].from}: {tConvert(props.schedule["from_time"])}
              </p>
              <p class="card-text text-left myfontsize">
                {content[lang].to}: {tConvert(props.schedule["to_time"])}
              </p>
            </div>
            <div class="card-footer text-muted myflex rounded-3">
              <Link
                to={`/doctors/${props.doctor_id}`}
                class="btn nonlink"
                style={{ backgroundColor: "green", color: "white" }}
              >
                {" "}
                {content[lang].book_appointment}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleCard;
