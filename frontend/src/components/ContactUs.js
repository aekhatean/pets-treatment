import { Formik, Form } from "formik";
import { InputField, TextAreaField } from "./Inputs";
import * as Yup from "yup";
import { content } from "../translation/translation";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { colors } from "../colors/colors";
import { axiosAuthInstance } from "../api";

const ContactUs = () => {
  const { lang } = useContext(LanguageContext);
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
  const submitMessage = (values) => {
    const data = values;
    axiosAuthInstance.post(`support/`, data).catch((err) => console.error(err));
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => submitMessage(values)}
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
  );
};

export default ContactUs;
