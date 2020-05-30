import React, { useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import { InputList } from './InputList';
import { Result } from './Result';
import { FormValue } from './types/formValue';

/**
 * TODO
 * - validation
 * - reset
 */

function App() {
  const { register, handleSubmit, errors } = useForm<FormValue>();
  const [inputCount, setInputCount] = useState(1);
  const values = useRef<FormValue|null>(null);

  const handleOnClick = useCallback(() => {
    setInputCount(prev => prev + 1);
  }, []);

  const handleOnSubmit = useCallback((data: FormValue) => {
    values.current = data;
  }, []);

  return (
    <div className="container">
      <form className="form">
        <h1 className="title">Enter something</h1>
        <div className="input-container">
          <label htmlFor="name">name(required):</label>
          <input 
            type="text" 
            id="name" 
            className="input" 
            name="name"
            ref={register({ 
              required: 'required' 
            })} 
            required 
            aria-invalid={!!errors.name}
            aria-describedby={"name-error-message"}
          />
          { errors.name &&
            <span id="name-error-message" className="error-message">{errors.name.message}</span>
          }
        </div>
        <div className="input-container">
          <label htmlFor="email">email(required):</label>
          <input 
            type="email" 
            id="email" 
            className="input" 
            name="email" 
            ref={register({ 
              required: 'required', 
              pattern: { value: /\S+@\S+\.\S+/, message: 'input email address' } 
            })} 
            required 
            aria-invalid={!!errors.email}
            aria-describedby={"email-error-message"}
          />
          { errors.email &&
            <span id="email-error-message" className="error-message">{errors.email.message}</span>
          }
        </div>
        <div className="input-container">
          <label htmlFor="email">phone number(required):</label>
          <input 
            type="number" 
            id="phone-number" 
            className="input" 
            name="phoneNumber" 
            ref={register({ 
              required: 'required', 
              pattern: { value: /[0-9]/, message: 'input number' },
              maxLength: {
                value: 15,
                message: 'max length is 15'
              },
              minLength: {
                value: 10,
                message: 'min length is 10'
              }
            })} 
            required 
            aria-invalid={!!errors.phoneNumber}
            aria-describedby={"phone-number-error-message"}
          />
          { errors.phoneNumber &&
            <span 
              id="phone-number-error-message" 
              className="error-message"
            >
              {errors.phoneNumber.message}
            </span>
          }
        </div>
        <div className="input-container">
          <label>your favorite foods(required):</label>
          <InputList inputCount={inputCount} errors={errors} ref={register({ required: 'required' })}/>
        </div>
        <button type="button" className="plus-button" onClick={handleOnClick} aria-label="add form">+</button>
        <button type="button" className="submit-button" onClick={handleSubmit(handleOnSubmit)}>submit</button>
      </form>
      <Result values={values.current} />
    </div>
  );
}

export default App;
