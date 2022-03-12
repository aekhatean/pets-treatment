import React ,{ useContext } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { ErrorMessage } from "formik";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";


const DatePickerField = ({ name, value, onChange, label }) => {
    const { lang, setLang } = useContext(LanguageContext);
    return (
        <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}>
            <label htmlFor={name} className="form-label">{label}</label>
            <DatePicker
                className="form-control"
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