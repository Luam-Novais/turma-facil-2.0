'use client'
import Link from 'next/link';
import { DollarSign, User, Home, Plus,ArrowLeft } from 'lucide-react';
import { useOpenModal } from '../stores/modalStore';

export function HeaderMobile({isActive}: {isActive:string}) {
  const {modal} = useOpenModal()
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
        <button>
          <Plus color="white" />
        </button>
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