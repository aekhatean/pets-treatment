import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";
// import Paginator from "../components/Paginator";

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

const getAppointmentInfo = (res, setAppointments) => {
  if (res.status === 200) {
    const appointmentsList = [];
    for (const result of res.data.results) {
      const { date, appointment_duration } = result.schedule;
      const { visiting_time, doctor, clinic, address } = result;

      const { from, to } = getAppointmentJSTimeDuration(
        visiting_time,
        appointment_duration
      );
      const newAppointment = {
        doctor: doctor,
        clinic: clinic,
        address: address,
        date: getAppointmentJSDate(date),
        from: from,
        to: to,
      };
      appointmentsList.push(newAppointment);
    }
    setAppointments(appointmentsList);
  }
};

function UserDashboard(props) {
  const { id } = props.match.params;
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [prviousAppointments, setPrviousAppointments] = useState([]);
  const userUpcomingAppointments = `users/user-upcoming-appointment/`;
  const userPreviousAppointments = `users/user-previous-appointment/`;

  // Get upcoming apponitmnets
  useEffect(() => {
    axiosInstance
      .get(userUpcomingAppointments, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      .then((res) => getAppointmentInfo(res, setUpcomingAppointments));
  }, [userUpcomingAppointments, id]);

  // Get previous apponitmnets
  useEffect(() => {
    axiosInstance
      .get(userPreviousAppointments, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
      .then((res) => getAppointmentInfo(res, setPrviousAppointments));
  }, [userPreviousAppointments, id]);

  return (
    <div id="clinic-dashbaord" className="mt-5">
      <div className="h1 text-md-start">Upcoming appointments</div>
      <DynamicTable tableContent={upcomingAppointments} />
      <hr className="mt-5" />
      <div className="h1 text-md-start">Previous appointments</div>
      <DynamicTable tableContent={prviousAppointments} />
    </div>
  );
}

export default UserDashboard;
