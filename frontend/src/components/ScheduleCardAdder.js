import { Formik, Form } from "formik";
import { InputField, Select } from "./Inputs";
import { axiosInstance } from "../api";
import * as Yup from "yup";

const ScheduleCardAdder = (props) => {
  const token = "611da83882dcba101216e8002f18467fe91e32ac";
  const options = [
    { key: "Select a Week Day", value: "" },
    { key: "Saturday", value: "Saturday" },
    { key: "Sunday", value: "Sunday" },
    { key: "Monday", value: "Monday" },
    { key: "Tuesday", value: "Tuesday" },
    { key: "Wednesday", value: "Wednesday" },
    { key: "Thursday", value: "Thursday" },
    { key: "Friday", value: "Friday" },
  ];
  async function addSchedule(values) {
    const data = values;
    const response = await axiosInstance
      .post(`users/schedule/`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err));
    props.hideForm(false);
    props.fetchFunc();
  }

  const validateSchedule = Yup.object({
    day: Yup.string().required("*day is required"),
    from_time: Yup.string().required("*from time is required"),
    to_time: Yup.string().required("*to time is required"),
    appointment_duration: Yup.number()
      .typeError("*duration must be a number")
      .required("Appointment Duration is required"),
  });

  return (
    <Formik
      initialValues={{
        day: "",
        from_time: "",
        to_time: "",
        appointment_duration: "",
        doctor: props.doctor_id,
        clinic: props.clinic_id,
        active: true,
      }}
      validationSchema={validateSchedule}
      onSubmit={(values) => addSchedule(values)}
    >
      {(formik) => (
        <Form className="d-flex">
          <div className="card">
            <ul className="list-group list-group-flush">
              <div className="list-group-item">
                <Select label="Day" name="day" options={options} />
              </div>
              <li className="list-group-item">
                <InputField label="From (HH:MM)" name="from_time" type="time" />
              </li>
              <li className="list-group-item">
                <InputField label="To (HH:MM)" name="to_time" type="time" />
              </li>
              <li className="list-group-item">
                <InputField
                  label="Duration (mins)"
                  name="appointment_duration"
                  type="text"
                />
              </li>
              <li className="list-group-item">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </li>
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ScheduleCardAdder;
