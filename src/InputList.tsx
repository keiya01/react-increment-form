import React, { ReactElement, forwardRef } from 'react';
import { NestDataObject, FieldError } from 'react-hook-form';
import { FormValue } from './types/formValue';

interface InputListProps {
  inputCount: number;
  errors: NestDataObject<FormValue, FieldError>
}
export const InputList = forwardRef<HTMLInputElement, InputListProps>(({ inputCount, errors }, ref): ReactElement => (
  <>
    {[...new Array(inputCount)].map((_, i) => {
      const error = errors.input && errors.input[i] ? errors.input[i] : null;
      return (
        <div key={i} className="input-container">
          <input 
            name={`input[${i}]`} 
            ref={ref} 
            className="input" 
            aria-invalid={!!error} 
            aria-describedby={`input-${i}-error-message`} 
            required 
          />
          { error &&
            <span 
              id={`input-${i}-error-message`} 
              className="error-message"
            >
              {error.message}
            </span>
          }
        </div>
      )
    })}
  </>
));
