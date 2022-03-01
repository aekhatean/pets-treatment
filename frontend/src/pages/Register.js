import React from 'react';
import { Formik, Form } from 'formik'
import TextFeild from '../components/TextField';
import * as Yup from 'yup';
import {Input} from "reactstrap";

function Register() {
    const validate = Yup.object({
        firstName:Yup.string()
        .max(15, "First Name can't be more than 20 character")
        .required("First Name is required"),
        lastName:Yup.string()
        .max(15, "Last Name can't be more than 20 character")
        .required("Last Name required"),
        email:Yup.string()
        .email("Invaild email")
        .required("Email is required"),
        password:Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
        confirmPassword:Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required("Confirm password is required"),
        description:Yup.string()
        .max(1000, "Can't write a description more than 1000 character")
        .required("Description is required"),
        national_id:Yup.string()
        .max(14, "National id acn't be more than 14 character")
        .required("National id is required"),


        // edit phone num with regex
        phone:Yup.string()
        .max(11, "Eqyptian num")
        .required("Phone is required"),


        // edit next 3 to be drop down
        country:Yup.string()
        .required("Country is required"),
        city:Yup.string()
        .required("City is required"),
        area:Yup.string()
        .required("Area is required"),



    })
    return (
        <Formik
            initialValues={{
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                confirmPassword:'',
                description: '',
                national_id: '',
                phone: '',
                country: '',
                city: '',
                area: '',
                syndicate_id: '',
                photo: '',


            }}
            validationSchema={validate}
            onSubmit={values =>{
                console.log(values)
            }}
        >
            {formProps => (
                <div>
                    <h1 className='my-4 font-weight-bold-display-4'>Register as a Doctor</h1>
                    <Form>
                        <TextFeild label="First Name" name="firstName" type="text"/>
                        <TextFeild label="Last Name" name="lastName" type="text"/>
                        <TextFeild label="Username" name="username" type="text"/>
                        <TextFeild label="Email" name="email" type="email"/>
                        <TextFeild label="Password" name="password" type="password"/>
                        <TextFeild label="Confirm Password" name="confirmPassword" type="password"/>
                        <TextFeild label="Description" name="description" type="text"/>
                        <TextFeild label="National_id" name="national_id" type="text"/>
                        <TextFeild label="Phone" name="phone" type="text"/>
                        <Input type="file" name="photo" onChange={(event) => formProps.setFieldValue('photo', event.target.files[0])}/>
                        <Input type="file" name="syndicate_id" onChange={(event) => formProps.setFieldValue('syndicate_id', event.target.files[0])}/>
                        {/* edit to be drop down */}
                        <TextFeild label="Country" name="country" type="text"/>
                        <TextFeild label="City" name="city" type="text"/>
                        <TextFeild label="Area" name="area" type="text"/>
                        
                        
                        
                        <button className='btn mt-3 btn-dark' type='submit'>Submit</button>
                        <button className='btn mt-3 ml-3 btn-danger' type='reset'>Reset</button>
                    </Form>
                </div>
            )}
        </Formik>
    )

}

export default Register;
