import SideBar from "../components/SideBar";
import UserAppointments from "../components/UserAppointments";
import UserManageProfile from "../components/UserManageProfile";

function UserDashboard() {
  const selections = [
    {
      name: "Manage profile",
      value: "Manage profile",
      view: <UserManageProfile />,
    },
    {
      name: "My appointments",
      value: "My appointments",
      view: <UserAppointments />,
    },
  ];

  return (
    <div id="clinic-dashbaord">
      <SideBar selections={selections} />
    </div>
  );
}

export default UserDashboard;
