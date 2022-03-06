import { axiosInstance } from "../api";
import { useState, useEffect } from "react";
import ScheduleCard from "./ScheduleCard";
import ScheduleCardAdder from "./ScheduleCardAdder";
import ClinicAdder from "./ClinicAdder";
import ExistingDoctorAdder from "./ExistingDoctorAdder";
import DoctorDashboardCard from "./DoctorDashboardCard";

const ManageClinics = () => {
  const [doctorClinics, setDoctorClinics] = useState([]);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [scheduleAdder, setScheduleAdder] = useState(false);
  const [clinicAdder, setClinicAdder] = useState(false);
  const [doctorAdder, setDoctorAdder] = useState(false);
  const [isClinicOwner, setIsClinicOwner] = useState(false);

  let currentDoctorId = 0;

  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });

  async function fetchClinics() {
    const response = await axiosInstance
      .get("users/doctors/clinics", {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response));
    setDoctorClinics(response.data);
  }

  async function deleteClinic() {
    await axiosInstance
      .delete(`clinics/delete_clinic/${selectedClinicId}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response));
    setSelectedClinicId("");
    fetchClinics();
  }
  async function fetchSchedules() {
    const response = await axiosInstance
      .get(`users/schedule/one_clinic_one_doctor/${selectedClinicId}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response));
    setDoctorSchedules(response.data);
  }
  async function fetchDoctors() {
    const response = await axiosInstance
      .get(`users/doctors/own_clinics/${selectedClinicId}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response));
    setDoctors(response.data);
  }

  useEffect(() => {
    fetchClinics();
  }, []);

  useEffect(() => {
    if (selectedClinicId) {
      fetchSchedules();
      fetchDoctors();
      if (
        doctorClinics.find((clinic) => {
          return (
            clinic.clinic.id == selectedClinicId && clinic.clinic_owner === true
          );
        })
      ) {
        setIsClinicOwner(true);
      } else {
        setIsClinicOwner(false);
      }
    }
  }, [selectedClinicId]);

  if (doctorClinics[0]) {
    currentDoctorId = doctorClinics[0].doctor.id;
  }
  return (
    <div>
      <div className="container">
        <h4 className="text-start my-4">Select a clinic</h4>
        <select
          className="form-select w-25 primary-color mb-3"
          aria-label="Select menu"
          value={selectedClinicId}
          onChange={(e) => setSelectedClinicId(e.target.value)}
        >
          <option defaultValue value="">
            Select a clinic..
          </option>
          {doctorClinics.map((doctorClinic) => {
            return (
              <option
                key={doctorClinic.clinic.id}
                value={doctorClinic.clinic.id}
              >
                {doctorClinic.clinic.name}
              </option>
            );
          })}
        </select>
        <div className="row">
          <button
            className="btn btn-primary col-md-2 col-4 mx-3"
            onClick={() => setClinicAdder(!clinicAdder)}
          >
            Add New Clinic
          </button>
          {selectedClinicId && isClinicOwner && (
            <button
              className="btn btn-danger col-md-2 col-4 mx-3"
              onClick={deleteClinic}
            >
              Delete Clinic
            </button>
          )}
          {clinicAdder && (
            <ClinicAdder fetchFunc={fetchClinics} hideForm={setClinicAdder} />
          )}
        </div>
        <h4 className="my-4 text-start">Edit Schedule</h4>
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
              Select a clinic to view, edit, or delete your schedules.
            </div>
          )}
        </div>
        <div className="row">
          {selectedClinicId && (
            <button
              className="btn btn-primary col-md-2 col-4 mx-3"
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
        <h4 className="text-start my-4">Manage Doctors</h4>
        <div className="row">
          {selectedClinicId ? (
            doctors.length > 0 ? (
              doctors.map((doctor) => {
                return (
                  <DoctorDashboardCard
                    key={doctor.id}
                    doctor={doctor}
                    clinic_id={selectedClinicId}
                    func_clinic_id={setSelectedClinicId}
                    func_fetch_clinics={fetchClinics}
                    current_doctor_id={currentDoctorId}
                    is_owner={isClinicOwner}
                  />
                );
              })
            ) : (
              <div className="alert alert-secondary mx-3 w-50" role="alert">
                This clinic doesn't have any doctors, add a doctor below.
              </div>
            )
          ) : (
            <div className="alert alert-secondary mx-3 w-50" role="alert">
              Select a clinic to view, add, or delete doctors.
            </div>
          )}
        </div>
        <div className="row mb-3">
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
