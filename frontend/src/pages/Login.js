import React, { useContext, useState } from "react";
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
import login_cat from "../assets/login_cat.png";
import doctordog from "../assets/doctordog.png";
function Login() {
  let history = useHistory();
  const [isLoginValid, setIsLoginValid] = useState(true);
  const { is_loged, setLogging } = useContext(LogingContext);
  const { lang, setLang } = useContext(LanguageContext);
  const validate = Yup.object({
    email: Yup.string()
      .email(content[lang].invalid_email)
      .required(content[lang].required),
    password: Yup.string().required(content[lang].required),
  });

  return (
    <>
    <img src={login_cat} alt="catty" />
    
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
            console.log(response);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            // console.log(response.data);
            // localStorage.setItem("user_id", response.data.user['id']);
            setIsLoginValid(true);
            setLogging(true);
            history.push("/");
          })
          .catch((e) => {
            console.log(e);
            setIsLoginValid(false);
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
          
          <Container className="p-5 mb-5 shadow" dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{width:'50%', borderRadius:20}}>
            <span className="center">
            
            <h1 className=" font-weight-bold-display-4" style={{display: "inline"}}>
                {content[lang].login}
            </h1>
            
          </span>

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

              {!isLoginValid && (
                <p className={`text-danger`}>
                  {" "}
                  {content[lang].wrong_auth_login}{" "}
                </p>
              )}

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
    </>
  );
}

export default Login;
