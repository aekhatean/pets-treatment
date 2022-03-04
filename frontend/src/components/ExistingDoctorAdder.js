import { Formik, Form } from "formik";
import { InputField, Select } from "./Inputs";
import { axiosInstance } from "../api";
import { useState } from "react";
import * as Yup from "yup";

const ExistingDoctorAdder = (props) => {
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });

  async function addExistingDoctor(values) {
    const data = values;
    const response = await axiosInstance
      .post(`clinics/add_doctor_clinic/${props.clinic_id}/`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response));
    console.log(response);
    props.hideForm(false);
    // props.fetchFunc();
  }

  const validateDoctorNID = Yup.object({
    doctor_nid: Yup.string()
      .test("len", "Must be exactly 14 number", (val) => val.length === 14)
      .required("*doctor national id is required"),
  });

  return (
    <Formik
      initialValues={{
        doctor_nid: "",
      }}
      validationSchema={validateDoctorNID}
      onSubmit={(values) => addExistingDoctor(values)}
    >
      {(formik) => (
        <Form className="d-flex my-3">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <InputField
                  label="Doctor National ID"
                  name="doctor_nid"
                  type="number"
                />
              </li>
              <li className="list-group-item">
                <button className="btn btn-primary" type="submit">
                  Add to clinic
                </button>
              </li>
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExistingDoctorAdder;
