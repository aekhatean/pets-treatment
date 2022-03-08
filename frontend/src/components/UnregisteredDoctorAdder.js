import { Formik, Form } from "formik";
import { InputField } from "./Inputs";
import { axiosInstance } from "../api";
import { useState } from "react";
import * as Yup from "yup";

const UnRegisteredDoctorAdderCard = (props) => {
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });

  async function addUnRegisteredDoctor(values) {
    const response = await axiosInstance
      .post(`clinics/invite_doctor/`, values, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response.data));
    console.log(response.data);
    props.hideForm(false);
  }

  const validateDoctorEmail = Yup.object({
    doctor_email: Yup.string()
      .email("*invalid email format")
      .required("*email is required"),
  });

  return (
    <Formik
      initialValues={{
        doctor_email: "",
        clinic_id: props.clinic_id,
        clinic_name: props.clinic_name,
      }}
      validationSchema={validateDoctorEmail}
      onSubmit={(values) => addUnRegisteredDoctor(values)}
    >
      {(formik) => (
        <Form className="d-flex my-3">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <InputField
                  label="Doctor's Email"
                  name="doctor_email"
                  type="email"
                />
              </li>
              <li className="list-group-item">
                <button className="btn btn-primary" type="submit">
                  Send Invitation
                </button>
              </li>
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UnRegisteredDoctorAdderCard;
