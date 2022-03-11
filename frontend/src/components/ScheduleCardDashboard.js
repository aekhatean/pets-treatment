import { useState, useContext } from "react";
import { axiosInstance } from "../api";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import ModalDelete from "./ModalDelete";

const ScheduleCard = (props) => {
  const { lang } = useContext(LanguageContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  const translatedDay = (day) => {
    switch (day) {
      case "Saturday":
        return lang === "en"
          ? content.en.weekdays.saturday
          : content.ar.weekdays.saturday;
      case "Sunday":
        return lang === "en"
          ? content.en.weekdays.sunday
          : content.ar.weekdays.sunday;
      case "Monday":
        return lang === "en"
          ? content.en.weekdays.monday
          : content.ar.weekdays.monday;
      case "Tuesday":
        return lang === "en"
          ? content.en.weekdays.tuesday
          : content.ar.weekdays.tuesday;
      case "Wednesday":
        return lang === "en"
          ? content.en.weekdays.wednesday
          : content.ar.weekdays.wednesday;
      case "Thursday":
        return lang === "en"
          ? content.en.weekdays.thursday
          : content.ar.weekdays.thursday;
      case "Friday":
        return lang === "en"
          ? content.en.weekdays.friday
          : content.ar.weekdays.friday;
      default:
        return "";
    }
  };
  const deleteSchedule = async () => {
    await axiosInstance
      .delete(`users/schedule/${props.schedule.id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err));
    props.func();
  };

  function from24hTo12h(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = time[0] < 12 ? " AM" : " PM";
      time[0] = time[0] % 12 || 12;
    }
    return time.join("");
  }

  return (
    <div className="col-lg-3 col-md-4 col-6">
      <div className="card mb-3 primary-bg shadow">
        <div className="card-header">{translatedDay(props.schedule.day)}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {lang === "en" ? content.en.from : content.ar.from}:{" "}
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
            {lang === "en" ? content.en.to : content.ar.to}:{" "}
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
            {lang === "en" ? content.en.duration : content.ar.duration}:{" "}
            <span className="fw-bold">
              {props.schedule.appointment_duration}{" "}
              {lang === "en" ? content.en.min : content.ar.min}
            </span>
          </li>
          <li className="list-group-item">
            {lang === "en" ? content.en.next_date : content.ar.next_date}:{" "}
            <span className="fw-bold">{props.schedule.date}</span>
          </li>
          <li className="list-group-item ">
            <button
              className="btn btn-danger"
              onClick={() => setIsModalOpen(true)}
            >
              {lang === "en" ? content.en.delete : content.ar.delete}
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
