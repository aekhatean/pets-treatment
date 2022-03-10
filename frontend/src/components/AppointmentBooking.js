import React, { useContext } from 'react';
import { Formik, Form , Field} from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import {Container} from "react-bootstrap";
import {colors} from '../colors/colors';
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import DatePickerField from '../components/DatePicker';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TimePickerFeild from './TimePickerFeild';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AppointmentBooking(props) {
  const { lang, setLang } = useContext(LanguageContext);
    const validate = Yup.object({
        date: Yup.string().required(content[lang].required).nullable(),

    })
  const { selected_schedule } = props;
  console.log(selected_schedule);

  const generateTimeSteps = () => {
    const result = [];
    for(let i = 0; i < 24; i++){
        for(let j = 0; j < 2; j++){
            result.push(`${i < 10 ? '0' + i : i} : ${j === 0 ? '00' : 30 * j}`);
        }
    }
    return result;
} 

  return (
    <Formik
        initialValues={{
            date : null,
            time: '',
        }}
        validationSchema={validate}
        onSubmit = {(values) => {
            const data = {
                date : values.date,
                time : values.time
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Form onSubmit={handleSubmit}>
                <DatePickerField
                    label={content[lang].pick_date}
                    name="date"
                    value={values.date}
                    onChange={setFieldValue}
                    />

                <TimePickerFeild/>

                {/* <Box margin={1}>
                            <Field
                            // component={TimePicker}
                            name="time"
                            label="Time"
                            // ampm={false}
                            // openTo="hours"
                            // views={['hours', 'minutes', 'seconds']}
                            // format="HH:mm:ss"
                            />
                        </Box> */}


                    <button className='btn mt-3 btn-outline-dark' type='submit' style={{marginRight:'10px', backgroundColor:colors.bg.primary, border:"none"}}>{content[lang].submit}</button>
                </Form>
                </MuiPickersUtilsProvider>

                
            </Container>
        )}}
    </Formik>
)
}

export default AppointmentBooking;
