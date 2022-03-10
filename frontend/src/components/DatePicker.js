import React from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { ErrorMessage } from "formik";

const DatePickerField = ({ name, value, onChange, label }) => {
    return (
        <div className="mb-3 text-start">
            <label htmlFor={name} className="form-label">{label}</label>
            <DatePicker
                selected={(value && new Date(value)) || null}
                onChange={val => {
                onChange(name, val);
                }}
            />
            <ErrorMessage name={name} component="div" style={{color:"red"}} className="error"/>
        </div>
      
    );
  };

export default DatePickerField