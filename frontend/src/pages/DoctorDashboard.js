import SideBar from "../components/SideBar";
import Appointments from "../components/Appointments";
import ManageClinics from "../components/ManageClinics";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useContext } from "react";

const DoctorDashboard = () => {
  const { lang } = useContext(LanguageContext);
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
  ];
  return <SideBar selections={selections} />;
};

export default DoctorDashboard;
