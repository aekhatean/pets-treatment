import SideBar from "../components/SideBar";
import Appointments from "../components/Appointments";
import ManageClinics from "../components/ManageClinics";

const DoctorDashboard = () => {
  const selections = [
    { name: "Appointments", view: <Appointments /> },
    { name: "Manage Clinics", view: <ManageClinics /> },
  ];
  return <SideBar selections={selections} />;
};

export default DoctorDashboard;
