import React, { ReactElement } from 'react';
import { FormValue } from './types/formValue';

interface ResultProps {
  values: FormValue | null;
}
export const Result = ({ values }: ResultProps): ReactElement | null => 
    values
    ?
    <div className="result-container">
      <h1 className="title">Your input values</h1>
      <ul>
        {Object.keys(values).map((key, i) => (<li key={i}>{values[key]}</li>))}
      </ul>
    </div>
  : null;
