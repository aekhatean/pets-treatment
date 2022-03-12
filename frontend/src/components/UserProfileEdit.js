// Packges imports
import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import ModalSuccess from "./ModalSuccess";
import ModalFail from "./ModalFail";
// Components
import TextFeild from "../components/TextField";
import { FileUpload } from "../components/Inputs";

// API consumption
import { axiosInstance } from "../api";

export default function UserProfileEdit(props) {
  const { lang } = useContext(LanguageContext);
  const [isModalFailOpen, setIsModalFailOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, content[lang].invalid_firstname)
      .required(content[lang].required),
    lastName: Yup.string()
      .max(15, content[lang].invalid_lastname)
      .required(content[lang].required),
    email: Yup.string()
      .email(content[lang].invalid_email)
      .required(content[lang].required),
    phone: Yup.string()
      .max(11, content[lang].phone_count_valid)
      .required(content[lang].required)
      .matches(/^01[0-2,5]\d{8}$/, content[lang].invalid_phone),
  });

  const userData = props.userData;
  if (userData && Object.keys(userData).length) {
    return (
      <Container>
        <Formik
          initialValues={{
            picture: "",
            firstName: userData.user.first_name,
            lastName: userData.user.last_name,
            email: userData.user.email,
            country: userData.country,
            city: userData.city,
            phone: userData.phone,
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            const data = {
              ...userData,
              phone: values.phone,
              country: values.country,
              city: values.city,
              picture: values.picture,
              user: {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
              },
            };
            setIsUpdating(true);
            axiosInstance
              .put("/users/profilelist", data, {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                setIsUpdating(false);
                res.status === 200 && setIsModalSuccessOpen(true);
              })
              .catch((e) => {
                setIsUpdating(false);
                setIsModalFailOpen(true);
              });
          }}
        >
          {(formProps) => {
            const { values, handleSubmit, setFieldValue } = formProps;
            return (
              <Row>
                <Col md={8}>
                  <Form onSubmit={handleSubmit} className={`mb-5 mt-5`}>
                    <TextFeild
                      label={content[lang].fist_name}
                      name="firstName"
                      type="text"
                      mx_status="a"
                      flex_status="a"
                    />
                    <TextFeild
                      label={content[lang].last_name}
                      name="lastName"
                      type="text"
                    />
                    <TextFeild
                      label={content[lang].email}
                      name="email"
                      type="email"
                    />
                    <TextFeild
                      label={content[lang].phone}
                      name="phone"
                      type="text"
                    />
                    <label
                      htmlFor="country"
                      className={`${lang === "en" ? "text-start" : "text-end"}`}
                    >
                      {content[lang].country}
                    </label>
                    <Field
                      as="select"
                      name="country"
                      id="country"
                      className="form-select"
                      disabled
                    >
                      <option value="egypt">{content[lang].egypt}</option>
                    </Field>
                    <label
                      htmlFor="city"
                      className={`mt-3 ${
                        lang === "en" ? "text-start" : "text-end"
                      }`}
                    >
                      {content[lang].city}
                    </label>
                    <div>
                      <Field
                        id="city"
                        name="city"
                        as="select"
                        value={values.city}
                        className={`form-select ${
                          lang === "en" ? "text-start" : "text-end"
                        }`}
                        onChange={async (e) => {
                          const { value } = e.target;
                          setFieldValue("city", value);
                        }}
                      >
                        <option value="None">
                          {content[lang].select_city}
                        </option>
                        <option value="Giza">{content[lang].giza}</option>
                        <option value="Cairo">{content[lang].cairo}</option>
                      </Field>
                    </div>

                    <Field
                      component={FileUpload}
                      name="picture"
                      label={content[lang].profilePicture}
                      className={`${lang === "en" ? "text-start" : "text-end"}`}
                    />
                    <div class="d-flex justify-content-between">
                      <button
                        className="btn mt-3 blue-bg text-white"
                        type="submit"
                        disabled={isUpdating ? true : false}
                      >
                        {content[lang].save}
                      </button>
                      {isUpdating && (
                        <div
                          className="spinner-border text-dark mx-3"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </div>
                  </Form>
                </Col>
              </Row>
            );
          }}
        </Formik>
        <ModalSuccess
          setIsModalOpen={setIsModalSuccessOpen}
          isModalOpen={isModalSuccessOpen}
          successText={
            lang === "en"
              ? content.en.profile_updated
              : content.ar.profile_updated
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
      </Container>
    );
  } else {
    return <Spinner animation="border" variant="info" />;
  }
}
