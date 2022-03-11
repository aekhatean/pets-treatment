import { Formik, Form, Field } from "formik";
import { InputField, FileUpload, FileUploadMultiple, Select } from "./Inputs";
import { useState, useContext } from "react";
import { axiosInstance } from "../api";
import * as Yup from "yup";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import ModalSuccess from "./ModalSuccess";
import ModalFail from "./ModalFail";

export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
];
// 8 mega bytes max size
export const IMAGE_SIZE = 8388608;

export function trueInArrChecker(arr) {
  if (arr.includes(false)) {
    return false;
  } else {
    return true;
  }
}
export function checkForImageSize(image) {
  if (image) {
    const imageObjFromURI = dataURItoBlob(image);
    return imageObjFromURI && imageObjFromURI.size <= IMAGE_SIZE;
  }
}
export function checkForImageFormat(image) {
  if (image) {
    const imageObjFromURI = dataURItoBlob(image);
    return imageObjFromURI && SUPPORTED_FORMATS.includes(imageObjFromURI.type);
  }
}
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  const encodedData = dataURI.toString();
  var byteString;
  if (encodedData.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(encodedData.split(",")[1]);
  else byteString = decodeURI(encodedData.split(",")[1]);
  // separate out the mime component
  var mimeString = encodedData.split(",")[0].split(":")[1].split(";")[0];
  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

const ClinicAdder = (props) => {
  const { lang } = useContext(LanguageContext);
  const [areas, setAreas] = useState(getArea(""));
  const [isModalFailOpen, setIsModalFailOpen] = useState(false);
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });

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

  function addClinic(values) {
    const data = values;
    const response = axiosInstance
      .post(`clinics/create_clinic`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => res)
      .catch((err) => err.response);
    return response;
  }

  const validateClinic = Yup.object().shape({
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
    country: Yup.string().required(
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
      )
      .matches(/^01[0-2,5]\d{8}$/, content[lang].invalid_phone),
    tax_registration: Yup.mixed()
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
    technical_registration: Yup.mixed()
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
    technical_registration_number: Yup.number()
      .typeError(
        lang === "en"
          ? content.en.field_number_valid
          : content.ar.field_number_valid
      )
      .required(lang === "en" ? content.en.required : content.ar.required),
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
  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        area: "",
        city: "",
        country: "Egypt",
        phone: "",
        tax_registration: null,
        technical_registration: null,
        technical_registration_number: "",
        price: "",
        images: [],
      }}
      validationSchema={validateClinic}
      onSubmit={async (values) => {
        const res = await addClinic(values);
        if (res.status === 201) {
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
                  label={
                    lang === "en"
                      ? content.en.tech_reg_num
                      : content.ar.tech_reg_num
                  }
                  name="technical_registration_number"
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
                  name="tax_registration"
                  component={FileUpload}
                  label={
                    lang === "en" ? content.en.tax_reg : content.ar.tax_reg
                  }
                />
              </li>
              <li className="list-group-item">
                <Field
                  name="technical_registration"
                  component={FileUpload}
                  label={
                    lang === "en" ? content.en.tech_reg : content.ar.tech_reg
                  }
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
                />
              </li>
              <li className="list-group-item">
                <button className="btn blue-bg text-white" type="submit">
                  {lang === "en"
                    ? content.en.add_clinic
                    : content.ar.add_clinic}
                </button>
              </li>
            </ul>
            <ModalSuccess
              setIsModalOpen={setIsModalSuccessOpen}
              isModalOpen={isModalSuccessOpen}
              successText={
                lang === "en"
                  ? content.en.clinic_created
                  : content.ar.clinic_created
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
};

export default ClinicAdder;
