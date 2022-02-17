import { ChangeEvent, useState } from "react";


export const useForm = <T>( initState: T ) => {

    const [ formData, setFormData ] = useState( initState );

    const onChange = ( { target }: ChangeEvent<HTMLInputElement> ) => {
        setFormData( prev => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const resetForm = () => {
        setFormData({ ...initState }); // Para crear objetos nuevos
    };

    //? Espera un email de type string, devuelve un booleano (true/false)
    const isEmailValid = ( email: string ) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    return {
        ...formData, // Se esparce todo lo del state
        // Properties
        formData,

        // Methods
        isEmailValid,
        onChange,
        resetForm
    }
}
