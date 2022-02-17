import { FormEvent } from 'react';
import { useForm } from '../hooks/useForm';

import '../styles/styles.css';

export const RegisterPage = () => {

    const { 
        formData, onChange, resetForm, isEmailValid,
        name, email, password1, password2
    } = useForm({
        name: '',
        email: '',
        password1: '',
        password2: ''
    });

    const onSubmit = ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log( formData );
    }

    return (
        <div>
            <h1>Register Page</h1>

            <form noValidate onSubmit={ onSubmit }>
                <input 
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={ name }
                    onChange={ onChange }
                    className={`${ name.trim().length <= 0 && 'has-error' }`}
                />

                { name.trim().length <= 0 && <span>Este campo es necesario</span>}

                <input 
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={ email }
                    onChange={ onChange }
                    className={ `${ !isEmailValid( email ) && 'has-error'}`}
                />

                { !isEmailValid( email ) && <span>Email no es valido</span>}

                <input 
                    name="password1"
                    type="password"
                    placeholder="Password"
                    value={ password1 }
                    onChange={ onChange }
                />

                { password1.trim().length <= 0 && <span>Este campo es necesario</span>}
                { ( password1.trim().length < 6 && password1.trim().length > 0 ) && <span>La contraseña debe tener al menos 6 caracteres</span>}

                <input 
                    name="password2"
                    type="password"
                    placeholder="Repeat Password"
                    value={ password2 }
                    onChange={ onChange }
                />

                { password2.trim().length <= 0 && <span>Este campo es necesario</span>}
                { ( password2.trim().length > 0 && password2 !== password1 ) && <span>La contraseñas deben ser iguales</span>}

                <button type="submit">Create</button>

                <button type="button" onClick={ resetForm }>Reser Form</button>
            </form>
        </div>
    )
}
