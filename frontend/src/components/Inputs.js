import { ErrorMessage, useField, Field } from "formik";
import { LanguageContext } from "../context/LanguageContext";
import { content } from "../translation/translation";
import { useContext } from "react";

/*use this inputs when you use formik for any form , you can pass custom styling in
className when you call the component*/

export const InputField = ({ label, ...props }) => {
  const { lang } = useContext(LanguageContext);
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
          className={`font-small text-danger ${
            lang === "en" ? "text-start" : "text-end"
          }`}
          name={field.name}
        />
      </div>
    </div>
  );
};

export const Select = ({ label, name, options, ...props }) => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="d-flex justify-content-between my-2">
      <label className="px-3 align-self-center flex-one" htmlFor={name}>
        {label}
      </label>
      <div className="d-flex flex-column flex-two">
        <Field
          className="form-select"
          dir="ltr"
          as="select"
          id={name}
          name={name}
          {...props}
        >
          {options.length &&
            options.map((option) => {
              return (
                <option key={option.key} value={option.value}>
                  {option.key}
                </option>
              );
            })}
        </Field>

        <ErrorMessage
          component="div"
          className={`font-small text-danger ${
            lang === "en" ? "text-start" : "text-end"
          }`}
          name={name}
        />
      </div>
    </div>
  );
};

export const TextAreaField = ({ label, ...props }) => {
  const { lang } = useContext(LanguageContext);
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
          className={`font-small text-danger ${
            lang === "en" ? "text-start" : "text-end"
          }`}
          name={field.name}
        />
      </div>
    </div>
  );
};

export const FileUpload = (props) => {
  const { lang } = useContext(LanguageContext);
  const { label, field, form, isCardStyles } = props;

  const handleChange = (e) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      form.setFieldValue(field.name, event.target.result);
    };
  };
  return (
    <>
      <div
        className={`${
          isCardStyles && "d-flex justify-content-between align-items-center"
        } my-2`}
      >
        <label className={!isCardStyles && "my-1"} htmlFor={field.name}>
          {label}
        </label>
        <div className="d-flex flex-column">
          <input
            type={"file"}
            onChange={(o) => handleChange(o)}
            className={"form-control"}
            accept=".jpg,.jpeg,.png,.gif"
            aria-describedby="imageHelp"
          />
          <div
            id="imageHelp"
            className={`text-secondary mt-1 ${
              lang === "en" ? "text-start" : "text-end"
            }`}
            style={{ fontSize: "11px" }}
          >
            {lang === "en"
              ? content.en.supported_formats
              : content.ar.supported_formats}
            <br />
            {lang === "en" ? content.en.max_image : content.ar.max_image}
          </div>
          <ErrorMessage
            component="div"
            className={`font-small text-danger ${
              lang === "en" ? "text-start" : "text-end"
            }`}
            name={field.name}
          />
        </div>
      </div>
    </>
  );
};

export const FileUploadMultiple = (props) => {
  const { lang } = useContext(LanguageContext);
  const { label, field, form, setImagesLen } = props;

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
    <>
      <div className="d-flex justify-content-between align-items-center my-2">
        <label className="flex-one mx-3" htmlFor={field.name}>
          {label}
        </label>
        <div className="d-flex flex-column">
          <input
            type={"file"}
            onChange={(o) => {
              if (setImagesLen) {
                setImagesLen(o.currentTarget.files.length);
              }
              return handleChange(o);
            }}
            className={"form-control flex-two"}
            multiple
            aria-describedby="imagesHelp"
            accept=".jpg,.jpeg,.png,.gif"
          />
          <div
            id="imagesHelp"
            className={`text-secondary mt-1 ${
              lang === "en" ? "text-start" : "text-end"
            }`}
            style={{ fontSize: "11px" }}
          >
            {lang === "en"
              ? content.en.supported_formats
              : content.ar.supported_formats}
            <br />
            {lang === "en"
              ? content.en.max_per_image
              : content.ar.max_per_image}
          </div>
          <ErrorMessage
            component="div"
            className={`font-small text-danger ${
              lang === "en" ? "text-start" : "text-end"
            }`}
            name={field.name}
          />
        </div>
      </div>
    </>
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
