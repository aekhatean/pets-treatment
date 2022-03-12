import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../api";
import { Table, Button, Modal } from "react-bootstrap";
import AppointmentBooking from "./AppointmentBooking";
import { colors } from "../colors/colors";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useHistory } from "react-router-dom";
import { LogingContext } from "../context/LogingContext";

function ClinicSchedule(props) {
  const { clinic_id, doctor_id } = props;
  const { lang, setLang } = useContext(LanguageContext);
  const { is_loged, setLogging, userRole } = useContext(LogingContext);
  const [scheduleList, updateScheduleList] = useState([]);
  const [selected_schedule, setSelected_schedule] = useState({});
  const [show, setShow] = useState(false);
  const [notPT, setPT] = useState(false);
  const history = useHistory();
  function handleShow(schedule) {
    if (is_loged) {
      if (userRole === "PT") {
        setPT(false);
        setSelected_schedule(schedule);
        setShow(true);
      } else {
        setPT(true);
      }
    } else {
      history.push("/login");
    }
  }
  function handleHide() {
    setSelected_schedule({});
    setShow(false);
  }
  function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? content[lang].am : content[lang].pm; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  useEffect(() => {
    axiosInstance
      .get(`users/schedule/clinic/${clinic_id}`)
      .then((res) => {
        if (res.status === 200) {
          updateScheduleList(
            res.data.filter(
              (data) =>
                data.doctor === parseInt(doctor_id) && data.active !== false
            )
          );
        }
      })
      .catch((err) => console.log(err));
  }, [clinic_id, doctor_id]);

  return (
    <div>
      <Table
        responsive
        borderless
        className=" my-3"
        size="sm"
        style={{ backgroundColor: colors.bg.light, borderRadius: 20 }}
      >
        <thead>
          <tr>
            <th width={"20%"} className="p-2">
              {content[lang].from}
            </th>
            <th width={"20%"} className="p-2">
              {content[lang].to}
            </th>
            <th width={"20%"} className="p-2">
              {content[lang].day}
            </th>
            <th width={"30%"} className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {scheduleList.map((schedule) => (
            <tr key={schedule.id}>
              <td className="p-2">{tConvert(schedule.from_time)}</td>
              <td className="p-2">{tConvert(schedule.to_time)}</td>
              <td className="p-2">
                {content[lang].weekdays[schedule.day.toLowerCase()]}
              </td>
              <td className="p-2">
                <Button
                  className="btn-outline-light mb-2"
                  style={{ backgroundColor: colors.bg.blue, border: "none" }}
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
        onHide={() => handleHide()}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Modal.Header closeButton bsPrefix="text-center">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentBooking selected_schedule={selected_schedule} />
        </Modal.Body>
      </Modal>
      <Modal
        show={notPT}
        onHide={() => setPT(false)}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Modal.Header bsPrefix="text-center">
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-center p-5 shadow"
          style={{
            backgroundColor: colors.bg.light,
            borderColor: colors.bg.blond,
          }}
        >
          <p>{content[lang].book_warning}</p>
          <Button
            onClick={() => setPT(false)}
            className="btn-light mt-3 shadow-sm rounded"
            style={{
              backgroundColor: colors.bg.primary,
              borderColor: colors.bg.blond,
            }}
          >
            {content[lang].close}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ClinicSchedule;
