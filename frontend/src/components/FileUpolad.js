// import React from "react";
// import { Formik, Form } from "formik";
// import * as yup from "yup";
// import { FileInput } from "formik-file-and-image-input/lib";

// const CustomFileInputWrapper = ({onClick, fileName}) => {
//     return (
//         <div>
//             <button onClick={onClick}>Choose File</button>
//             <p>{fileName}</p>
//         </div>
//     )
// }

// export default function MyForm() {
// 	const fileFormats = ["application/pdf"];
// 	const initialValues = {
// 		file: null,
// 	};

// 	const validationSchema = yup.shape({
// 		file: yup.mixed().required(),
// 	});
//     return (
//         <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//         >
// 			<Form>
//                 <FileInput
//                     name="file"
//                     validFormats={fileFormats}
//                     component={CustomFileInputWrapper}
//                 />
// 			</Form>
// 		</Formik>
// 	);
// }