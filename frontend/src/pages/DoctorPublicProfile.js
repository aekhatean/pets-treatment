import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api";
function DoctorPublicProfile(props) {
  const { id } = props.match.params;
  const [doctor, setDoctor] = useState({});
  useEffect(() => {
    axiosInstance
      .get(`users/doctors/${id}`)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(doctor);
  return (
    <>
      <div>{doctor.user.first_name}</div>
    </>
  );
}

export default DoctorPublicProfile;
