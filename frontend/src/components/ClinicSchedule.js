import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";

function ClinicSchedule(props) {
  const { clinic_id, doctor_id } = props;
  const [schedule, setSchedule] = useState({
    from: "",
    to: "",
    day: "",
    appointment_duration: "",
    date: "",
    active: false,
  });
  useEffect(() => {
    axiosInstance
      .get(`users/schedule`)
      .then((res) => {
        if (res.status === 200) {
          //   console.log(res.data);
          const doctor_clinic_schedule = res.data.filter(
            (data) => data.doctor.id === doctor_id
          );
          console.log(doctor_clinic_schedule);
          setSchedule({
            from: "",
            to: "",
            day: "",
            appointment_duration: "",
            date: "",
            active: false,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [clinic_id, doctor_id]);
  return (
    <div>
      ClinicSchedule, {clinic_id}, {doctor_id}
    </div>
  );
}

export default ClinicSchedule;
