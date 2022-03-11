import { Formik, Form } from "formik";
import { InputField, Select } from "./Inputs";
import { axiosInstance } from "../api";
import { useState, useContext } from "react";
import * as Yup from "yup";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";

const ScheduleCardAdder = (props) => {
  const { lang } = useContext(LanguageContext);
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  const options = [
    {
      key: lang === "en" ? content.en.select_day : content.ar.select_day,
      value: "",
    },
    {
      key:
        lang === "en"
          ? content.en.weekdays.saturday
          : content.ar.weekdays.saturday,
      value: "Saturday",
    },
    {
      key:
        lang === "en" ? content.en.weekdays.sunday : content.ar.weekdays.sunday,
      value: "Sunday",
    },
    {
      key:
        lang === "en" ? content.en.weekdays.monday : content.ar.weekdays.monday,
      value: "Monday",
    },
    {
      key:
        lang === "en"
          ? content.en.weekdays.tuesday
          : content.ar.weekdays.tuesday,
      value: "Tuesday",
    },
    {
      key:
        lang === "en"
          ? content.en.weekdays.wednesday
          : content.ar.weekdays.wednesday,
      value: "Wednesday",
    },
    {
      key:
        lang === "en"
          ? content.en.weekdays.thursday
          : content.ar.weekdays.thursday,
      value: "Thursday",
    },
    {
      key:
        lang === "en" ? content.en.weekdays.friday : content.ar.weekdays.friday,
      value: "Friday",
    },
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
    day: Yup.string().required(
      lang === "en" ? content.en.required : content.ar.required
    ),
    from_time: Yup.string().required(
      lang === "en" ? content.en.required : content.ar.required
    ),
    to_time: Yup.string().required(
      lang === "en" ? content.en.required : content.ar.required
    ),
    appointment_duration: Yup.number()
      .typeError(
        lang === "en"
          ? content.en.field_number_valid
          : content.ar.field_number_valid
      )
      .required(lang === "en" ? content.en.required : content.ar.required),
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
      onSubmit={(values) => {
        addSchedule(values);
      }}
    >
      {(formik) => (
        <Form className="d-flex my-3">
          <div className="card shadow">
            <ul className="list-group list-group-flush">
              <div className="list-group-item">
                <Select
                  label={lang === "en" ? content.en.day : content.ar.day}
                  name="day"
                  options={options}
                />
              </div>
              <li className="list-group-item">
                <InputField
                  label={lang === "en" ? content.en.from : content.ar.from}
                  name="from_time"
                  type="time"
                />
              </li>
              <li className="list-group-item">
                <InputField
                  label={lang === "en" ? content.en.to : content.ar.to}
                  name="to_time"
                  type="time"
                />
              </li>
              <li className="list-group-item">
                <InputField
                  label={`${
                    lang === "en" ? content.en.duration : content.ar.duration
                  }(${lang === "en" ? content.en.mins : content.ar.mins})`}
                  name="appointment_duration"
                  type="text"
                />
              </li>
              <li className="list-group-item">
                <button className="btn blue-bg text-white" type="submit">
                  {lang === "en" ? content.en.save : content.ar.save}
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
