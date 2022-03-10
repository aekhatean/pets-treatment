import { axiosInstance } from "../api";
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import "../style.css";

const Appointments = () => {
  const { lang } = useContext(LanguageContext);
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  const [doctorClinics, setDoctorClinics] = useState([]);
  // const [doctorAppointments, setDoctorAppointments] = useState([]);
  async function fetchClinics() {
    const response = await axiosInstance
      .get("users/doctors/clinics", {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response));
    setDoctorClinics(response.data);
  }
  useEffect(() => {
    fetchClinics();
  }, []);

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
      >
        <option defaultValue>
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
      <div>appointments here</div>
      <h4 className={`m-4 ${lang === "en" ? "text-start" : "text-end"}`}>
        {lang === "en"
          ? content.en.history_appointments
          : content.ar.history_appointments}
      </h4>
      <div>appointments here</div>
    </div>
  );
};

export default Appointments;
