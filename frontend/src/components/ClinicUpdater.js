import { Formik, Form, Field } from "formik";
import { InputField, Select, FileUploadMultiple } from "./Inputs";
import { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import * as Yup from "yup";
import {
  trueInArrChecker,
  checkForImageFormat,
  checkForImageSize,
  cities,
  getArea,
} from "./ClinicAdder";

const ClinicUpdater = (props) => {
  const [areas, setAreas] = useState(getArea(""));
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  // const imagesList = getIn(values, "images");
  const [clinicData, setClinicData] = useState({});
  const [clinicImages, setClinicImages] = useState([]);
  const [imagesLen, setImagesLen] = useState(0);

  async function updateClinic(values) {
    const data = values;
    const response = await axiosInstance
      .put(`/clinics/update_clinic/${props.clinic_id}/`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response.data));
    props.hideForm(false);
    props.fetchFunc();
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

  // useEffect(() => {
  //   if (values.images.length > 0) {
  //     setDidChangeImage(true);
  //   } else {
  //     setDidChangeImage(false);
  //   }
  // }, [values.images.length]);

  const validateClinic = Yup.object({
    name: Yup.string().required("*name is required"),
    address: Yup.string().required("*address is required"),
    area: Yup.string().required("*area is required"),
    city: Yup.string().required("*city is required"),
    phone: Yup.number()
      .required("*phone is required")
      .typeError("*phone must be a number")
      .test(
        "phoneLength",
        "*your phone number must be exactly 11 number",
        (number) => {
          const num = "0" + number;
          return num.length === 11;
        }
      ),
    price: Yup.number()
      .typeError("*price must be a number")
      .required("*price is required"),
    images: Yup.array()
      .nullable()
      .test("imagesType", "*an image has an unsupported type.", (imgArr) => {
        let imgArrValidation = [];
        imgArr.length &&
          imgArr.forEach((img) =>
            imgArrValidation.push(checkForImageFormat(img))
          );
        return trueInArrChecker(imgArrValidation);
      })
      .test("imagesSize", "*an image is too large", (imgArr) => {
        let imgArrValidation = [];
        imgArr.length &&
          imgArr.forEach((img) =>
            imgArrValidation.push(checkForImageSize(img))
          );
        return trueInArrChecker(imgArrValidation);
      }),
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
        onSubmit={(values) => {
          console.log(values);
          // updateClinic(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="d-flex my-3">
            <div className="card">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <InputField label="Name" name="name" />
                </li>
                <li className="list-group-item">
                  <InputField label="Address" name="address" />
                </li>
                <li className="list-group-item">
                  <InputField label="Country" name="country" disabled />
                </li>
                <li className="list-group-item">
                  <Select
                    label="City"
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
                    label="Area"
                    name="area"
                    options={areas}
                    disabled={values.city ? false : true}
                  />
                </li>
                <li className="list-group-item">
                  <InputField label="Phone" name="phone" />
                </li>
                <li className="list-group-item">
                  <InputField label="Price" name="price" />
                </li>
                <li className="list-group-item">
                  <Field
                    name="images"
                    component={FileUploadMultiple}
                    label="Clinic Images"
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
                                Image {index + 1} out of {clinicImages.length}
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
                  <button className="btn btn-warning" type="submit">
                    Update Clinic
                  </button>
                </li>
              </ul>
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
