'use client'
import Link from 'next/link';
import { DollarSign, User, Home, Plus,ArrowLeft } from 'lucide-react';
import { useOpenModal } from '../stores/modalStore';
import { useState } from 'react';

export function HeaderMobile({isActive}: {isActive:string}) {
  const [showBox, setShowBox] = useState<boolean>(false)
  const {modal} = useOpenModal()

  function handleBox(){
    setShowBox((prev)=> !prev )
  }
  return (
    <header className={`w-full fixed bottom-0 p-4 justify-center bg-violet-600 ${modal ? 'hidden' : 'flex'}`}>
      <nav className="flex gap-5 justify-around w-full">
        <Link href={'/home'} className={`${isActive === '/home' ? 'activeLink' : ''}`}>
          <Home color="white" />
        </Link>
        <Link href={'/payment'} className={`${isActive.includes('/payment') ? 'activeLink' : ''}`}>
          <DollarSign color="white" />
        </Link>
        <Link href={'/student'} className={`${isActive.includes('/student') ? 'activeLink' : ''}`}>
          <User color="white" />
        </Link>
        <span className="relative flex justify-center items-start">
          <button onClick={handleBox}>
            <Plus color="white" />
          </button>
          {showBox && (
            <span className="absolute flex flex-col gap-4 bottom-12 -left-25 bg-gray-100 text-gray-900 rounded-md shadow-md py-4 px-2 w-35">
              <Link href={'/payment/create'}>Criar Pagamento</Link>
              <Link href={'/student/create'}>Criar Aluno</Link>
            </span>
          )}
        </span>
      </nav>
    </header>
  );
}
export function TitlePage({title, href}: {title: string, href:string}){
  return (
    <span className="flex gap-4 items-center">
      <Link href={href}>
        <ArrowLeft />
      </Link>
      <h1>{title}</h1>
    </span>
  );
}