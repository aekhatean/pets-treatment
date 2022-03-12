import { Formik, Form } from "formik";
import { InputField, TextAreaField } from "./Inputs";
import * as Yup from "yup";
import { content } from "../translation/translation";
import React, { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { colors } from "../colors/colors";
import { axiosAuthInstance } from "../api";
import { Button, Modal } from "react-bootstrap";

const ContactUs = () => {
  const { lang } = useContext(LanguageContext);
  const [popMessage, setPopMessage] = useState(false);
  const validate = Yup.object({
    name: Yup.string()
      .min(3, content[lang].name_len_valid)
      .required(content[lang].required),
    email: Yup.string()
      .email(content[lang].invalid_email)
      .required(content[lang].required),
    message: Yup.string()
      .min(50, content[lang].message_len_valid)
      .required(content[lang].required),
  });
  const submitMessage = (values, actions) => {
    const data = values;
    axiosAuthInstance.post(`support/`, data).catch((err) => console.error(err));
    actions.resetForm();
    setPopMessage(true);
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          message: "",
        }}
        validationSchema={validate}
        onSubmit={(values, actions) => submitMessage(values, actions)}
      >
        {(formik) => (
          <Form className="mx-3">
            <div className="d-flex flex-column">
              <h4 className="fw-bold py-3">
                {lang === "ar" ? content.ar.contact_us : content.en.contact_us}
              </h4>
              <InputField
                label={lang === "ar" ? content.ar.name : content.en.name}
                name="name"
                type="text"
              />
              <InputField
                label={lang === "ar" ? content.ar.email : content.en.email}
                name="email"
                type="email"
              />
              <TextAreaField
                label={lang === "ar" ? content.ar.message : content.en.message}
                name="message"
                rows="4"
                columns="50"
              />
              <button
                className="btn text-white mt-2 w-25 align-self-end"
                name="submit"
                type="submit"
                style={{ backgroundColor: colors.bg.blue }}
              >
                {lang === "ar" ? content.ar.send : content.en.send}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Modal
        show={popMessage}
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="my-3 "
      >
        <Modal.Body
          className="text-center p-5 shadow"
          style={{
            backgroundColor: colors.bg.light,
            borderColor: colors.bg.blond,
          }}
        >
          <p>{content[lang].support_message_confirm}</p>

          <Button
            onClick={() => setPopMessage(false)}
            className="btn-light mt-3 shadow-sm rounded"
            style={{
              backgroundColor: colors.bg.primary,
              borderColor: colors.bg.blond,
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContactUs;
