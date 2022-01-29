import { ErrorMessage, useField } from "formik";

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <label className="" htmlFor={field.name}>
          {label}
        </label>
        <input
          className={`form-control d-inline mb-3 ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        />
      </div>

      <ErrorMessage
        component="div"
        className="fs-6 text-danger my-2"
        name={field.name}
      />
    </>
  );
};

export const TextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <label className="" htmlFor={field.name}>
          {label}
        </label>
        <TextAreaField
          className={`form-control d-inline mb-3 ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        />
      </div>

      <ErrorMessage
        component="div"
        className="fs-6 text-danger my-2"
        name={field.name}
      />
    </>
  );
};
