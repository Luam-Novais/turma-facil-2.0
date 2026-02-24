import React from 'react';
import { SpinnerWithButton } from './spinner';

type ButtonProps = {
  children: React.ReactNode;
  loadingState: boolean;
}

export function Button({ children, loadingState }: ButtonProps) {
  return (
    <button className="py-2 px-6 bg-linear-to-b from-violet-300 to-violet-600 shadow-xl rounded-md text-white justify-center items-center flex gap-6">
      {children}
      {loadingState ? <SpinnerWithButton /> : ''}
    </button>
  );
}
type ButtonCloseModal = {
  children: React.ReactNode;
  desactiveModal: ()=> void
}
export function ButtonCloseModal({children, desactiveModal}: ButtonCloseModal){
  return(
    <button className='text-red-600' onClick={desactiveModal}>{children}</button>
  )
}