import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";

// API consumption
import { axiosInstance } from "../api";

// Convert Python date to JS date with weekday
const getAppointmentJSDate = (pyDate) => {
  const dateComponents = pyDate.split("-");
  const [year, month, day] = dateComponents;

  return new Date(year, month, day).toDateString();
};

// Convert Python time to JS millisec time
const getAppointmentJSTimeDuration = (pyTime, duration) => {
  // Get hour, minute, sec as numbers
  let timeComponents = pyTime.split(":");
  timeComponents = timeComponents.map((timeComponent) =>
    parseInt(timeComponent)
  );
  const [hour, minute, sec] = timeComponents;

  // Get visit start and end times in AM/PM times
  const startTimeInMilliSec =
    hour * 60 * 60 * 1000 + minute * 60 * 1000 + sec * 1000;
  const endTimeInMilliSec =
    hour * 60 * 60 * 1000 + (minute + duration) * 60 * 1000 + sec * 1000;

  return {
    from: new Date(startTimeInMilliSec).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
    to: new Date(endTimeInMilliSec).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  };
};

function ClinicDashbord(props) {
  const { id } = props.match.params;
  const [appointments, setAppointments] = useState([]);

  // Get apponitmnets
  useEffect(() => {
    axiosInstance.get(`users/appointment/${id}`).then((res) => {
      if (res.status === 200) {
        const appointmentsList = [];
        const { date, appointment_duration } = res.data.schedule;
        const { first_name, last_name } = res.data.user;
        const { visiting_time } = res.data;

        const { from, to } = getAppointmentJSTimeDuration(
          visiting_time,
          appointment_duration
        );
        const newAppointment = {
          name: `${first_name} ${last_name}`,
          date: getAppointmentJSDate(date),
          from: from,
          to: to,
        };
        appointmentsList.push(newAppointment);
        setAppointments(appointmentsList);
      }
    });
  }, [id]);

  console.log(appointments);

  return (
    <div id="clinic-dashbaord">
      <DynamicTable tableContent={appointments} />
    </div>
  );
}

export default ClinicDashbord;
