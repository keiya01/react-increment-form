import React, { ReactElement } from 'react';
import { FormValue } from './types/formValue';

interface ResultProps {
  values: FormValue | null;
}
export const Result = ({ values }: ResultProps): ReactElement | null => 
    values
    ?
    <div className={`result-container ${values && 'active-result-container'}`}>
      <div className="result-modal">
        <h1 className="title">Your input values</h1>
        <div>name: {values.name}</div>
        <div>email: {values.email}</div>
        <div>phone number: {values.phoneNumber}</div>
        <div>your favorite foods:</div>
        <ul>
          {values.input.map((val, i) => (<li key={i}>{val}</li>))}
        </ul>
      </div>
    </div>
  : null;
