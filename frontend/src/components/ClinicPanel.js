import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api";
import ClinicGallary from "./ClinicGallary";
import ClinicSchedule from "./ClinicSchedule";
import DescriptionText from "./DescriptionText";
import SubtitleText from "./SubtitleText";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Container } from "react-bootstrap";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { colors } from "../colors/colors";

function ClinicPanel(props) {
  const { clinic_id, doctor_id } = props;
  const { lang, setLang } = useContext(LanguageContext);
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
    <Container className="shadow-sm">
      {/* clinic name */}
      <div className={lang === "ar" ? "text-end mb-4" : "text-start mb-4"}>
        <SubtitleText subtitle={clinic.name} />
      </div>
      {/* clinic address/location */}
      <div className={lang === "ar" ? "text-end fs-6" : "fs-6 text-start"}>
        <LocationOnIcon className="text-danger" />
        <span className="fw-light">{clinic.location}</span>
      </div>
      {/* clinic price */}
      <div className={lang === "ar" ? "text-end fs-6" : "fs-6 text-start"}>
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
