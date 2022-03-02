import React, { useState, useEffect } from "react";
import DynamicTable from "../components/DynamicTable";

// API consumbtion
import { axiosInstance } from "../api";

function ClinicDashbord(props) {
  const { id } = props.match.params;
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    axiosInstance.get(`users/appointment/${id}`).then((res) => {
      if (res.status === 200) {
        const appointmentsList = [];
        appointmentsList.push(res.data);
        setAppointments(appointmentsList);
      }
    });
  }, [id]);

  return (
    <div id="clinic-dashbaord">
      <DynamicTable tableContent={appointments} />
    </div>
  );
}

export default ClinicDashbord;
