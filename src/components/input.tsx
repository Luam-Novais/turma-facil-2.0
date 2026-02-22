import React, { useState } from 'react';
import { Eye,EyeClosed, Search } from "lucide-react"
import { UseFormRegisterReturn } from "react-hook-form"

interface SearchInputProps{
    placeholder:string,
    type: string,
    register: UseFormRegisterReturn,
}
export function SearchInput({placeholder, type, register}: SearchInputProps){
    return (
      <span className="flex shadow-xl min-w-full w-full ">
        <input type={type} {...register} placeholder={placeholder} className="w-full bg-gray-100 h-8 border-l border-b border-t border-gray-400 rounded-l-md py-5 px-2" />
        <button type="submit" className="bg-violet-600 border border-violet-700 px-6 rounded-r-md">
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
      <input type={type} id="input" {...register}  className="text-base border border-gray-400 rounded-md w-full shadow bg-gray-100 p-2" placeholder={placeholder} />
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
        <input type={isVisible ? 'text' : 'password'} id="inputPass" {...register}  className="text-base border border-gray-400 rounded-sm w-full shadow bg-gray-100 p-2" />
       <button type='button' className='absolute right-1 top-2' onClick={handleVisibilityButton}>{isVisible ? <EyeClosed color='gray' size={20}/> : <Eye color='gray' size={20}/> }</button>
      </span>
    </span>
  );
}

export function TextArea({ label, register }: Input) {
  return (
    <span className="flex flex-col gap-2">
      <label className="block" htmlFor="inputTextArea">
        {label}
      </label>
      <textarea id="inputTextArea" {...register} className="border border-gray-400 rounded-sm w-full shadow bg-gray-100 p-2" />
    </span>
  );
}

export function Select<T extends string[]>({ options, register }: { options: T; register: UseFormRegisterReturn }) {
  return (
    <span>
      <select id="select" {...register} className="border border-gray-400 rounded shadow px-5 py-2 w-full ">
        <option value='undefined'>Escolher Vínculo</option>
        {options?.map((opt, index) => {
          return (
            <option key={index} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </span>
  );
}