'use client'
import Link from 'next/link';
import { DollarSign, User, Home, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
export function HeaderMobile({isActive}: {isActive:string}) {
    console.log(isActive)
  return (
    <header className="w-full flex fixed bottom-0 p-4 justify-center bg-violet-600">
      <nav className="flex gap-5 justify-around w-full">
        <Link href={'/'} className={`${isActive === '/' ? 'activeLink' : ''}`}>
          <Home color="white" />
        </Link>
        <Link href={'/payment'} className={`${isActive === '/payment' ? 'activeLink' : ''}`}>
          <DollarSign color="white" />
        </Link>
        <Link href={'/student'} className={`${isActive === '/student' ? 'activeLink' : ''}`}>
          <User color="white" />
        </Link>
        <button>
          <Plus color="white" />
        </button>
      </nav>
    </header>
  );
}
