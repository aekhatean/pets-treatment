import { Formik, Form, Field } from "formik";
import { InputField, Select, FileUploadMultiple } from "./Inputs";
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../api";
import * as Yup from "yup";
import {
  trueInArrChecker,
  checkForImageFormat,
  checkForImageSize,
} from "./ClinicAdder";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import ModalSuccess from "./ModalSuccess";
import ModalFail from "./ModalFail";

const ClinicUpdater = (props) => {
  const { lang } = useContext(LanguageContext);
  const [isModalFailOpen, setIsModalFailOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [areas, setAreas] = useState(getArea(""));
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  // const imagesList = getIn(values, "images");
  const [clinicData, setClinicData] = useState({});
  const [clinicImages, setClinicImages] = useState([]);
  const [imagesLen, setImagesLen] = useState(0);

  const cities = [
    {
      key: lang === "en" ? content.en.select_city : content.ar.select_city,
      value: "",
    },
    { key: "Cairo", value: "Cairo" },
    { key: "Giza", value: "Giza" },
  ];

  function getArea(city) {
    switch (city) {
      case "Cairo":
        return [
          {
            key:
              lang === "en" ? content.en.select_area : content.ar.select_area,
            value: "",
          },
          { key: "Shoubra", value: "Shoubra" },
          { key: "Nasr City", value: "Nasr City" },
        ];
      case "Giza":
        return [
          {
            key:
              lang === "en" ? content.en.select_area : content.ar.select_area,
            value: "",
          },
          { key: "6th of October", value: "6th of October" },
          { key: "Dokki", value: "Dokki" },
        ];
      default:
        return [
          {
            key:
              lang === "en"
                ? content.en.select_city_first
                : content.ar.select_city_first,
            value: "",
          },
        ];
    }
  }

  function updateClinic(values) {
    const data = values;
    const response = axiosInstance
      .put(`/clinics/update_clinic/${props.clinic_id}/`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => res)
      .catch((err) => err.response);
    return response;
  }

  async function getClinicData() {
    const response = await axiosInstance
      .get(`clinics/detail_clinic/${props.clinic_id}`)
      .catch((err) => console.error(err.response));
    setClinicData(response.data);
    setAreas(getArea(response.data.city));
  }
  async function getClinicImages() {
    const response = await axiosInstance
      .get(`clinics/clinic_pictures/${props.clinic_id}`)
      .catch((err) => console.error(err.response));
    setClinicImages(response.data);
  }

  useEffect(() => {
    getClinicData();
    getClinicImages();
  }, []);

  const validateClinic = Yup.object({
    name: Yup.string().required(
      lang === "en" ? content.en.required : content.ar.required
    ),
    address: Yup.string().required(
      lang === "en" ? content.en.required : content.ar.required
    ),
    area: Yup.string().required(
      lang === "en" ? content.en.required : content.ar.required
    ),
    city: Yup.string().required(
      lang === "en" ? content.en.required : content.ar.required
    ),
    phone: Yup.number()
      .required(lang === "en" ? content.en.required : content.ar.required)
      .typeError(
        lang === "en"
          ? content.en.field_number_valid
          : content.ar.field_number_valid
      )
      .test(
        "phoneLength",
        lang === "en"
          ? content.en.phone_count_valid
          : content.ar.phone_count_valid,
        (number) => {
          const num = "0" + number;
          return num.length === 11;
        }
      ),
    price: Yup.number()
      .typeError(
        lang === "en"
          ? content.en.field_number_valid
          : content.ar.field_number_valid
      )
      .required(lang === "en" ? content.en.required : content.ar.required),
    images: Yup.array()
      .nullable()
      .test(
        "imagesType",
        lang === "en" ? content.en.image_type_err : content.ar.image_type_err,
        (imgArr) => {
          let imgArrValidation = [];
          imgArr.length &&
            imgArr.forEach((img) =>
              imgArrValidation.push(checkForImageFormat(img))
            );
          return trueInArrChecker(imgArrValidation);
        }
      )
      .test(
        "imagesSize",
        lang === "en" ? content.en.image_size_err : content.ar.image_size_err,
        (imgArr) => {
          let imgArrValidation = [];
          imgArr.length &&
            imgArr.forEach((img) =>
              imgArrValidation.push(checkForImageSize(img))
            );
          return trueInArrChecker(imgArrValidation);
        }
      ),
  });
  if (clinicData && Object.keys(clinicData).length) {
    return (
      <Formik
        initialValues={{
          name: clinicData.name,
          address: clinicData.address,
          area: clinicData.area,
          city: clinicData.city,
          country: clinicData.country,
          phone: clinicData.phone,
          price: clinicData.price,
          images: [],
        }}
        validationSchema={validateClinic}
        onSubmit={async (values) => {
          const res = await updateClinic(values);
          if (res.status === 200) {
            setIsModalSuccessOpen(true);
            props.fetchFunc();
          } else {
            setIsModalFailOpen(true);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="d-flex my-3">
            <div className="card shadow">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <InputField
                    label={lang === "en" ? content.en.name : content.ar.name}
                    name="name"
                  />
                </li>
                <li className="list-group-item">
                  <InputField
                    label={
                      lang === "en" ? content.en.address : content.ar.address
                    }
                    name="address"
                  />
                </li>
                <li className="list-group-item">
                  <InputField
                    label={
                      lang === "en" ? content.en.country : content.ar.country
                    }
                    name="country"
                    disabled
                  />
                </li>
                <li className="list-group-item">
                  <Select
                    label={lang === "en" ? content.en.city : content.ar.city}
                    name="city"
                    options={cities}
                    onChange={function (e) {
                      setFieldValue("city", e.target.value);
                      setAreas(getArea(e.target.value));
                    }}
                  />
                </li>
                <li className="list-group-item">
                  <Select
                    label={lang === "en" ? content.en.area : content.ar.area}
                    name="area"
                    options={areas}
                    disabled={values.city ? false : true}
                  />
                </li>
                <li className="list-group-item">
                  <InputField
                    label={lang === "en" ? content.en.phone : content.ar.phone}
                    name="phone"
                  />
                </li>
                <li className="list-group-item">
                  <InputField
                    label={lang === "en" ? content.en.price : content.ar.price}
                    name="price"
                  />
                </li>
                <li className="list-group-item">
                  <Field
                    name="images"
                    component={FileUploadMultiple}
                    label={
                      lang === "en"
                        ? content.en.clinic_images
                        : content.ar.clinic_images
                    }
                    setImagesLen={setImagesLen}
                  />
                  {imagesLen === 0 && clinicImages && clinicImages.length > 0 && (
                    <div
                      id="carousel_images"
                      className="carousel carousel-dark slide mt-4"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner">
                        {clinicImages.map((image, index) => {
                          return (
                            <div
                              key={index}
                              className={`carousel-item ${
                                index === 0 ? "active" : ""
                              }`}
                            >
                              <a
                                href={`http://127.0.0.1:8000${image.picture}`}
                                target="_blank"
                              >
                                <div
                                  style={{
                                    width: "200px",
                                    height: "120px",
                                    margin: "0 auto",
                                  }}
                                >
                                  <img
                                    src={`http://127.0.0.1:8000${image.picture}`}
                                    className="img-fluid shadow"
                                  />
                                </div>
                              </a>
                              <p className="badge bg-secondary my-2">
                                {lang === "en"
                                  ? content.en.image
                                  : content.ar.image}{" "}
                                {index + 1}{" "}
                                {lang === "en"
                                  ? content.en.out_of
                                  : content.ar.out_of}{" "}
                                {clinicImages.length}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carousel_images"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carousel_images"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  )}
                </li>
                <li className="list-group-item">
                  <button className="btn blonde-bg" type="submit">
                    {lang === "en"
                      ? content.en.update_clinic
                      : content.ar.update_clinic}
                  </button>
                </li>
              </ul>
              <ModalSuccess
                setIsModalOpen={setIsModalSuccessOpen}
                isModalOpen={isModalSuccessOpen}
                successText={
                  lang === "en"
                    ? content.en.clinic_updated
                    : content.ar.clinic_updated
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
  } else {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
};

export default ClinicUpdater;
