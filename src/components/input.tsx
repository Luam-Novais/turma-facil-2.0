import React, { useState } from 'react';
import { Eye,EyeClosed, Search } from "lucide-react"
import { UseFormRegisterReturn } from "react-hook-form"

interface SearchInputProps{
    placeholder:string,
    type: string,
    register: UseFormRegisterReturn,
    onSubmit: ()=> Promise<unknown>
}
export function SearchInput({placeholder, onSubmit, type, register}: SearchInputProps){
    return (
      <span className="flex shadow-xl ">
        <input type={type} {...register} placeholder={placeholder} className="w-full bg-gray-200 h-8 border-l-2 border-b-2 border-t-2 border-gray-300 rounded-l-xl py-5 px-2" />
        <button onClick={onSubmit} className="bg-violet-600 border-2 border-violet-700 px-6 rounded-r-xl">
          <Search color="white" size={18} />
        </button>
      </span>
    );
}

interface Input {
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
}
interface InputPassword extends Input {
  children?: React.ReactNode;
  state?: boolean;
}
export function Input({ label, type, placeholder, register }: Input) {
  return (
    <span className="flex flex-col gap-2">
      <label className="block" htmlFor="input">
        {label}
      </label>
      <input type={type} id="input" {...register} required className="border border-gray-400 rounded-sm text-sm w-full shadow bg-gray-100 p-2" placeholder={placeholder} />
    </span>
  );
}
export function InputPassword({ label, register }: InputPassword) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  function handleVisibilityButton(){
    setIsVisible((prev) => !prev);
  }
  return (
    <span className="flex flex-col gap-2 ">
      <label className="block" htmlFor="inputPass">
        {label}
      </label>
      <span className="relative flex">
        <input type={isVisible ? 'text' : 'password'} id="inputPass" {...register} required className="border border-gray-400 rounded-sm text-sm w-full shadow bg-gray-100 p-2" />
       <button type='button' className='absolute right-1 top-2' onClick={handleVisibilityButton}>{isVisible ? <EyeClosed color='gray' size={20}/> : <Eye color='gray' size={20}/> }</button>
      </span>
    </span>
  );
}