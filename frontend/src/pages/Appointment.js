import React, { useContext } from 'react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import {Container} from "react-bootstrap";
import {colors} from '../colors/colors';
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import DatePickerField from '../components/DatePicker';

function Appointment() {
  const { lang, setLang } = useContext(LanguageContext);
    const validate = Yup.object({
        date: Yup.string().required(content[lang].required).nullable(),

    })


    return (
        <Formik
            initialValues={{
                date : null,
            }}
            validationSchema={validate}
            onSubmit = {(values) => {
                const data = {
                    date : values.date
                }
                console.log(data)
            }}
              
        >
        {formProps => {
          const {
            values,
            handleSubmit,
            setFieldValue
          } = formProps;
          return (
                <Container className='p-5 shadow ' >
                    <h1 className='my-4 font-weight-bold-display-4'>{content[lang].book_appointment}</h1>

                    <Form onSubmit={handleSubmit}>
                    <DatePickerField
                        label={content[lang].pick_date}
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        />

                        <button className='btn mt-3 btn-outline-dark' type='submit' style={{marginRight:'10px', backgroundColor:colors.bg.primary, border:"none"}}>{content[lang].submit}</button>
                    </Form>
                </Container>
            )}}
        </Formik>
    )
}

export default Appointment;
