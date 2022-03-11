import React, { useContext, useState } from 'react';
import { Formik, Form , Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import {Container} from "react-bootstrap";
import {colors} from '../colors/colors';
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import DatePickerField from '../components/DatePicker';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory } from "react-router-dom";

function AppointmentBooking(props) {
    let history = useHistory();
    const [token] = useState(() => {
        const savedToken = localStorage.getItem("token");
        return savedToken;
        });
    
  const { lang, setLang } = useContext(LanguageContext);
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const validate = Yup.object().shape({
        date: Yup.string().required(content[lang].required).nullable()
        .test("date can't be in past", content[lang].invalid_date, (date) => {
            const d = new Date(date);
            let today = new Date();
            today.setHours(0,0,0,0);
            return date && d > today
        }).test("date must match day", content[lang].invalid_day_date, (date) => {
            const d = new Date(date).getDay();
            let day = selected_schedule.day;    
            return weekday[d] === day;
        }),
        visiting_time: Yup.string().required(content[lang].required),
    })

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

   const { selected_schedule } = props;
//    console.log(selected_schedule);
//   let day = date.getDay();
  


  return (
    <Formik
        initialValues={{
            date : selected_schedule.date,
            visiting_time: '',
            schedule: selected_schedule.id,
            // edit to dynamic
            user: localStorage.getItem("user_id"),
        }}
        validationSchema={validate}
        onSubmit = { async (values) => {
           values.date = formatDate(values.date)
           console.log(values.visiting_time)
           const response = 
           await axios
          .post("http://127.0.0.1:8000/users/appointment/", values, {
            headers: { Authorization: `Token ${token}` },
          })
          .catch((e) => {
            console.log(e.response);
          });

          console.log(response)
          history.push('/dashboard');
        }}
          
    >
    {formProps => {
      const {
        values,
        handleSubmit,
        setFieldValue
      } = formProps;
      return (
            <Container className='p-5 shadow ' dir={lang==='ar'?'rtl':'ltr'} >
                <h1 className='my-4 font-weight-bold-display-4'>{content[lang].book_appointment}</h1>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form onSubmit={handleSubmit}>
                <DatePickerField
                    label={content[lang].pick_date}
                    name="date"
                    value={values.date}
                    onChange={setFieldValue}
                    />

                <Field
                    type="time" 
                    name='visiting_time'
                    step={selected_schedule.appointment_duration  * 60}
                    min={selected_schedule.from_time} 
                    max={selected_schedule.to_time}
                />
                <ErrorMessage name={'visiting_time'} component="div" style={{color:"red"}} className="error"/>
                <br/>
                    
                    <button className='btn mt-3 btn-outline-dark' type='submit' style={{marginRight:'10px', backgroundColor:colors.bg.primary, border:"none"}}>{content[lang].submit}</button>
                </Form>
                </MuiPickersUtilsProvider>

                
            </Container>
        )}}
    </Formik>
)
}

export default AppointmentBooking;
