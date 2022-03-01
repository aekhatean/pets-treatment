import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import ClinicGallary from "./ClinicGallary";
import ClinicSchedule from "./ClinicSchedule";

function ClinicPanel(props) {
  const { clinic_id, doctor_id } = props;
  const [clinic, setClinic] = useState({
    name: "",
    location: "",
    phone: "",
    price: 0,
  });
  useEffect(() => {
    axiosInstance
      .get(`clinics/detail_clinic/${clinic_id}/`)
      .then((res) => {
        if (res.status === 200) {
          setClinic({
            name: res.data.name,
            location: `${res.data.address}, ${res.data.area}, ${res.data.city}, ${res.data.country}`,
            phone: res.data.phone,
            price: res.data.price,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [clinic_id]);

  return (
    <div>
      {/* clinic name */}
      {clinic.name}
      {/* clinic address/location */}
      {clinic.location}
      {/* clinic price */}
      {clinic.price}
      {/* clinic schedule */}
      <ClinicSchedule clinic_id={clinic_id} doctor_id={doctor_id} />
      {/* clinic pictures gallary */}
      <ClinicGallary clinic_id={clinic_id} />
    </div>
  );
}

export default ClinicPanel;
