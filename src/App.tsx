import React, { useState, useCallback, ReactElement, useRef } from 'react';
import { useForm, Control } from 'react-hook-form';
import './App.css';

type FormValue = Record<string, string>;

interface InputListProps {
  inputCount: number;
  register: Control['register'];
}
const InputList = ({inputCount, register}: InputListProps): ReactElement => (
  <>
    {[...new Array(inputCount)].map((_, i) => <input key={i} name={`${i}`} ref={register} className="input" />)}
  </>
);

interface ResultProps {
  values: FormValue | null;
}
const Result = ({ values }: ResultProps): ReactElement | null => 
    values
    ?
    <div className="result-container">
      <h1 className="title">Your input values</h1>
      <ul>
        {Object.keys(values).map((key, i) => (<li key={i}>{values[key]}</li>))}
      </ul>
    </div>
  : null;

function App() {
  const { register, handleSubmit } = useForm<FormValue>();
  const [inputCount, setInputCount] = useState(1);
  const values = useRef<FormValue|null>(null);

  const handleOnClick = useCallback(() => {
    setInputCount(prev => prev + 1);
  }, []);

  const handleOnSubmit = useCallback((data: Record<string, any>) => {
    values.current = data;
  }, []);

  return (
    <div className="container">
      <form className="form">
        <h1 className="title">Enter something</h1>
        <InputList inputCount={inputCount} register={register}/>
        <button type="button" className="plus-button" onClick={handleOnClick} aria-label="add form">+</button>
        <button type="button" className="submit-button" onClick={handleSubmit(handleOnSubmit)}>submit</button>
      </form>
      <Result values={values.current} />
    </div>
  );
}

export default App;
