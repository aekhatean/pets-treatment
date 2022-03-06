import { ErrorMessage, useField, Field } from "formik";

/*use this inputs when you use formik for any form , you can pass custom styling in
className when you call the component*/

export const InputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="d-flex justify-content-between my-2">
      <label className="px-3 align-self-center flex-one" htmlFor={field.name}>
        {label}
      </label>
      <div className="d-flex flex-column flex-two">
        <input
          className={`form-control ${
            meta.touched && meta.error
              ? "is-invalid"
              : meta.touched && !meta.error
              ? "is-valid"
              : ""
          }`}
          {...field}
          {...props}
        />
        <ErrorMessage
          component="div"
          className="font-small text-danger text-start"
          name={field.name}
        />
      </div>
    </div>
  );
};

export const Select = ({ label, name, options, ...props }) => {
  return (
    <div className="d-flex justify-content-between my-2">
      <label className="px-3 align-self-center flex-one" htmlFor={name}>
        {label}
      </label>
      <div className="d-flex flex-column flex-two">
        <Field
          className="form-select"
          as="select"
          id={name}
          name={name}
          {...props}
        >
          {options.map((option) => {
            return (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            );
          })}
        </Field>

        <ErrorMessage
          component="div"
          className="font-small text-danger text-start"
          name={name}
        />
      </div>
    </div>
  );
};

export const TextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="d-flex justify-content-between my-2">
      <label className="px-3 align-self-center flex-one" htmlFor={field.name}>
        {label}
      </label>
      <div className="d-flex flex-column flex-two">
        <textarea
          className={`form-control ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        ></textarea>
        <ErrorMessage
          component="div"
          className="font-small text-danger text-start"
          name={field.name}
        />
      </div>
    </div>
  );
};

export const FileUpload = (props) => {
  const { label, field, form } = props;

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      // console.log(file.name, "file name");
      // console.log(event.target.result, "event target result");
      form.setFieldValue(field.name, event.target.result);
    };

    reader.readAsDataURL(file);
  };
  return (
    <div className="d-flex justify-content-between align-items-center my-2">
      <label className="flex-one" htmlFor={field.name}>
        {label}
      </label>
      <input
        type={"file"}
        onChange={(o) => handleChange(o)}
        className={"form-control flex-two"}
      />
    </div>
  );
};

export const FileUploadMultiple = (props) => {
  const { label, field, form } = props;

  const handleChange = (e) => {
    const files = e.currentTarget.files;
    let base64_images = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function () {
        base64_images.push(reader.result);
      };
    }
    form.setFieldValue(field.name, base64_images);
  };
  return (
    <div className="d-flex justify-content-between align-items-center my-2">
      <label className="flex-one" htmlFor={field.name}>
        {label}
      </label>
      <input
        type={"file"}
        onChange={(o) => handleChange(o)}
        className={"form-control flex-two"}
        multiple
      />
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
