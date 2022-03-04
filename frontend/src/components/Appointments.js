import { axiosInstance } from "../api";
import { useState, useEffect } from "react";
import "../style.css";

const Appointments = () => {
  const [doctorClinics, setDoctorClinics] = useState([]);
  // const [doctorAppointments, setDoctorAppointments] = useState([]);

  useEffect(() => {
    async function fetchClinics() {
      const response = await axiosInstance
        .get(`users/doctors/4`)
        .catch((err) => console.error(err));
      setDoctorClinics(response.data.clinics);
    }
    fetchClinics();
  }, []);

  return (
    <div>
      <h4 className="m-4 text-start">Select a clinic</h4>
      <select
        className="form-select w-25 m-4 primary-color"
        aria-label="Default select example"
      >
        <option defaultValue>Select a clinic..</option>
        {doctorClinics.map((clinic) => {
          return (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          );
        })}
      </select>
      <h4 className="m-4 text-start">Upcoming Appointments</h4>
      <div>appointments here</div>
      <h4 className="m-4 text-start">Appointments History</h4>
      <div>appointments here</div>
    </div>
  );
};

export default Appointments;
