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
                const data = {
                        password: values.password,
                        email: values.email,
                };

                await axios.post(
                  "http://127.0.0.1:8000/users/login/",
                  data,
                )
                .then(response => {
                  localStorage.setItem("token", response.data.token)
                  localStorage.setItem("email", response.data.email)
                  
                })
                .catch(e => {
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
