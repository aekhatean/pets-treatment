import { axiosInstance } from "../api";
import { useState, useEffect } from "react";

const Appointments = () => {
  const [doctorClinics, setDoctorClinics] = useState([]);
  useEffect(async () => {
    const response = await axiosInstance
      .get(`users/doctors/4`)
      .catch((err) => console.log(err));
    console.log(response.data.clinics);
    setDoctorClinics(response.data.clinics);
  }, []);
  return <div>{}</div>;
};

export default Appointments;
