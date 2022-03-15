import { Formik, Form } from "formik";
import { MySelect, MyTextInput } from "../components";
import formJson from "../data/custom-form.json";
import * as Yup from "yup";
// console.log(formJson);

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {};

for (const input of formJson) {
  initialValues[input.name] = input.value; // Se captura el valor inicial y capturamos el objeto

  if (!input.validations) continue; // Si no hay validaciones se sale del for

  let schema = Yup.string(); // Se crea un schema por campo/field, se usa let para reasignarlo multiples veces

  for (const rule of input.validations) {
    if (rule.type === "required") {
      schema = schema.required("Required field"); // Se evalua el require
    }

    if (rule.type === "minLength") {
      schema = schema.min(
        (rule as any).value || 2,
        `Must be at least ${(rule as any).value || 2} characters long`
      );
    }

    if (rule.type === "email") {
      schema = schema.email("Must be a valid email");
    }

    // ... otras reglas
  }

  requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
  return (
    <div>
      <h1>Dynamic Forms</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formik) => (
          <Form noValidate>
            {/* {formJson.map((field) => { */}
            {formJson.map(({ type, name, placeholder, label, options }) => {
              if (type === "input" || type === "password" || type === "email") {
                return (
                  <MyTextInput
                    key={name}
                    type={type as any}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                  />
                );
              } else if (type === "select") {
                return (
                  <MySelect key={name} label={label} name={name}>
                    <option value="">Select an option</option>
                    {/* {options?.map((option) => ( */}
                    {options?.map(({ id, label }) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </MySelect>
                );
              }

              throw new Error(`El type: ${type}, no es soportado`);
            })}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
