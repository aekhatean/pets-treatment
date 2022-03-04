import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik'
import TextFeild from '../components/TextField';
import * as Yup from 'yup';
import {Input} from "reactstrap";
import axios from 'axios';

function Login() {
    const validate = Yup.object({
        email:Yup.string()
        .email("Invaild email")
        .required("Email is required"),
        password:Yup.string()
        .required("Password is required"),

    })


    return (
        <Formik
            initialValues={{
                email:'',
                password:'',
            }}
            validationSchema={validate}
            onSubmit = {async values => {
                // await new Promise(resolve => setTimeout(resolve, 500));
                // alert(JSON.stringify(values, null, 2));
                const data = {
                        password: values.password,
                        email: values.email,
                };

                console.log(data)

                // cont axiosConfig
                await axios.post(
                  "http://127.0.0.1:8000/users/login/",
                  data,
                  // axiosConfig
                )
                .then(response => {
                  // setModal(true)
                  // console.log("sucess")
                  // console.log(response.data)
                  // console.log(response.data.token)
                  localStorage.setItem("token", response.data.token)
                  localStorage.setItem("email", response.data.email)
                  
                })
                .catch(e => {
                  // setErrorModal(true)
                  console.log(e)
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
                <div>
                    <h1 className='my-4 font-weight-bold-display-4'>Login</h1>

                    <Form onSubmit={handleSubmit}>
                        <TextFeild label="Email" name="email" type="email"/>
                        <TextFeild label="Password" name="password" type="password"/>

                        <button className='btn mt-3 btn-dark' type='submit' disabled={isSubmitting} >Submit</button>
                    </Form>
                </div>
            )}}
        </Formik>
    )
}

export default Login;
