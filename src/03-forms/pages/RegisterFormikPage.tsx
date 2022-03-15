import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../components";

import "../styles/styles.css";

export const RegisterFormikPage = () => {
  return (
    <div>
      <h1>Register Formik Page</h1>

      <Formik
        initialValues={{ name: "", email: "", password1: "", password2: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Must be at least 2 characters long")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Must be a valid email")
            .required("Required"),
          password1: Yup.string()
            .min(6, "Must be at least 6 characters long")
            .required("Required"),
          password2: Yup.string()
            .oneOf([Yup.ref("password1")], "Passwords don't match")
            .required("Required"),
        })}
      >
        {({ handleReset }) => (
          <Form>
            <MyTextInput label="Name" name="name" placeholder="Alexis" />
            <MyTextInput
              label="Email"
              name="email"
              placeholder="email@domain.com"
            />
            <MyTextInput
              label="Password"
              name="password1"
              placeholder="*****"
              type="password"
            />
            <MyTextInput
              label="Confirm Password"
              name="password2"
              placeholder="*****"
              type="password"
            />
            <button type="submit">Create</button>

            <button type="button" onClick={handleReset}>
              Reset Form
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
