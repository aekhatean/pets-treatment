import { axiosInstance } from "../api";
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import "../style.css";
import DynamicTable from "../components/DynamicTable";
import {
  getAppointmentJSDate,
  getAppointmentJSTimeDuration,
} from "../components/UserAppointments";
import { Alert } from "react-bootstrap";

const getAppointmentInfo = (res, setAppointments) => {
  if (res.status === 200) {
    const appointmentsList = [];
    for (const result of res.data.results) {
      const { appointment_duration } = result.schedule;
      const { first_name, last_name, email } = result.user;
      const { visiting_time, date } = result;
      const { from, to } = getAppointmentJSTimeDuration(
        visiting_time,
        appointment_duration
      );
      const newAppointment = {
        patient: `${first_name} ${last_name}`,
        email: email,
        date: getAppointmentJSDate(date),
        from: from,
        to: to,
      };
      appointmentsList.push(newAppointment);
    }
    setAppointments(appointmentsList);
  }
};

const Appointments = () => {
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  const { lang } = useContext(LanguageContext);
  const [doctorClinics, setDoctorClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState("");
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [previousAppointments, setPrviousAppointments] = useState([]);
  const doctorUpcomingAppointments = `users/doctor-upcoming-appointment/`;
  const doctorPreviousAppointments = `users/doctor-previous-appointment/`;

  // Fetch doctor's clinics
  useEffect(() => {
    axiosInstance
      .get("users/doctors/clinics", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setDoctorClinics(res.data))
      .catch((err) => console.error(err.response));
  }, [token]);

  // Get upcoming apponitmnets
  useEffect(() => {
    if (selectedClinic) {
      axiosInstance
        .get(doctorUpcomingAppointments, {
          headers: {
            Authorization: "Token " + token,
          },
          params: {
            clinic: selectedClinic,
          },
        })
        .then((res) => getAppointmentInfo(res, setUpcomingAppointments));
    }
  }, [doctorUpcomingAppointments, selectedClinic, token]);

  // Get previous apponitmnets
  useEffect(() => {
    if (selectedClinic) {
      axiosInstance
        .get(doctorPreviousAppointments, {
          headers: {
            Authorization: "Token " + token,
          },
          params: {
            clinic: selectedClinic,
          },
        })
        .then((res) => getAppointmentInfo(res, setPrviousAppointments));
    }
  }, [doctorPreviousAppointments, selectedClinic, token]);

  return (
    <div>
      <h4 className={`m-4 ${lang === "en" ? "text-start" : "text-end"}`}>
        {lang === "en"
          ? content.en.select_a_clinic
          : content.ar.select_a_clinic}
      </h4>

      <select
        className="form-select w-25 m-4 primary-color"
        aria-label="Default select example"
        value={selectedClinic}
        onChange={(e) => {
          setSelectedClinic(e.target.value);
        }}
      >
        <option defaultValue value="">
          {lang === "en"
            ? content.en.select_a_clinic
            : content.ar.select_a_clinic}
        </option>
        {doctorClinics.map((clinic) => {
          return (
            <option key={clinic.clinic.id} value={clinic.clinic.id}>
              {clinic.clinic.name}
            </option>
          );
        })}
      </select>

      <h4 className={`m-4 ${lang === "en" ? "text-start" : "text-end"}`}>
        {lang === "en"
          ? content.en.upcoming_appointments
          : content.ar.upcoming_appointments}
      </h4>
      {selectedClinic ? (
        <DynamicTable tableContent={upcomingAppointments} />
      ) : (
        <div
          className={`mx-3 w-50 ${
            lang === "en" ? "text-start" : "text-end"
          } alert text-dark primary-bg`}
          role="alert"
        >
          {content[lang].selectClinic}
        </div>
      )}
      <h4 className={`m-4 ${lang === "en" ? "text-start" : "text-end"}`}>
        {lang === "en"
          ? content.en.history_appointments
          : content.ar.history_appointments}
      </h4>
      {selectedClinic ? (
        <DynamicTable tableContent={previousAppointments} />
      ) : (
        <div
          className={`mx-3 w-50 ${
            lang === "en" ? "text-start" : "text-end"
          } alert text-dark primary-bg`}
          role="alert"
        >
          {content[lang].selectClinic}
        </div>
      )}
    </div>
  );
};

export default Appointments;
