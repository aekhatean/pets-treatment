import { useEffect, useState } from "react";
import { axiosInstance } from "../api";
import ProfilePicture from "./ProfilePicture";

const DoctorDashboardCard = (props) => {
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  const [doctorProfile, setDoctorProfile] = useState({});

  async function deleteDoctor() {
    const data = {
      doctor_id: props.doctor.id,
    };
    await axiosInstance
      .post(`users/doctors/own_clinics/${props.clinic_id}`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response));
    props.func_clinic_id("");
    props.func_fetch_clinics();
  }

  async function getDoctorProfile() {
    const response = await axiosInstance
      .get(`users/doctors/${props.doctor.id}`)
      .catch((err) => console.error(err.response));
    setDoctorProfile(response.data);
  }

  useEffect(() => {
    getDoctorProfile();
  }, []);

  if (doctorProfile && Object.keys(doctorProfile).length) {
    return (
      <div className="col-lg-3 col-md-4 col-6">
        <div className="card mb-3">
          <div className="card-header">
            <img
              src={`http://localhost:8000${doctorProfile.profile.picture}`}
              className="img-thumbnail"
            />
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{`${doctorProfile.user.first_name} ${doctorProfile.user.last_name}`}</li>
            <li className="list-group-item">{doctorProfile.profile.phone}</li>
            {((doctorProfile.id === props.current_doctor_id &&
              !props.is_owner) ||
              (doctorProfile.id !== props.current_doctor_id &&
                props.is_owner)) && (
              <li className="list-group-item">
                <button className="btn btn-danger" onClick={deleteDoctor}>
                  Delete From Clinic
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
};

export default DoctorDashboardCard;
