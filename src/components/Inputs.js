import { ErrorMessage, useField } from "formik";

/*use this inputs when you use formik for any form , you can pass custom styling in
className when you call the component*/

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="align-self-stretch">
      <div className="d-flex align-items-center">
        <label className="mx-1 w-25 align-self-center" htmlFor={field.name}>
          {label}
        </label>
        <input
          className={`form-control mx-5 d-inline my-2 ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        />
      </div>

      <ErrorMessage component="div" className="text-danger" name={field.name} />
    </div>
  );
};

export const TextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="align-self-stretch">
      <div className="d-flex">
        <label className="mx-1 w-25 align-self-center" htmlFor={field.name}>
          {label}
        </label>
        <textarea
          className={`form-control mx-5 d-inline my-2 ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        ></textarea>
      </div>
      <ErrorMessage component="div" className="text-danger" name={field.name} />
    </div>
  );
};

// export const CheckBox = ({ label, ...props }) => {
//   const [field] = useField(props);
//   return (
//     <>
//       <input {...field} {...props} />
//       <label className="mx-2" htmlFor={field.name}>
//         {label}
//       </label>
//     </>
//   );
// };

// export const CheckBoxGroup = ({ options, ...props }) => {
//   const [field] = useField(props);
//   return (
//     <Field className={`form-control`}>
//       {({ field }) => {
//         console.log(field);
//         return options.map((option) => {
//           return (
//             <CheckBox
//               key={option.key}
//               id={option.value}
//               label={option.key}
//               name={field.name}
//               value={option.value}
//               checked={field.value.includes(option.value)}
//             />
//           );
//         });
//       }}
//     </Field>
//   );
// };
