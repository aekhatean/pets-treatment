import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api";
import { Container, Image, Modal } from "react-bootstrap";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { colors } from "../colors/colors";

import GallaryCarousel from "./GallaryCarousel";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SubtitleText from "./SubtitleText";
function ClinicGallary(props) {
  const { clinic_id } = props;
  const { lang, setLang } = useContext(LanguageContext);
  const [gallary, setGallary] = useState([]);
  const [selected_picture, setSelected_picture] = useState({});
  const [show, setShow] = useState(false);

  function handleShow(picture) {
    setSelected_picture(picture);
    setShow(true);
  }
  function handleHide() {
    setSelected_picture({});
    setShow(false);
  }
  useEffect(() => {
    axiosInstance
      .get(`clinics/clinic_pictures/${clinic_id}`)
      .then((res) => {
        if (res.status === 200) {
          setGallary(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [clinic_id]);

  return (
    <Container className="my-5">
      <div className={lang === "ar" ? "text-end fs-6" : "fs-6 text-start"}>
        <CameraAltIcon className="text-success" />
        <span className="fw-light">
          <SubtitleText subtitle={` ${content[lang].gallary}`} />
        </span>
      </div>
      <div
        className="scrolling-wrapper"
        style={{ overflowX: "auto", display: "flex" }}
      >
        {gallary.map((picture) => (
          <Image
            key={picture.id}
            src={`http://localhost:8000${picture.picture}`}
            thumbnail
            width={200}
            onClick={() => handleShow(picture)}
          />
        ))}
      </div>

      <Modal
        show={show}
        onHide={() => handleHide()}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <GallaryCarousel
            imagelist={gallary}
            selected_picture={selected_picture}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ClinicGallary;
