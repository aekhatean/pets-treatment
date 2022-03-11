import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import TextFeild from "../components/TextField";
import * as Yup from "yup";
import { Input } from "reactstrap";
import axios from "axios";
import { Container } from "react-bootstrap";
import { colors } from "../colors/colors";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { LogingContext } from "../context/LogingContext";
import { useHistory } from "react-router-dom";
function Login() {
  let history = useHistory();
  const { is_loged, setLogging } = useContext(LogingContext);
  const { lang, setLang } = useContext(LanguageContext);
  const validate = Yup.object({
    email: Yup.string()
      .email(content[lang].invalid_email)
      .required(content[lang].required),
    password: Yup.string().required(content[lang].required),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        const data = {
          password: values.password,
          email: values.email,
        };

        await axios
          .post("http://127.0.0.1:8000/users/login/", data)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("user_id", response.data.user['id']);
            setLogging(true);
            history.push('/');
          })
          .catch((e) => {
            console.log(e);
            setLogging(false);
          });
          
          
      }}
    >
      {(formProps) => {
        const {
          values,
          notValid,
          isSubmitting,
          handleChange,
          handleSubmit,
          handleReset,
          setFieldValue,
        } = formProps;
        return (
          <Container className="p-5 my-5 shadow" dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{width:'50%'}}>
            <h1 className="my-4 font-weight-bold-display-4">
              {content[lang].login}
            </h1>

            <Form onSubmit={handleSubmit}>
              <TextFeild
                label={content[lang].email}
                name="email"
                type="email"
              />
              <TextFeild
                label={content[lang].password}
                name="password"
                type="password"
              />

              <button
                className="btn mt-3 btn-outline-dark"
                type="submit"
                style={{
                  marginRight: "10px",
                  backgroundColor: colors.bg.primary,
                  border: "none",
                }}
              >
                {content[lang].submit}
              </button>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}

export default Login;
