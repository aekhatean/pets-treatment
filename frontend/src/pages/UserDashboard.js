import SideBar from "../components/SideBar";
import UserAppointments from "../components/UserAppointments";
import UserManageProfile from "../components/UserManageProfile";
import { content } from "../translation/translation";
import { LanguageContext } from "../context/LanguageContext";
import { useContext } from "react";
import { LogingContext } from "../context/LogingContext";
import { Redirect } from "react-router-dom";

function UserDashboard() {
  const { lang } = useContext(LanguageContext);
  const { is_loged } = useContext(LogingContext);

  const selections = [
    {
      name: lang === "en" ? content.en.manageProfile : content.ar.manageProfile,
      value: content.en.manageProfile,
      view: <UserManageProfile />,
    },
    {
      name: lang === "en" ? content.en.appointments : content.ar.appointments,
      value: content.en.appointments,
      view: <UserAppointments />,
    },
  ];
  if (!is_loged) {
    <Redirect to="login" />;
  }
  return (
    <div id="user-dashbaord">
      <SideBar selections={selections} />
    </div>
  );
}

export default UserDashboard;
