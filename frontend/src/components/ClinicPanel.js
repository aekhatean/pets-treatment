import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import ClinicGallary from "./ClinicGallary";
import ClinicSchedule from "./ClinicSchedule";
import DescriptionText from "./DescriptionText";
import SubtitleText from "./SubtitleText";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Container } from "react-bootstrap";
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
    <Container>
      {/* clinic name */}
      <div className="text-start mb-4">
        <SubtitleText subtitle={clinic.name} />
      </div>
      {/* clinic address/location */}
      <div className="fs-6 text-start">
        <LocationOnIcon className="text-danger" />
        <span className="fw-light">{clinic.location}</span>
      </div>
      {/* clinic price */}
      <div className="fs-6 text-start">
        <PaymentsIcon className="text-success" />
        <span className="fw-light"> {clinic.price}</span>
      </div>

      {/* clinic schedule */}
      <ClinicSchedule clinic_id={clinic_id} doctor_id={doctor_id} />
      {/* clinic pictures gallary */}
      <ClinicGallary clinic_id={clinic_id} />
    </Container>
  );
}

export default ClinicPanel;
