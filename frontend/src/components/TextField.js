import React from "react";
import { ErrorMessage, useField } from "formik";
const TextFeild = ({label, ...props}) => {
    const [field, meta] = useField(props);
    console.log(field, meta);
    return (
        <div className="mb-2">
            <label htmlFor={field.name}>{label}</label>
            <input 
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
            />
            <ErrorMessage name={field.name} component="div"  className="error"/>
        </div>
    )
}
export default TextFeild;