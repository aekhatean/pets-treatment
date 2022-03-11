import React ,{ useContext }from "react";
import { ErrorMessage, useField } from "formik";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
const TextFeild = ({label, ...props}) => {
    const { lang, setLang } = useContext(LanguageContext);
    const [field, meta] = useField(props);
    // console.log(field, meta);
    return (
        <div className={lang==='ar'?"mb-3 text-end":"mb-3 text-start"}>
            <label htmlFor={field.name} className="form-label">{label}</label>
            <input 
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
            />
            <ErrorMessage name={field.name} component="div" style={{color:"red"}} className="error"/>
        </div>
    )
}
export default TextFeild;