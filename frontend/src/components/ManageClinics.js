import { axiosInstance } from "../api";
import { useState, useEffect } from "react";
import ScheduleCard from "./ScheduleCard";
import ScheduleCardAdder from "./ScheduleCardAdder";
import ClinicAdder from "./ClinicAdder";
import ExistingDoctorAdder from "./ExistingDoctorAdder";

const ManageClinics = () => {
  const [doctorClinics, setDoctorClinics] = useState([]);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [scheduleAdder, setScheduleAdder] = useState(false);
  const [clinicAdder, setClinicAdder] = useState(false);
  const [doctorAdder, setDoctorAdder] = useState(false);
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  // todo: change doctor id to get it from props
  async function fetchClinics() {
    const response = await axiosInstance
      .get(`users/doctors/4`)
      .catch((err) => console.error(err));
    setDoctorClinics(response.data.clinics);
  }

  async function fetchSchedules() {
    const response = await axiosInstance
      .get(
        `http://127.0.0.1:8000/users/schedule/one_clinic_one_doctor/${selectedClinicId}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .catch((err) => console.error(err));
    setDoctorSchedules(response.data);
  }

  useEffect(() => {
    fetchClinics();
  }, []);

  useEffect(() => {
    if (selectedClinicId) {
      fetchSchedules();
    }
  }, [selectedClinicId]);

  return (
    <div>
      <h4 className="m-4 text-start">Select a clinic</h4>
      <select
        className="form-select w-25 m-4 primary-color"
        aria-label="Select menu"
        value={selectedClinicId}
        onChange={(e) => setSelectedClinicId(e.target.value)}
      >
        <option defaultValue value="">
          Select a clinic..
        </option>
        {doctorClinics.map((clinic) => {
          return (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          );
        })}
      </select>
      <div className="container">
        <div className="row">
          {
            <button
              className="btn btn-primary col-md-2 col-4 mx-3"
              onClick={() => setClinicAdder(!clinicAdder)}
            >
              Add New Clinic
            </button>
          }
          {clinicAdder && (
            <ClinicAdder fetchFunc={fetchClinics} hideForm={setClinicAdder} />
          )}
        </div>
        <h4 className="my-3 text-start">Edit Schedule</h4>
        <div className="row">
          {selectedClinicId ? (
            doctorSchedules.length > 0 ? (
              doctorSchedules.map((schedule) => {
                if (schedule.clinic === Number(selectedClinicId)) {
                  return (
                    <ScheduleCard
                      key={schedule.id}
                      schedule={schedule}
                      func={fetchSchedules}
                    />
                  );
                }
              })
            ) : (
              <div className="alert alert-secondary mx-3 w-50" role="alert">
                There is no schedules in this clinic, click to add below.
              </div>
            )
          ) : (
            <div className="alert alert-secondary mx-3 w-50" role="alert">
              Select a clinic to view / edit your schedules.
            </div>
          )}
        </div>
        <div className="row">
          {selectedClinicId && (
            <button
              className="btn btn-primary col-md-2 col-4 m-3"
              onClick={() => setScheduleAdder(!scheduleAdder)}
            >
              Add Schedule
            </button>
          )}

          {selectedClinicId && scheduleAdder && (
            <ScheduleCardAdder
              doctor_id={4}
              clinic_id={selectedClinicId}
              fetchFunc={fetchSchedules}
              hideForm={setScheduleAdder}
            />
          )}
        </div>
        <h4 className="text-start">Manage Doctors</h4>
        <div className="row">
          {selectedClinicId && (
            <button
              className="btn btn-primary col-md-2 col-4 mx-3"
              onClick={() => setDoctorAdder(!doctorAdder)}
            >
              Add Existing Doctor
            </button>
          )}
          {selectedClinicId && doctorAdder && (
            <ExistingDoctorAdder
              hideForm={setDoctorAdder}
              clinic_id={selectedClinicId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageClinics;
