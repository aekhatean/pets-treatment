// Packges imports
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Container, Row, Col, Spinner } from "react-bootstrap";

// Components
import TextFeild from "../components/TextField";
import { FileUpload } from "../components/Inputs";

// API consumption
import { axiosInstance } from "../api";

export default function UserProfileEdit(props) {
  const { lang } = useContext(LanguageContext);

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "First Name can't be more than 15 character")
      .required("First Name is required"),
    lastName: Yup.string()
      .max(15, "Last Name can't be more than 15 character")
      .required("Last Name required"),
    email: Yup.string().email("Invaild email").required("Email is required"),
    phone: Yup.string()
      .max(11, "Please enter valid Egyptian phone number")
      .required("Phone is required")
      .matches(/^01[0-2,5]\d{8}$/, "Must be an Egyptian phone number"),
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
            axiosInstance
              .put("/users/profilelist", data, {
                headers: {
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              })
              .then((res) => console.log(res))
              .catch((e) => console.error(e.response));
          }}
        >
          {(formProps) => {
            const { values, handleSubmit, setFieldValue } = formProps;
            return (
              <Row>
                <Col md={8}>
                  <Form
                    onSubmit={handleSubmit}
                    className={`text-md-start mb-5 mt-5 ${
                      lang === "en" ? "text-start" : "text-end"
                    }`}
                  >
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
                      <option value="None">{content[lang].select_city}</option>
                      <option value="Giza">{content[lang].giza}</option>
                      <option value="Cairo">{content[lang].cairo}</option>
                    </Field>
                    <br />
                    <Field
                      component={FileUpload}
                      name="picture"
                      label={content[lang].profilePicture}
                      className={`${lang === "en" ? "text-start" : "text-end"}`}
                    />
                    <div class="d-flex justify-content-between">
                      <button className="btn mt-3 btn-info" type="submit">
                        {content[lang].save}
                      </button>
                    </div>
                  </Form>
                </Col>
              </Row>
            );
          }}
        </Formik>
      </Container>
    );
  } else {
    return <Spinner animation="border" variant="info" />;
  }
}
