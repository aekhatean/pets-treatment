import { Formik, Form, Field, FieldArray } from "formik";
import { InputField, FileUpload, FileUploadMultiple } from "./Inputs";
import { axiosInstance } from "../api";
import * as Yup from "yup";

const ClinicAdder = (props) => {
  const token = "611da83882dcba101216e8002f18467fe91e32ac";

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

  const validateClinic = Yup.object({
    name: Yup.string().required("*name is required"),
    address: Yup.string().required("*address is required"),
    area: Yup.string().required("*area is required"),
    city: Yup.string().required("*city is required"),
    country: Yup.string().required("*country is required"),
    phone: Yup.number()
      .typeError("*phone must be a number")
      .required("*phone is required"),
    tax_registration: Yup.string().required("*tax registration is required"),
    technical_registration: Yup.string().required(
      "*technical registration is required"
    ),
    technical_registration_number: Yup.number()
      .typeError("*technical registration number must be a number")
      .required("*technical registration number is required"),
    price: Yup.number()
      .typeError("*price must be a number")
      .required("*price is required"),
    // images: Yup.mixed().when("isArray", {
    //   is: Array.isArray,
    //   then: Yup.array().of(Yup.string()),
    //   otherwise: Yup.string(),
    // }),
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
        tax_registration: "",
        technical_registration: "",
        technical_registration_number: "",
        price: "",
        // images: [],
      }}
      validationSchema={validateClinic}
      onSubmit={(values) => {
        console.log(values);
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
              {/* <li className="list-group-item">
                <Field name="images" component={FileUploadMultiple} />
              </li> */}
              <li className="list-group-item">
                <button className="btn btn-primary" type="submit">
                  Add
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
