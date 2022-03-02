import React from "react";

function AppointmentBooking(props) {
  const { selected_schedule } = props;

  return <div>AppointmentBooking {selected_schedule.id}</div>;
}

export default AppointmentBooking;
