import { axiosInstance } from "../api";
import { useState, useEffect } from "react";
import ScheduleCard from "./ScheduleCardDashboard";
import ScheduleCardAdder from "./ScheduleCardAdder";
import ClinicAdder from "./ClinicAdder";
import ExistingDoctorAdder from "./ExistingDoctorAdder";
import DoctorDashboardCard from "./DoctorDashboardCard";
import UnRegisteredDoctorAdderCard from "./UnregisteredDoctorAdder";
import ClinicUpdater from "./ClinicUpdater";
import ModalDelete from "./ModalDelete";

const ManageClinics = () => {
  const [doctorClinics, setDoctorClinics] = useState([]);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedClinicId, setSelectedClinicId] = useState("");
  const [scheduleAdder, setScheduleAdder] = useState(false);
  const [clinicAdder, setClinicAdder] = useState(false);
  const [clinicUpdater, setClinicUpdater] = useState(false);
  const [existingDoctorAdder, setExistingDoctorAdder] = useState(false);
  const [unRegisteredDoctorAdder, setUnRegisteredDoctorAdder] = useState(false);
  const [isClinicOwner, setIsClinicOwner] = useState(false);
  const [isClinicVerified, setIsClinicVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      if (
        doctorClinics.find((clinic) => {
          return (
            clinic.clinic.id == selectedClinicId &&
            clinic.clinic.is_verified === true
          );
        })
      ) {
        setIsClinicVerified(true);
      } else {
        setIsClinicVerified(false);
      }
    }
  }, [selectedClinicId, doctorClinics]);

  if (doctorClinics[0]) {
    currentDoctorId = doctorClinics[0].doctor.id;
  }
  return (
    <div>
      <div className="container-fluid">
        <h4 className="text-start my-4">Select a clinic</h4>
        <select
          className="form-select w-50 primary-color mb-3"
          aria-label="Select menu"
          value={selectedClinicId}
          onChange={(e) => {
            setSelectedClinicId(e.target.value);
            setClinicUpdater(false);
            setClinicAdder(false);
            setExistingDoctorAdder(false);
            setUnRegisteredDoctorAdder(false);
            setScheduleAdder(false);
          }}
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
            className="btn btn-primary col-lg-2 col-4 mx-3 my-2"
            onClick={() => {
              setClinicUpdater(false);
              setClinicAdder(!clinicAdder);
            }}
          >
            Add New Clinic
          </button>
          {selectedClinicId && isClinicOwner && (
            <button
              className="btn btn-warning col-lg-2 col-4 mx-3 my-2"
              onClick={() => {
                setClinicAdder(false);
                setClinicUpdater(!clinicUpdater);
              }}
            >
              View & Update Clinic Data
            </button>
          )}
          {selectedClinicId && isClinicOwner && (
            <button
              className="btn btn-danger col-lg-2 col-4 mx-3 my-2"
              onClick={() => setIsModalOpen(true)}
            >
              Delete Clinic
            </button>
          )}
        </div>
        {clinicUpdater && (
          <ClinicUpdater
            clinic_id={selectedClinicId}
            hideForm={setClinicUpdater}
            fetchFunc={fetchClinics}
          />
        )}
        {clinicAdder && (
          <ClinicAdder fetchFunc={fetchClinics} hideForm={setClinicAdder} />
        )}
        {selectedClinicId ? (
          isClinicVerified ? (
            <>
              {" "}
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
                    <div
                      className="alert alert-secondary mx-3 w-50"
                      role="alert"
                    >
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
                    doctor_id={currentDoctorId}
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
                          func_fetch_doctors={fetchDoctors}
                        />
                      );
                    })
                  ) : (
                    <div
                      className="alert alert-secondary mx-3 w-50"
                      role="alert"
                    >
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
                {selectedClinicId && isClinicOwner && (
                  <button
                    className="btn btn-primary col-lg-3 col-md-4 col-5 mx-3"
                    onClick={() => {
                      setUnRegisteredDoctorAdder(false);
                      setExistingDoctorAdder(!existingDoctorAdder);
                    }}
                  >
                    Add Existing Doctor
                  </button>
                )}
                {selectedClinicId && isClinicOwner && (
                  <button
                    className="btn btn-primary col-lg-3 col-md-4 col-5 mx-3"
                    onClick={() => {
                      setExistingDoctorAdder(false);
                      setUnRegisteredDoctorAdder(!unRegisteredDoctorAdder);
                    }}
                  >
                    Add Unregistered Doctor
                  </button>
                )}
              </div>
              <div className="row">
                {selectedClinicId && existingDoctorAdder && isClinicOwner && (
                  <ExistingDoctorAdder
                    hideForm={setExistingDoctorAdder}
                    clinic_id={selectedClinicId}
                    fetchDoctors={fetchDoctors}
                  />
                )}
                {selectedClinicId &&
                  unRegisteredDoctorAdder &&
                  isClinicOwner && (
                    <UnRegisteredDoctorAdderCard
                      hideForm={setUnRegisteredDoctorAdder}
                      clinic_id={selectedClinicId}
                      clinic_name={
                        doctorClinics.length &&
                        doctorClinics.find(
                          (clinic) =>
                            clinic.clinic.id === Number(selectedClinicId)
                        ).clinic.name
                      }
                    />
                  )}
              </div>
            </>
          ) : (
            <div className="row">
              <div className="col-8">
                <div className="my-4 text-start alert alert-info" role="alert">
                  Your clinic is not verified yet, please consider checking your
                  email. Once it is verified we'll inform you and you will be
                  able to Add doctors & schedules to your clinic.
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="row">
            <div className="col-8">
              <div
                className="my-4 text-start alert alert-secondary"
                role="alert"
              >
                Select or add new clinic to open your dashboard.
              </div>
            </div>
          </div>
        )}
      </div>
      <ModalDelete
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        deleteFunc={deleteClinic}
      />
    </div>
  );
};

export default ManageClinics;
