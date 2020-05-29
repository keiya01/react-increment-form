import React, { ReactElement, forwardRef } from 'react';

interface InputListProps {
  inputCount: number;
}
export const InputList = forwardRef<HTMLInputElement, InputListProps>(({ inputCount }, ref): ReactElement => (
  <>
    {[...new Array(inputCount)].map((_, i) => <input key={i} name={`${i}`} ref={ref} className="input" />)}
  </>
));
