import { useState } from "react";
import { axiosInstance } from "../api";

const ScheduleCard = (props) => {
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  const deleteSchedule = async () => {
    await axiosInstance
      .delete(`users/schedule/${props.schedule.id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err));
    props.func();
  };
  return (
    <div className="col-lg-3 col-md-4 col-6">
      <div className="card mb-3">
        <div className="card-header">{props.schedule.day}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">From : {props.schedule.from_time}</li>
          <li className="list-group-item">to : {props.schedule.to_time}</li>
          <li className="list-group-item">
            Duration : {props.schedule.appointment_duration}
          </li>
          <li className="list-group-item">Next Date : {props.schedule.date}</li>
          <li className="list-group-item">
            <button className="btn btn-danger" onClick={deleteSchedule}>
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ScheduleCard;
