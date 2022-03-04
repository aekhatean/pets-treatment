import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import TextFeild from '../components/TextField';
import * as Yup from 'yup';
import {Input} from "reactstrap";
import {Container} from "react-bootstrap";
import axios from 'axios';
import imageToBase64 from 'image-to-base64/browser';
import { axiosInstance } from '../api';
// import SuccessModal from '../components/SuccessModal';
// import ErrorModal from '../components/ErrorModal';
// import axios from 'axios';
// const imageToBase64 = require('image-to-base64');
function Register() {
  // image
  const [baseImage, setBaseImage] = useState("");
  const [syncId, setSyncId] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    console.log(baseImage)
  };

  const uploadSyncId = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setSyncId(base64);
    console.log(syncId)
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
        firstName:Yup.string()
        .max(15, "First Name can't be more than 20 character")
        .required("First Name is required"),
        lastName:Yup.string()
        .max(15, "Last Name can't be more than 15 character")
        .required("Last Name required"),
        username:Yup.string()
        .max(15, "Username can't be more than 15 character")
        .required("Username is required"),
        email:Yup.string()
        .email("Invaild email")
        .required("Email is required"),
        password:Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
        confirmPassword:Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required("Confirm password is required"),
        username:Yup.string()
        .max(20, "Username can't be more than 20 character")
        .required("Username is required"),

        phone:Yup.string()
        .max(11, "Eqyptian num")
        .required("Phone is required")
        .matches(
            /^01[0-2,5]\d{8}$/,
            "Must be egyptian number"
          ),

        // photo:Yup.string()
        // .required("Photo is required"),

    })

    const getareas = city => {
        // Simulate async call
        return new Promise((resolve, reject) => {
          switch (city) {
            case "Giza":
              resolve([
                {value: "dokki", label: "Dokki"},
                {value: "6th_october", label:"6th October"},
              ]);
              break;
            case "Cairo":
              resolve([
                {value: "nasr_city", label: "Nasr City"},
                {value: "shoubra", label:"Shoubra"},
              ]);
              break;
            default:
              resolve([]);
          }
        });
      };

    return (
        <Formik
            initialValues={{
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                confirmPassword:'',
                phone: '',
                country: 'egypt',
                city: '',
                area: '',
                areas:[],
                photo: '',
                username: '',


            }}
            validationSchema={validate}
            onSubmit = {(values) => {
              // console.log(typeof baseImage)
              // console.log(syncId)
                const data = {
                    profile:{
                    user:{
                    first_name: values.firstName,
                    last_name: values.lastName,
                    password: values.password,
                    email: values.email,
                    username: values.username
                  },     
                    country: values.country,
                    city: values.city,
                    area: values.area,
                    phone: values.phone,
                    picture: baseImage,
                  },
                          
                };
                console.log(values.special)
                console.log(data)

                axios.post(
                  "http://127.0.0.1:8000/users/register/",
                  data,
                )

                .then(response => {
                  // setModal(true)
                  console.log(response)
                  console.log("sucess")
                })

                .catch(e => {
                  // setErrorModal(true)
                  console.error(e.response)
                });
              }}
              
        >
        {formProps => {
          const {
            values,
            notValid,
            isSubmitting,
            handleChange,
            handleSubmit,
            handleReset,
            setFieldValue
          } = formProps;
          return (
                <Container className='p-5 shadow ' >
                    <h1 className='my-4 font-weight-bold-display-4'>Register as a Doctor</h1>

                    <Form onSubmit={handleSubmit}>
                        <TextFeild label="First Name" name="firstName" type="text"/>
                        <TextFeild label="Last Name" name="lastName" type="text"/>
                        <TextFeild label="Username" name="username" type="text"/>
                        <TextFeild label="Email" name="email" type="email"/>
                        <TextFeild label="Password" name="password" type="password"/>
                        <TextFeild label="Confirm Password" name="confirmPassword" type="password"/>
                        <TextFeild label="Phone" name="phone" type="text"/>


                        <div className="mb-3 text-start">
                          <label className="form-label" htmlFor="photo">Upload your Photo</label>
                          <Input
                            name='photo'
                            type="file"
                            onChange={(e) => {
                              uploadImage(e);
                            }}
                          />
                        </div>
                          <br></br>
                              {/* <img src={baseImage} height="200px" /> */}

                        
                        <div className="mb-3 text-start">

                        <label className="form-label" htmlFor="country">Country</label>
                        <Field as="select" name="country" id="country" className="form-select">
                            <option value="egypt">Egypt</option>
                        </Field>
                        </div>

                        <div className="mb-3 text-start">
                        <label className="form-label" htmlFor="city">City</label>
                        <Field
                            id="city"
                            name="city"
                            as="select"
                            className="form-select"
                            controlId="validationFormik05"
                            value={values.city}
                            onChange={async e => {
                            const { value } = e.target;
                            const _areas = await getareas(value);
                            // console.log(_areas);
                            setFieldValue("city", value);
                            setFieldValue("area", "");
                            setFieldValue("areas", _areas);
                            }}
                        >
                            <option value="None">Select city</option>
                            <option value="Giza">Giza</option>
                            <option value="Cairo">Cairo</option>
                        </Field>
                        </div>
                          
                        <div className="mb-3 text-start">
                        <label className="form-label" htmlFor="area">Area</label>
                        <Field
                            value={values.area}
                            id="area"
                            name="area"
                            as="select"
                            className="form-select"
                            controlId="validationFormik05"
                            onChange={handleChange}
                        >
                            <option value="None">Select area</option>
                            {values.areas &&
                            values.areas.map(a => (
                                <option key={a.value} value={a.value}>
                                {a.label}
                                </option>
                            ))}
                        </Field><br/>

                        </div>
                        
                        
                        
                        
                        
                        {/* <button className='btn mt-3 btn-dark' type='submit' disabled={isSubmitting} >Submit</button> */}
                        <button className='btn mt-3 btn-dark' type='submit'>Submit</button>
                        <button className='btn mt-3 ml-3 btn-danger' type='reset' onClick={handleReset}>Reset</button>
                    </Form>
                </Container>
            )}}
        </Formik>
    )

}

export default Register;
