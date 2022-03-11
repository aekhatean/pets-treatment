import { axiosInstance } from "../api";
import { useState, useEffect, useContext } from "react";
import ScheduleCard from "./ScheduleCardDashboard";
import ScheduleCardAdder from "./ScheduleCardAdder";
import ClinicAdder from "./ClinicAdder";
import ExistingDoctorAdder from "./ExistingDoctorAdder";
import DoctorDashboardCard from "./DoctorDashboardCard";
import UnRegisteredDoctorAdderCard from "./UnregisteredDoctorAdder";
import ClinicUpdater from "./ClinicUpdater";
import ModalDelete from "./ModalDelete";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { colors } from "../colors/colors";
import { color } from "@mui/system";

const ManageClinics = () => {
  const { lang } = useContext(LanguageContext);
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
    <div dir={lang === "en" ? "ltr" : "rtl"}>
      <div className="container-fluid">
        <h4 className={`${lang === "en" ? "text-start" : "text-end"} my-4`}>
          {lang === "en"
            ? content.en.select_a_clinic
            : content.ar.select_a_clinic}
        </h4>
        <select
          className="form-select w-50 mb-3"
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
            {lang === "en"
              ? content.en.select_a_clinic
              : content.ar.select_a_clinic}
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
            className="btn blue-bg text-white col-lg-2 col-4 mx-3 my-2"
            onClick={() => {
              setClinicUpdater(false);
              setClinicAdder(!clinicAdder);
            }}
          >
            {lang === "en"
              ? content.en.add_new_clinic
              : content.ar.add_new_clinic}
          </button>
          {selectedClinicId && isClinicOwner && (
            <>
              <button
                className="btn blonde-bg col-lg-2 col-4 mx-3 my-2"
                onClick={() => {
                  setClinicAdder(false);
                  setClinicUpdater(!clinicUpdater);
                }}
              >
                {lang === "en"
                  ? content.en.update_view_clinic
                  : content.ar.update_view_clinic}
              </button>
              <button
                className="btn btn-danger col-lg-2 col-4 mx-3 my-2"
                onClick={() => setIsModalOpen(true)}
              >
                {lang === "en"
                  ? content.en.delete_clinic
                  : content.ar.delete_clinic}
              </button>
            </>
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
              <h4
                className={`${lang === "en" ? "text-start" : "text-end"} my-4`}
              >
                {lang === "en"
                  ? content.en.clinic_schedules
                  : content.ar.clinic_schedules}
              </h4>
              <div className="row">
                {doctorSchedules.length > 0 ? (
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
                    className={`mx-3 w-50 ${
                      lang === "en" ? "text-start" : "text-end"
                    } alert text-dark primary-bg`}
                    role="alert"
                  >
                    {lang === "en"
                      ? content.en.no_schedules
                      : content.ar.no_schedules}
                  </div>
                )}
              </div>
              <div className="row">
                <button
                  className="btn blue-bg text-white col-md-2 col-4 mx-3"
                  onClick={() => setScheduleAdder(!scheduleAdder)}
                >
                  {lang === "en"
                    ? content.en.add_schedule
                    : content.ar.add_schedule}
                </button>
                {scheduleAdder && (
                  <ScheduleCardAdder
                    doctor_id={currentDoctorId}
                    clinic_id={selectedClinicId}
                    fetchFunc={fetchSchedules}
                    hideForm={setScheduleAdder}
                  />
                )}
              </div>
              <h4
                className={`${lang === "en" ? "text-start" : "text-end"} my-4`}
              >
                {lang === "en" ? content.en.doctors : content.ar.doctors}
              </h4>
              <div className="row">
                {doctors.map((doctor) => {
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
                })}
              </div>
              <div className="row mb-3">
                {isClinicOwner && (
                  <button
                    className="btn blue-bg text-white col-lg-3 col-md-4 col-5 mx-3"
                    onClick={() => {
                      setUnRegisteredDoctorAdder(false);
                      setExistingDoctorAdder(!existingDoctorAdder);
                    }}
                  >
                    {lang === "en"
                      ? content.en.add_registered_doctor
                      : content.ar.add_registered_doctor}
                  </button>
                )}
                {selectedClinicId && isClinicOwner && (
                  <button
                    className="btn blue-bg text-white col-lg-3 col-md-4 col-5 mx-3"
                    onClick={() => {
                      setExistingDoctorAdder(false);
                      setUnRegisteredDoctorAdder(!unRegisteredDoctorAdder);
                    }}
                  >
                    {lang === "en"
                      ? content.en.add_unregistered_doctor
                      : content.ar.add_unregistered_doctor}
                  </button>
                )}
              </div>
              <div className="row">
                {existingDoctorAdder && isClinicOwner && (
                  <ExistingDoctorAdder
                    hideForm={setExistingDoctorAdder}
                    clinic_id={selectedClinicId}
                    fetchDoctors={fetchDoctors}
                  />
                )}
                {unRegisteredDoctorAdder && isClinicOwner && (
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
                <div
                  className={`my-4 ${
                    lang === "en" ? "text-start" : "text-end"
                  } alert primary-bg`}
                  role="alert"
                >
                  {lang === "en"
                    ? content.en.not_verified_clinic
                    : content.ar.not_verified_clinic}
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="row">
            <div className="col-8">
              <div
                className={`my-4 ${
                  lang === "en" ? "text-start" : "text-end"
                } alert primary-bg`}
                role="alert"
              >
                {lang === "en"
                  ? content.en.no_selected_clinic
                  : content.ar.no_selected_clinic}
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
