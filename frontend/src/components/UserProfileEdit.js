import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Spinner } from "react-bootstrap";
import { Input } from "reactstrap";
import { axiosInstance } from "../api";
import TextFeild from "../components/TextField";

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

export default function UserProfileEdit(props) {
  const [baseImage, setBaseImage] = useState("");
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "First Name can't be more than 15 character")
      .required("First Name is required"),
    lastName: Yup.string()
      .max(15, "Last Name can't be more than 15 character")
      .required("Last Name required"),
    email: Yup.string().email("Invaild email").required("Email is required"),
    phone: Yup.string()
      .max(11, "Please enter valid Egyptian phone number")
      .required("Phone is required")
      .matches(/^01[0-2,5]\d{8}$/, "Must be an Egyptian phone number"),
  });

  const userData = props.userData;
  const user = userData.user;
  if (userData && Object.keys(userData).length) {
    return (
      <Formik
        initialValues={{
          profilePicture: userData.picture,
          firstName: userData.user.first_name,
          lastName: userData.user.last_name,
          email: userData.user.email,
          country: userData.country,
          city: userData.city,
          phone: userData.phone,
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          const data = {
            ...userData,
            phone: values.phone,
            country: values.country,
            city: values.city,
            picture: values.profilePicture,
            user: {
              ...user,
              first_name: values.firstName,
              last_name: values.lastName,
              email: values.email,
            },
          };
          await axiosInstance.put("/users/profilelist", data, {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
        }}
      >
        {(formProps) => {
          const { values, handleSubmit, handleReset, setFieldValue } =
            formProps;
          return (
            <div>
              <Form onSubmit={handleSubmit}>
                <TextFeild label="First Name" name="firstName" type="text" />
                <TextFeild label="Last Name" name="lastName" type="text" />
                <TextFeild label="Email" name="email" type="email" />
                <TextFeild label="Phone" name="phone" type="text" />

                <label htmlFor="picture">Profile picture</label>
                <Input
                  name="photo"
                  type="file"
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                />
                <br />

                <br />

                <label htmlFor="country">Country</label>
                <Field as="select" name="country" id="country">
                  <option value="egypt">Egypt</option>
                </Field>

                <label htmlFor="city">city</label>
                <Field
                  id="city"
                  name="city"
                  as="select"
                  value={values.city}
                  onChange={async (e) => {
                    const { value } = e.target;
                    setFieldValue("city", value);
                  }}
                >
                  <option value="None">Select city</option>
                  <option value="Giza">Giza</option>
                  <option value="Cairo">Cairo</option>
                </Field>

                <br />

                <button className="btn mt-3 btn-dark" type="submit">
                  Save changes
                </button>
                <button
                  className="btn mt-3 ml-3 btn-danger"
                  type="reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    );
  } else {
    return <Spinner animation="border" variant="info" />;
  }
}
