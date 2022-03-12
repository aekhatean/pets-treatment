import SideBar from "../components/SideBar";
import Appointments from "../components/Appointments";
import ManageClinics from "../components/ManageClinics";
import UserManageProfile from "../components/UserManageProfile";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useContext, useState, useEffect } from "react";
import { LogingContext } from "../context/LogingContext";
import { Redirect } from "react-router-dom";
import { axiosInstance } from "../api";

const DoctorDashboard = () => {
  const { lang } = useContext(LanguageContext);
  const { is_loged } = useContext(LogingContext);
  const [doctorProfile, setDoctorProfile] = useState({});
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });

  function getDoctorProfile() {
    const response = axiosInstance
      .get("users/doctors/doctorprofile", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => res)
      .catch((e) => e.response);
    return response;
  }

  useEffect(async () => {
    const response = await getDoctorProfile();
    setDoctorProfile(response.data);
  }, []);

  function getSelections() {
    console.log(doctorProfile);
    if (doctorProfile.is_varified) {
      return [
        {
          name:
            lang === "en" ? content.en.appointments : content.ar.appointments,
          value: content.en.appointments,
          view: <Appointments />,
        },
        {
          name: lang === "en" ? content.en.clinics : content.ar.clinics,
          value: content.en.clinics,
          view: <ManageClinics />,
        },
        {
          name:
            lang === "en" ? content.en.manageProfile : content.ar.manageProfile,
          value: content.en.manageProfile,
          view: <UserManageProfile />,
        },
      ];
    } else {
      return [
        {
          name:
            lang === "en" ? content.en.manageProfile : content.ar.manageProfile,
          value: content.en.manageProfile,
          view: <UserManageProfile />,
        },
      ];
    }
  }

  if (!is_loged) {
    <Redirect to="login" />;
  }
  return <SideBar selections={getSelections()} />;
};

export default DoctorDashboard;
