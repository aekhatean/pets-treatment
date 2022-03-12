import SideBar from "../components/SideBar";
import Appointments from "../components/Appointments";
import ManageClinics from "../components/ManageClinics";
import UserManageProfile from "../components/UserManageProfile";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useContext } from "react";
import { LogingContext } from "../context/LogingContext";
import { Redirect } from "react-router-dom";

const DoctorDashboard = () => {
  const { lang } = useContext(LanguageContext);
  const { is_loged } = useContext(LogingContext);

  const selections = [
    {
      name: lang === "en" ? content.en.appointments : content.ar.appointments,
      value: content.en.appointments,
      view: <Appointments />,
    },
    {
      name: lang === "en" ? content.en.clinics : content.ar.clinics,
      value: content.en.clinics,
      view: <ManageClinics />,
    },
    {
      name: lang === "en" ? content.en.manageProfile : content.ar.manageProfile,
      value: content.en.manageProfile,
      view: <UserManageProfile />,
    },
  ];
  if (!is_loged) {
    <Redirect to="login" />;
  }
  return <SideBar selections={selections} />;
};

export default DoctorDashboard;
