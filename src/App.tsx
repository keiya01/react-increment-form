import React, { useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';
import { InputList } from './InputList';
import { Result } from './Result';
import { FormValue } from './types/formValue';

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
        <InputList inputCount={inputCount} ref={register}/>
        <button type="button" className="plus-button" onClick={handleOnClick} aria-label="add form">+</button>
        <button type="button" className="submit-button" onClick={handleSubmit(handleOnSubmit)}>submit</button>
      </form>
      <Result values={values.current} />
    </div>
  );
}

export default App;
