import { Formik, Form, Field } from "formik";
import { InputField, FileUpload, FileUploadMultiple } from "./Inputs";
import { useState, useEffect } from "react";
import { axiosInstance } from "../api";
import * as Yup from "yup";
import {
  trueInArrChecker,
  checkForImageFormat,
  checkForImageSize,
} from "./ClinicAdder";

const ClinicUpdater = (props) => {
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });
  const [clinicData, setClinicData] = useState({});

  async function updateClinic(values) {
    const data = values;
    const response = await axiosInstance
      .put(`/clinics/update_clinic/${props.clinic_id}/`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response.data));
    console.log(response);
    props.hideForm(false);
    props.fetchFunc();
  }

  async function getClinicData() {
    const response = await axiosInstance
      .get(`clinics/detail_clinic/${props.clinic_id}`)
      .catch((err) => console.error(err.response));
    setClinicData(response.data);
    console.log(response);
  }

  useEffect(() => {
    getClinicData();
  }, []);

  const validateClinic = Yup.object({
    name: Yup.string().required("*name is required"),
    address: Yup.string().required("*address is required"),
    area: Yup.string().required("*area is required"),
    city: Yup.string().required("*city is required"),
    country: Yup.string().required("*country is required"),
    phone: Yup.number()
      .typeError("*phone must be a number")
      .required("*phone is required"),
    price: Yup.number()
      .typeError("*price must be a number")
      .required("*price is required"),
    images: Yup.array()
      .nullable()
      .test("imagesSize", "*an image is too large", (imgArr) => {
        let imgArrValidation = [];
        imgArr.length &&
          imgArr.forEach((img) =>
            imgArrValidation.push(checkForImageSize(img))
          );
        return trueInArrChecker(imgArrValidation);
      })
      .test("imagesType", "*an image has an unsupported type.", (imgArr) => {
        let imgArrValidation = [];
        imgArr.length &&
          imgArr.forEach((img) =>
            imgArrValidation.push(checkForImageFormat(img))
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
          area: clinicData.address,
          city: clinicData.city,
          country: clinicData.country,
          phone: clinicData.phone,
          price: clinicData.price,
          images: [],
        }}
        validationSchema={validateClinic}
        onSubmit={(values) => {
          console.log(values);
          updateClinic(values);
        }}
      >
        {(formik) => (
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
                  <InputField label="Country" name="country" />
                </li>
                <li className="list-group-item">
                  <InputField label="City" name="city" />
                </li>
                <li className="list-group-item">
                  <InputField label="Area" name="area" />
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
                  />
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
