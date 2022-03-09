import { useState } from "react";
import { axiosInstance } from "../api";
import ModalDelete from "./ModalDelete";

const ScheduleCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  function from24hTo12h(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  return (
    <div className="col-lg-3 col-md-4 col-6">
      <div className="card mb-3">
        <div className="card-header">{props.schedule.day}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            From:{" "}
            <span className="fw-bold">
              {`${from24hTo12h(props.schedule.from_time).split(":")[0]}:${
                from24hTo12h(props.schedule.from_time).split(":")[1]
              } ${
                from24hTo12h(props.schedule.from_time)
                  .split(":")[2]
                  .split(" ")[1]
              }
                `}
            </span>
          </li>
          <li className="list-group-item">
            to:{" "}
            <span className="fw-bold">
              {`${from24hTo12h(props.schedule.to_time).split(":")[0]}:${
                from24hTo12h(props.schedule.to_time).split(":")[1]
              } ${
                from24hTo12h(props.schedule.to_time).split(":")[2].split(" ")[1]
              }
                `}
            </span>
          </li>
          <li className="list-group-item">
            Duration:{" "}
            <span className="fw-bold">
              {props.schedule.appointment_duration} min
            </span>
          </li>
          <li className="list-group-item">
            Next Date: <span className="fw-bold">{props.schedule.date}</span>
          </li>
          <li className="list-group-item">
            <button
              className="btn btn-danger"
              onClick={() => setIsModalOpen(true)}
            >
              Delete
            </button>
          </li>
        </ul>
      </div>
      <ModalDelete
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        deleteFunc={deleteSchedule}
      />
    </div>
  );
};

export default ScheduleCard;
