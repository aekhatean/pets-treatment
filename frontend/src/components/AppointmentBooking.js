import React from "react";

function AppointmentBooking(props) {
  const { selected_schedule } = props;
  console.log(selected_schedule);
  return <div>AppointmentBooking {selected_schedule.id}</div>;
}

export default AppointmentBooking;
