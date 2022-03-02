import React from 'react';
import { Formik, Form, Field } from 'formik'
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

        phone:Yup.string()
        .max(11, "Eqyptian num")
        .required("Phone is required")
        .matches(
            /^01[0-2,5]\d{8}$/,
            "Must be egyptian number"
          ),



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
                description: '',
                national_id: '',
                phone: '',
                country: 'egypt',
                city: '',
                area: '',
                areas:[],
                syndicate_id: '',
                photo: '',


            }}
            validationSchema={validate}
            onSubmit = {async values => {
                await new Promise(resolve => setTimeout(resolve, 500));
                alert(JSON.stringify(values, null, 2));
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
                    <h1 className='my-4 font-weight-bold-display-4'>Register as a Doctor</h1>
                    <Form onSubmit={handleSubmit}>
                        <TextFeild label="First Name" name="firstName" type="text"/>
                        <TextFeild label="Last Name" name="lastName" type="text"/>
                        <TextFeild label="Username" name="username" type="text"/>
                        <TextFeild label="Email" name="email" type="email"/>
                        <TextFeild label="Password" name="password" type="password"/>
                        <TextFeild label="Confirm Password" name="confirmPassword" type="password"/>
                        <TextFeild label="Description" name="description" type="text"/>
                        <TextFeild label="National_id" name="national_id" type="text"/>
                        <TextFeild label="Phone" name="phone" type="text"/>


                        <label for="doc_photo">Upload your Photo</label>
                        <Input type="file" id="doc_photo" name="photo" onChange={(event) => formProps.setFieldValue('photo', event.target.files[0])}/>
                        <label for="synd_id">Upload your Syndicate id</label>
                        <Input type="file" id="synd_id" name="syndicate_id" 
                        onChange={(event) => formProps.setFieldValue('syndicate_id', event.target.files[0])}/>
                        

                        <label for="country">Country</label>
                        <Field as="select" name="country" id="country">
                            <option value="egypt">Egypt</option>
                        </Field>


                        <label htmlFor="city">city</label>
              <Field
                id="city"
                name="city"
                as="select"
                value={values.city}
                onChange={async e => {
                  const { value } = e.target;
                  const _areas = await getareas(value);
                  console.log(_areas);
                  setFieldValue("city", value);
                  setFieldValue("area", "");
                  setFieldValue("areas", _areas);
                }}
              >
                <option value="None">Select city</option>
                <option value="Giza">Giza</option>
                <option value="Cairo">Cairo</option>
              </Field>

              <label htmlFor="area">area</label>
              <Field
                value={values.area}
                id="area"
                name="area"
                as="select"
                onChange={handleChange}
              >
                <option value="None">Select area</option>
                {values.areas &&
                  values.areas.map(a => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
              </Field>
            
                        
                        
                        
                        <button className='btn mt-3 btn-dark' type='submit' disabled={isSubmitting} >Submit</button>
                        <button className='btn mt-3 ml-3 btn-danger' type='reset' onClick={handleReset}
                disabled={!notValid || isSubmitting}>Reset</button>
                    </Form>
                </div>
            )}}
        </Formik>
    )

}

export default Register;
