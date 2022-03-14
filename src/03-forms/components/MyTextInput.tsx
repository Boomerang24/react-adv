import { ErrorMessage, useField } from "formik";

interface Props {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  [x: string]: any; //?Comodin que permite añadir cualquier cantidad de props
}

export const MyTextInput = ({ label, ...props }: Props) => {
  const [field] = useField(props);

  // const [field, meta] = useField(props);
  //? 'meta' sirve para obtener los metodos de onChange, onBlur
  //? field tiene toda la informacion de touch, changed
  //   console.log(field);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      <ErrorMessage
        name={props.name}
        component="span"
        className="custom-span-error-class"
      />
      {/* //?Con esto ErrorMessage esta al pendiente del name */}
      {/* {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )} */}
    </>
  );
};
