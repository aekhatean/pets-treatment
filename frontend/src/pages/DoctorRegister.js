import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextFeild from "../components/TextField";
import * as Yup from "yup";
import { Input } from "reactstrap";
import { Container } from "react-bootstrap";
import axios from "axios";
import imageToBase64 from "image-to-base64/browser";
import { axiosInstance } from "../api";
import { colors } from "../colors/colors";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";

import { useHistory, Redirect } from "react-router-dom";
import { FileUpload } from "../components/Inputs";
import ModalSuccess from "../components/ModalSuccess";
import { LogingContext } from "../context/LogingContext";
import ModalFail from "../components/ModalFail";
import login_cat from "../assets/login_cat.png";
import {
  checkForImageFormat,
  checkForImageSize,
} from "../components/ClinicAdder";

function DoctorRegister() {
  const { lang, setLang } = useContext(LanguageContext);
  const [modal, setModal] = useState(undefined);
  const [errorModal, setErrorModal] = useState(undefined);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const { is_loged, setLogging } = useContext(LogingContext);

  const [isModalFailOpen, setIsModalFailOpen] = useState(false);

  let history = useHistory();
  const redic = () => {
    history.push("/");
  };
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, content[lang].invalid_firstname)
      .required(content[lang].required),
    lastName: Yup.string()
      .max(15, content[lang].invalid_lastname)
      .required(content[lang].required),
    username: Yup.string()
      .max(15, content[lang].invalid_username)
      .required(content[lang].required),
    email: Yup.string()
      .email(content[lang].invalid_email)
      .required(content[lang].required),
    password: Yup.string()
      .min(8, content[lang].invalid_password)
      .required(content[lang].required),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], content[lang].invalid_matching)
      .required(content[lang].required),
    description: Yup.string()
      .max(1000, content[lang].invalid_description)
      .required(content[lang].required),
    // numbers not chars
    national_id: Yup.number()
      .typeError(content[lang].field_number_valid)
      // .max(14, content[lang].invalid_national_id_min)
      // .min(14, content[lang].invalid_national_id_max)
      .test(
        "nat_id_length",
        content[lang].invalid_national_id_min,
        (nat_id) => {
          return nat_id && nat_id.toString().length === 14;
        }
      )
      .required(content[lang].required),
    username: Yup.string()
      .max(20, content[lang].invalid_username)
      .required(content[lang].required),

    phone: Yup.string()
      .required(content[lang].required)
      .matches(/^01[0-2,5]\d{8}$/, content[lang].invalid_phone),

    // specialization: Yup.array().min(1, content[lang].required),

    syndicate_id: Yup.mixed()
      .nullable()
      .required(lang === "en" ? content.en.required : content.ar.required)
      .test(
        "imageFormat",
        lang === "en" ? content.en.image_type_err : content.ar.image_type_err,
        (image) => checkForImageFormat(image)
      )
      .test(
        "imageSize",
        lang === "en" ? content.en.image_size_err : content.ar.image_size_err,
        (image) => checkForImageSize(image)
      ),

    photo: Yup.mixed()
      .nullable()
      .required(lang === "en" ? content.en.required : content.ar.required)
      .test(
        "imageFormat",
        lang === "en" ? content.en.image_type_err : content.ar.image_type_err,
        (image) => checkForImageFormat(image)
      )
      .test(
        "imageSize",
        lang === "en" ? content.en.image_size_err : content.ar.image_size_err,
        (image) => checkForImageSize(image)
      ),

    city: Yup.string().required(content[lang].required),

    area: Yup.string().required(content[lang].required),
  });

  const getareas = (city) => {
    // Simulate async call
    return new Promise((resolve, reject) => {
      switch (city) {
        case "Giza":
          resolve([
            { value: "dokki", label: content[lang].dokki },
            { value: "6th_october", label: content[lang].th_october },
          ]);
          break;
        case "Cairo":
          resolve([
            { value: "nasr_city", label: content[lang].nasr_city },
            { value: "shoubra", label: content[lang].shoubra },
          ]);
          break;
        default:
          resolve([]);
      }
    });
  };

  const [specializationsList, setSpecialization] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`users/doctors/specialities/`)
      .then((res) => {
        if (res.status === 200) {
          setSpecialization(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (is_loged) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <img src={login_cat} alt="catty" />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          description: "",
          national_id: "",
          phone: "",
          country: content[lang].egypt,
          city: "",
          area: "",
          areas: [],
          syndicate_id: "",
          photo: "",
          specialization: [],
          username: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          console.log(values);
          const data = {
            profile: {
              user: {
                first_name: values.firstName,
                last_name: values.lastName,
                password: values.password,
                email: values.email,
                username: values.username,
              },
              country: values.country,
              city: values.city,
              area: values.area,
              phone: values.phone,
              picture: values.photo,
              role: "DR",
            },
            description: values.description,
            syndicate_id: values.syndicate_id,
            national_id: values.national_id,
            specialization: values.special,
          };
          axios
            .post("http://127.0.0.1:8000/users/doctors/new", data)
            .then((response) => {
              response.status === 201 && setIsModalSuccessOpen(true);
            })
            .catch((e) => {
              setIsModalFailOpen(true);
            });

          // history.push('/');
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
            <Container
              className="p-5 mb-5 shadow"
              dir={lang === "ar" ? "rtl" : "ltr"}
              style={{ width: "50%", borderRadius: 20 }}
            >
              <span className="center">
                <h1
                  className=" font-weight-bold-display-4"
                  style={{ display: "inline" }}
                >
                  {content[lang].register_doctor}
                </h1>
              </span>

              <Form onSubmit={handleSubmit}>
                <TextFeild
                  label={content[lang].fist_name}
                  name="firstName"
                  type="text"
                />
                <TextFeild
                  label={content[lang].last_name}
                  name="lastName"
                  type="text"
                />
                <TextFeild
                  label={content[lang].username}
                  name="username"
                  type="text"
                />
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
                <TextFeild
                  label={content[lang].confirm_password}
                  name="confirmPassword"
                  type="password"
                />
                <TextFeild
                  label={content[lang].description}
                  name="description"
                  type="text"
                />
                <TextFeild
                  label={content[lang].national_id}
                  name="national_id"
                  type="text"
                />
                <TextFeild
                  label={content[lang].phone}
                  name="phone"
                  type="text"
                />
                <div
                  className={
                    lang === "ar" ? "mb-3 text-end" : "mb-3 text-start"
                  }
                >
                  <Field
                    name="photo"
                    component={FileUpload}
                    label={content[lang].profilePicture}
                    isCardStyles={false}
                  />
                </div>

                <div
                  className={
                    lang === "ar" ? "mb-3 text-end" : "mb-3 text-start"
                  }
                >
                  <Field
                    name="syndicate_id"
                    component={FileUpload}
                    label={content[lang].syndicate_id}
                    isCardStyles={false}
                  />
                </div>

                <div
                  className={
                    lang === "ar" ? "mb-3 text-end" : "mb-3 text-start"
                  }
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <label className="form-label" htmlFor="country">
                    {content[lang].country}
                  </label>
                  <Field
                    as="select"
                    name="country"
                    id="country"
                    className="form-select"
                  >
                    <option value="egypt">{content[lang].egypt}</option>
                  </Field>
                  <ErrorMessage
                    name={"country"}
                    component="div"
                    style={{ color: "red" }}
                    className="error"
                  />
                </div>

                <div
                  className={
                    lang === "ar" ? "mb-3 text-end" : "mb-3 text-start"
                  }
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <label className="form-label" htmlFor="city">
                    {content[lang].city}
                  </label>
                  <Field
                    dir={lang === "ar" ? "rtl" : "ltr"}
                    id="city"
                    name="city"
                    as="select"
                    className="form-select"
                    controlId="validationFormik05"
                    value={values.city}
                    onChange={async (e) => {
                      const { value } = e.target;
                      const _areas = await getareas(value);
                      // console.log(_areas);
                      setFieldValue("city", value);
                      setFieldValue("area", "");
                      setFieldValue("areas", _areas);
                    }}
                  >
                    <option className="m-2" value="None">
                      {content[lang].select_city}
                    </option>
                    <option value="Giza">{content[lang].giza}</option>
                    <option value="Cairo">{content[lang].cairo}</option>
                  </Field>
                  <ErrorMessage
                    name={"city"}
                    component="div"
                    style={{ color: "red" }}
                    className="error"
                  />
                </div>

                <div
                  className={
                    lang === "ar" ? "mb-3 text-end" : "mb-3 text-start"
                  }
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <label className="form-label" htmlFor="area">
                    {content[lang].area}
                  </label>
                  <Field
                    value={values.area}
                    id="area"
                    name="area"
                    as="select"
                    className="form-select"
                    controlId="validationFormik05"
                    onChange={handleChange}
                  >
                    <option value="None">{content[lang].select_area}</option>
                    {values.areas &&
                      values.areas.map((a) => (
                        <option key={a.value} value={a.value}>
                          {a.label}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage
                    name={"area"}
                    component="div"
                    style={{ color: "red" }}
                    className="error"
                  />
                </div>

                <div
                  className={
                    lang === "ar" ? "mb-3 text-end" : "mb-3 text-start"
                  }
                >
                  <label className="form-label" htmlFor="special">
                    {content[lang].specialization}
                  </label>

                  <Field
                    as="select"
                    className="form-select"
                    controlId="validationFormik05"
                    value={values.special && values.special[0].name}
                    name="special"
                    id="special"
                    onChange={(e) => {
                      let arr = [];
                      arr.push({ name: e.target.value });
                      setFieldValue("special", arr);
                    }}
                  >
                    <option value="" label="Select a specialization" />
                    {specializationsList.map((spec) => (
                      <option key={spec.name} value={spec.value}>
                        {spec.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name={"special"}
                    component="div"
                    style={{ color: "red" }}
                    className="error"
                  />
                </div>
                <br></br>

                {/* <button className='btn mt-3 btn-dark' type='submit' disabled={isSubmitting} >Submit</button> */}
                <button
                  className="btn mt-3 mx-2 btn-outline-dark"
                  type="submit"
                  style={{
                    marginRight: "10px",
                    backgroundColor: colors.bg.primary,
                    border: "none",
                  }}
                >
                  {content[lang].submit}
                </button>
                <button
                  className="btn mt-3 mx-2 ml-3 btn-danger"
                  type="reset"
                  onClick={handleReset}
                >
                  {content[lang].reset}
                </button>
                <ModalSuccess
                  setIsModalOpen={setIsModalSuccessOpen}
                  isModalOpen={isModalSuccessOpen}
                  successText={content[lang].verify_email}
                  hideFunc={redic}
                />
                <ModalFail
                  setIsModalOpen={setIsModalFailOpen}
                  isModalOpen={isModalFailOpen}
                  errorText={content[lang].error_general_msg}
                />
              </Form>
            </Container>
          );
        }}
      </Formik>
    </>
  );
}

export default DoctorRegister;
