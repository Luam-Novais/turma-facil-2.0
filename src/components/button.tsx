import React from 'react';
import { SpinnerWithButton } from './spinner';

interface ButtonProps {
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