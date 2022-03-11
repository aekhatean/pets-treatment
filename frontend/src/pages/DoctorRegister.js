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
import { useHistory } from "react-router-dom";

function DoctorRegister() {
  let history = useHistory();
  const { lang, setLang } = useContext(LanguageContext);
  // image
  const [baseImage, setBaseImage] = useState("");
  const [syncId, setSyncId] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    console.log(baseImage);
  };

  const uploadSyncId = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setSyncId(base64);
    console.log(syncId);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  // end image
  const [modal, setModal] = useState(undefined);
  const [errorModal, setErrorModal] = useState(undefined);
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
    national_id: Yup.string()
      .max(14, content[lang].invalid_national_id_min)
      .min(14, content[lang].invalid_national_id_max)
      .required(content[lang].required),
    username: Yup.string()
      .max(20, content[lang].invalid_username)
      .required(content[lang].required),

    phone: Yup.string()
      .required(content[lang].required)
      .matches(/^01[0-2,5]\d{8}$/, content[lang].invalid_phone),

    specialization:Yup.string()
    .required(content[lang].required),

    syndicate_id:Yup.string()
    .required(content[lang].required),

    photo:Yup.string()
    .required(content[lang].required),

    city:Yup.string()
    .required(content[lang].required),

    area:Yup.string()
    .required(content[lang].required),

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
  console.log(syncId);
  console.log(baseImage);
  return (
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
        // console.log(typeof baseImage)
        // console.log(syncId)
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
            picture: baseImage,
          },
          description: values.description,
          syndicate_id: syncId,
          national_id: values.national_id,
          specialization: values.special,
        };
        console.log(values.special);
        console.log(data);

        axios
          .post("http://127.0.0.1:8000/users/doctors/new", data)

          .then((response) => {
            // setModal(true)
            console.log(response);
            console.log("sucess");
          })

          .catch((e) => {
            // setErrorModal(true)
            console.error(e.response);
          });

          history.push('/');
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
              {content[lang].register_doctor}
            </h1>

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
              <TextFeild label={content[lang].phone} name="phone" type="text" />

              <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}>
                <label className="form-label" htmlFor="photo">
                  {content[lang].upload_photo}
                </label>
                <Input
                  name="photo"
                  type="file"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                />
                <ErrorMessage name={'photo'} component="div" style={{color:"red"}} className="error"/>
              </div>
              <br></br>
              {/* <img src={baseImage} height="200px" /> */}

              <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}>
                <label className="form-label" htmlFor="synd_id">
                  {content[lang].upload_syndicate}
                </label>
                <Input
                  id="synd_id"
                  name="syndicate_id"
                  type="file"
                  onChange={(e) => {
                    uploadSyncId(e);
                  }}
                />
                <ErrorMessage name={'syndicate_id'} component="div" style={{color:"red"}} className="error"/>
              </div>
              <br></br>

              <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"} 
                dir={lang === 'ar' ? 'rtl' : 'ltr'}>
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
                <ErrorMessage name={'country'} component="div" style={{color:"red"}} className="error"/>
              </div>

              <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"} 
                dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <label className="form-label" htmlFor="city">
                  {content[lang].city}
                </label>
                <Field
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
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
                  <option className="m-2" value="None">{content[lang].select_city}</option>
                  <option value="Giza">{content[lang].giza}</option>
                  <option value="Cairo">{content[lang].cairo}</option>
                </Field>
                <ErrorMessage name={'city'} component="div" style={{color:"red"}} className="error"/>
              </div>

              <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}>
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
                <ErrorMessage name={'area'} component="div" style={{color:"red"}} className="error"/>
                <br />
              </div>

              <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}>
                <label className="form-label" htmlFor="special">
                  {content[lang].specialization}
                </label>

                <Field
                  as="select"
                  className="form-select"
                  controlId="validationFormik05"
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
                <ErrorMessage name={'special'} component="div" style={{color:"red"}} className="error"/>
              </div>
              <br></br>

              {/* <button className='btn mt-3 btn-dark' type='submit' disabled={isSubmitting} >Submit</button> */}
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
              <button
                className="btn mt-3 ml-3 btn-danger"
                type="reset"
                onClick={handleReset}
              >
                {content[lang].reset}
              </button>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}

export default DoctorRegister;
