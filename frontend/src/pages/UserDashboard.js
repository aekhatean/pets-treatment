import SideBar from "../components/SideBar";
// import UserAppointments from "../components/UserAppointments";
import UserManageProfile from "../components/UserManageProfile";

function UserDashboard(props) {
  const selections = [
    // { name: "My appointments", view: <UserAppointments /> },
    { name: "Manage profile", view: <UserManageProfile /> },
  ];
  console.log(selections)
  return (
    <div id="clinic-dashbaord">
      <SideBar selections={selections} />
    </div>
  );
}

export default UserDashboard;
