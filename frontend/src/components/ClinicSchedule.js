import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import { Table, Button, Modal } from "react-bootstrap";
import AppointmentBooking from "./AppointmentBooking";

function ClinicSchedule(props) {
  const { clinic_id, doctor_id } = props;
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
                data.doctor === parseInt(doctor_id) && data.active !== false
            )
          );
        }
      })
      .catch((err) => console.log(err));
  }, [clinic_id, doctor_id]);
  return (
    <div>
      <Table responsive borderless size="sm">
        <thead>
          <tr>
            <th width={"20%"}>From</th>
            <th width={"20%"}>To</th>
            <th width={"20%"}>Day</th>
            <th width={"30%"}>Action</th>
          </tr>
        </thead>
        <tbody>
          {scheduleList.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.from_time}</td>
              <td>{schedule.to_time}</td>
              <td>{schedule.day}</td>
              <td>
                <Button
                  className="me-2 btn-info"
                  onClick={() => handleShow(schedule)}
                >
                  Book an appointment
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} fullscreen={true} onHide={() => handleHide()}>
        <Modal.Header closeButton>
          <Modal.Title>Book an appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentBooking selected_schedule={selected_schedule} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ClinicSchedule;
