import SideBar from "../components/SideBar";
import UserAppointments from "../components/UserAppointments";
import UserManageProfile from "../components/UserManageProfile";
import { content } from "../translation/translation";
import { LanguageContext } from "../context/LanguageContext";
import { useContext } from "react";

function UserDashboard() {
  const { lang } = useContext(LanguageContext);
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

  return (
    <div id="user-dashbaord">
      <SideBar selections={selections} />
    </div>
  );
}

export default UserDashboard;
