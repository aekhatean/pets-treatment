import { Formik, Form, Field } from "formik";
import { InputField, FileUpload, FileUploadMultiple } from "./Inputs";
import { useRef, useState } from "react";
import { axiosInstance } from "../api";
import * as Yup from "yup";

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
  const [token] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken;
  });

  async function addClinic(values) {
    const data = values;
    const response = await axiosInstance
      .post(`clinics/create_clinic`, data, {
        headers: { Authorization: `Token ${token}` },
      })
      .catch((err) => console.error(err.response));
    console.log(response);
    props.hideForm(false);
    props.fetchFunc();
  }

  const validateClinic = Yup.object().shape({
    name: Yup.string().required("*name is required."),
    address: Yup.string().required("*address is required."),
    area: Yup.string().required("*area is required."),
    city: Yup.string().required("*city is required."),
    country: Yup.string().required("*country is required."),
    phone: Yup.number()
      .typeError("*phone must be a number.")
      .required("*phone is required."),
    tax_registration: Yup.mixed()
      .nullable()
      .required("*tax registeration is required.")
      .test("imageSize", "*image too large", (image) =>
        checkForImageSize(image)
      )
      .test("imageFormat", "*unsupported image type", (image) =>
        checkForImageFormat(image)
      ),
    technical_registration: Yup.mixed()
      .nullable()
      .required("*technical registeration is required.")
      .test("imageSize", "*image is too large", (image) =>
        checkForImageSize(image)
      )
      .test("imageFormat", "*unsupported image type", (image) =>
        checkForImageFormat(image)
      ),
    technical_registration_number: Yup.number()
      .typeError("*technical registration number must be a number")
      .required("*technical registration number is required"),
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

  return (
    <Formik
      initialValues={{
        name: "",
        address: "",
        area: "",
        city: "",
        country: "",
        phone: "",
        tax_registration: null,
        technical_registration: null,
        technical_registration_number: "",
        price: "",
        images: [],
      }}
      validationSchema={validateClinic}
      onSubmit={(values) => {
        // console.log(values);
        addClinic(values);
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
                <InputField
                  label="Technical Registration Number"
                  name="technical_registration_number"
                />
              </li>
              <li className="list-group-item">
                <InputField label="Price" name="price" />
              </li>

              <li className="list-group-item">
                <Field
                  name="tax_registration"
                  component={FileUpload}
                  label="Tax Registration"
                />
              </li>
              <li className="list-group-item">
                <Field
                  name="technical_registration"
                  component={FileUpload}
                  label="Technical Registration"
                />
              </li>
              <li className="list-group-item">
                <Field
                  name="images"
                  component={FileUploadMultiple}
                  label="Clinic Images"
                />
              </li>
              <li className="list-group-item">
                <button className="btn btn-primary" type="submit">
                  Add Clinic
                </button>
              </li>
            </ul>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ClinicAdder;
