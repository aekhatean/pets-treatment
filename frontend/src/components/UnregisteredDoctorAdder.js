import { Formik, Form } from "formik";
import { InputField } from "./Inputs";
import { axiosInstance } from "../api";
import { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import * as Yup from "yup";
import ModalSuccess from "./ModalSuccess";
import ModalFail from "./ModalFail";

const UnRegisteredDoctorAdderCard = (props) => {
  const { lang } = useContext(LanguageContext);
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isModalFailOpen, setIsModalFailOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);

  function addUnRegisteredDoctor(values) {
    setIsSendingEmail(true);
    const response = axiosInstance
      .post(`clinics/invite_doctor/`, values, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setIsSendingEmail(false);
        return res;
      })
      .catch((err) => err.response);
    return response;
  }

  const validateDoctorEmail = Yup.object({
    doctor_email: Yup.string()
      .email(
        lang === "en" ? content.en.invalid_email : content.ar.invalid_email
      )
      .required(lang === "en" ? content.en.required : content.ar.required),
  });

  return (
    <Formik
      initialValues={{
        doctor_email: "",
        clinic_id: props.clinic_id,
        clinic_name: props.clinic_name,
      }}
      validationSchema={validateDoctorEmail}
      onSubmit={async (values) => {
        const res = await addUnRegisteredDoctor(values);
        if (res.status === 200) {
          setIsModalSuccessOpen(true);
        } else {
          setIsModalFailOpen(true);
        }
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
                      ? content.en.doctor_email
                      : content.ar.doctor_email
                  }
                  name="doctor_email"
                  type="email"
                />
              </li>
              <li className="list-group-item d-flex align-items-center justify-content-center">
                <button
                  className="btn blue-bg text-white"
                  type="submit"
                  disabled={formik.isSubmitting ? true : false}
                >
                  {lang === "en"
                    ? content.en.send_invitation
                    : content.ar.send_invitation}
                </button>
                {formik.isSubmitting && isSendingEmail && (
                  <div className="spinner-border text-dark mx-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </li>
            </ul>
            <ModalSuccess
              setIsModalOpen={setIsModalSuccessOpen}
              isModalOpen={isModalSuccessOpen}
              successText={
                lang === "en"
                  ? content.en.invitation_sent
                  : content.ar.invitation_sent
              }
              hideFunc={props.hideForm}
            />
            <ModalFail
              setIsModalOpen={setIsModalFailOpen}
              isModalOpen={isModalFailOpen}
              errorText={
                lang === "en"
                  ? content.en.error_general_msg
                  : content.ar.error_general_msg
              }
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UnRegisteredDoctorAdderCard;
