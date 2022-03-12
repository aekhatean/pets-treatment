import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TextFeild from '../components/TextField';
import * as Yup from 'yup';
import {Input} from "reactstrap";
import {Container} from "react-bootstrap";
import axios from 'axios';
import imageToBase64 from 'image-to-base64/browser';
import { axiosInstance } from '../api';
import {colors} from '../colors/colors';
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useHistory } from "react-router-dom";
import ModalSuccess from "../components/ModalSuccess";
import login_cat from "../assets/login_cat.png";
function Register() {
    let history = useHistory();
    const redic = ()=>{
      history.push('/');
    }
    const { lang, setLang } = useContext(LanguageContext);
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
    const validate = Yup.object({
        firstName:Yup.string()
        .max(15, content[lang].invalid_firstname)
        .required(content[lang].required),
        lastName:Yup.string()
        .max(15, content[lang].invalid_lastname)
        .required(content[lang].required),
        username:Yup.string()
        .max(15, content[lang].invalid_username)
        .required(content[lang].required),
        email:Yup.string()
        .email(content[lang].invalid_email)
        .required(content[lang].required),
        password:Yup.string()
        .min(8, content[lang].invalid_password)
        .required(content[lang].required),
        confirmPassword:Yup.string()
        .oneOf([Yup.ref('password'), null], content[lang].invalid_matching)
        .required(content[lang].required),
        username:Yup.string()
        .max(20, content[lang].invalid_username)
        .required(content[lang].required),

        phone:Yup.string()
        .required(content[lang].required)
        .matches(
            /^01[0-2,5]\d{8}$/,
            content[lang].invalid_phone
          ),

          photo:Yup.string()
          .required(content[lang].required),
      
          city:Yup.string()
          .required(content[lang].required),
      
          area:Yup.string()
          .required(content[lang].required),

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
      <>
    <img src={login_cat} alt="catty" />
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
                    picture: values.photo,
                  },
                          
                };
                console.log(values.special)
                console.log(data)

                axios.post(
                  "http://127.0.0.1:8000/users/register/",
                  data,
                )

                .then(response => {
                  setIsModalSuccessOpen(true);
                  console.log(response)
                  console.log("sucess")
                })

                .catch(e => {
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
            <Container className="p-5 mb-5 shadow" dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{width:'50%', borderRadius:20}}>
            <span className="center">
            
            <h1 className=" font-weight-bold-display-4" style={{display: "inline"}}>
                {content[lang].register_petowner}
            </h1>
            
          </span>

                    <Form onSubmit={handleSubmit}>
                    <TextFeild label={content[lang].fist_name} name="firstName" type="text"/>
                        <TextFeild label={content[lang].last_name} name="lastName" type="text"/>
                        <TextFeild label={content[lang].username} name="username" type="text"/>
                        <TextFeild label={content[lang].email} name="email" type="email"/>
                        <TextFeild label={content[lang].password} name="password" type="password"/>
                        <TextFeild label={content[lang].confirm_password} name="confirmPassword" type="password"/>
                        <TextFeild label={content[lang].phone} name="phone" type="text"/>


                        <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}>
                        <label className="form-label" htmlFor="photo">
                          {content[lang].upload_photo}
                        </label>
                        <Field
                          name="photo"
                          type="file"
                          onChange={(e) => {
                            const file = e.currentTarget.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = function (event) {
                            setFieldValue('photo', event.target.result);
                            };
                          }}
                        />
                        <ErrorMessage name={'photo'} component="div" style={{color:"red"}} className="error"/>
                      </div>
                          <br></br>

                        
                              <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}>

                                <label className="form-label" htmlFor="country">{content[lang].country}</label>
                                <Field as="select" name="country" id="country" className="form-select">
                                    <option value="egypt">{content[lang].egypt}</option>
                                </Field>
                                <ErrorMessage name={'country'} component="div" style={{color:"red"}} className="error"/>
                                </div>

                                <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}>
                                <label className="form-label" htmlFor="city">{content[lang].city}</label>
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
                                    <option value="None">{content[lang].select_city}</option>
                                    <option value="Giza">{content[lang].giza}</option>
                                    <option value="Cairo">{content[lang].cairo}</option>
                                </Field>
                                <ErrorMessage name={'city'} component="div" style={{color:"red"}} className="error"/>
                                </div>
                                
                                <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}>
                                <label className="form-label" htmlFor="area">{content[lang].area}</label>
                                <Field
                                    value={values.area}
                                    id="area"
                                    name="area"
                                    as="select"
                                    className="form-select"
                                    controlId="validationFormik05"
                                    onChange={handleChange}
                                >
                                    <option value="None">{content[lang].select_area}</option>
                                    {values.areas &&
                                    values.areas.map(a => (
                                        <option key={a.value} value={a.value}>
                                        {a.label}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name={'area'} component="div" style={{color:"red"}} className="error"/>
                                <br/>

                                </div>
                        
                        
                        
                        {/* <button className='btn mt-3 btn-dark' type='submit' disabled={isSubmitting} >Submit</button> */}
                        <button className='btn mt-3 btn-outline-dark' type='submit' style={{marginRight:'10px', backgroundColor:colors.bg.primary, border:"none"}}>{content[lang].submit}</button>
                        <button className='btn mt-3 ml-3 btn-danger' type='reset' onClick={handleReset}>{content[lang].reset}</button>
                        <ModalSuccess
                          setIsModalOpen={setIsModalSuccessOpen}
                          isModalOpen={isModalSuccessOpen}
                          successText={
                            content[lang].verify_email
                          }
                          hideFunc={redic}
                        />
                    
                    </Form>
                </Container>
            )}}
        </Formik>
        </>
    )

}

export default Register;
