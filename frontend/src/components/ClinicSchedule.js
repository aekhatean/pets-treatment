import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api";
import { Table, Button, Modal } from "react-bootstrap";
import AppointmentBooking from "./AppointmentBooking";
import { colors } from "../colors/colors";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";

function ClinicSchedule(props) {
  const { clinic_id, doctor_id } = props;
  const { lang, setLang } = useContext(LanguageContext);
  const [scheduleList, updateScheduleList] = useState([]);
  const [selected_schedule, setSelected_schedule] = useState({});
  const [show, setShow] = useState(false);

  function handleShow(schedule) {
    setSelected_schedule(schedule);
    setShow(true);
  }
  function handleHide() {
    setSelected_schedule({});
    setShow(false);
  }
  useEffect(() => {
    axiosInstance
      .get(`users/schedule/clinic/${clinic_id}`)
      .then((res) => {
        if (res.status === 200) {
          updateScheduleList(
            res.data.filter(
              (data) =>
                data.doctor.id === parseInt(doctor_id) && data.active !== false
            )
          );
        }
      })
      .catch((err) => console.log(err));
  }, [clinic_id, doctor_id]);

  return (
    <div className=" rounded bg-light">
      <Table responsive borderless size="sm">
        <thead>
          <tr>
            <th width={"20%"}>{content[lang].from}</th>
            <th width={"20%"}>{content[lang].to}</th>
            <th width={"20%"}>{content[lang].day}</th>
            <th width={"30%"}></th>
          </tr>
        </thead>
        <tbody>
          {scheduleList.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.from_time}</td>
              <td>{schedule.to_time}</td>
              <td>{content[lang].weekdays[schedule.day.toLowerCase()]}</td>
              <td>
                <Button
                  style={{ backgroundColor: colors.bg.primary, border: "none" }}
                  className="me-2 btn-outline-dark"
                  onClick={() => handleShow(schedule)}
                >
                  {content[lang].book_appointment}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={show}
        fullscreen={true}
        onHide={() => handleHide()}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Modal.Header closeButton bsPrefix="text-center">
          <Modal.Title>{content[lang].book_appointment}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentBooking selected_schedule={selected_schedule} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ClinicSchedule;
