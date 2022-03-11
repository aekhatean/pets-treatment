import { Formik, Form } from "formik";
import { InputField } from "./Inputs";
import { axiosInstance } from "../api";
import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import ModalFail from "./ModalFail";
import * as Yup from "yup";

const ExistingDoctorAdder = (props) => {
  const { lang } = useContext(LanguageContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });

  function addExistingDoctor(values) {
    const data = values;
    const response = axiosInstance
      .post(`clinics/add_doctor_clinic/${props.clinic_id}/`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        props.hideForm(false);
        props.fetchDoctors();
        return res.status;
      })
      .catch((err) => err.response.status);
    return response;
  }
  const validateDoctorNID = Yup.object().shape({
    doctor_nid: Yup.string()
      .required(lang === "en" ? content.en.required : content.ar.required)
      .test(
        "len",
        lang === "en" ? content.en.nid_valid : content.ar.nid_valid,
        (val) => val && val.length === 14
      ),
  });

  return (
    <Formik
      initialValues={{
        doctor_nid: "",
      }}
      validationSchema={validateDoctorNID}
      onSubmit={async (values) => {
        const status = await addExistingDoctor(values);
        status === 404 && setIsModalOpen(true);
      }}
    >
      {(formik) => (
        <Form className="d-flex my-3">
          <div className="card shadow">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <InputField
                  label={
                    lang === "en"
                      ? content.en.doctor_nid
                      : content.ar.doctor_nid
                  }
                  name="doctor_nid"
                  type="number"
                />
              </li>
              <li className="list-group-item">
                <button className="btn blue-bg text-white" type="submit">
                  {lang === "en"
                    ? content.en.add_to_clinic
                    : content.ar.add_to_clinic}
                </button>
              </li>
            </ul>
          </div>
          <ModalFail
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            errorText={
              lang === "en"
                ? content.en.no_doc_with_nid
                : content.ar.no_doc_with_nid
            }
          />
        </Form>
      )}
    </Formik>
  );
};

export default ExistingDoctorAdder;
