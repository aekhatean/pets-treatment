import { Formik, Form } from "formik";
import { InputField, TextAreaField } from "./Inputs";
import * as Yup from "yup";

const ContactUs = () => {
  const validate = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Email format is invalid")
      .required("Email is required"),
    message: Yup.string()
      .min(50, "Your message must have at least 50 character")
      .required("Message is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => console.log(values)}
    >
      {(formik) => (
        <Form>
          <InputField label="Name" name="name" type="text" />
          <InputField label="Email" name="email" type="email" />
          <TextAreaField label="Message" name="message" rows="4" columns="50" />
          <button
            className="btn btn-dark me-2 mt-2"
            name="submit"
            type="submit"
          >
            Submit
          </button>
          <button className="btn btn-danger mt-2" name="reset" type="reset">
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUs;
