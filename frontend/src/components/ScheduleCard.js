import React from "react";
import "../styles/doctor_card.css";

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)/) || [time];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

function ScheduleCard(props) {
  return (
    <>
      <div className="col-4">
        <div className="card card-block caard">
          <div class="card text-center">
            <div
              class="card-header myfontsize"
              style={{
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
              }}
            >
              {props.schedule["day"]}
              {/* <h5 class="card-title" style={{fontSize:"0.85rem"}}>{props.schedule['date']}</h5> */}
            </div>
            <div class="card-body">
              <p class="card-text text-left myfontsize">
                from: {tConvert(props.schedule["from_time"])}
              </p>
              <p class="card-text text-left myfontsize">
                to:{tConvert(props.schedule["to_time"])}
              </p>
            </div>
            <div class="card-footer text-muted myflex">
              <a href="#" class="btn " style={{ backgroundColor: "#B8405E" }}>
                Reserve
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleCard;
