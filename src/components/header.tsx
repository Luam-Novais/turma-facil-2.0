'use client'
import Link from 'next/link';
import { DollarSign, User, Home, Plus } from 'lucide-react';
import { useEffect } from 'react';
export function HeaderMobile() {
  useEffect(() => {
    const url = location.href;
    console.log(url);
  }, []);
  return (
    <header className="w-full flex fixed bottom-0 p-4 justify-center bg-violet-600">
      <nav className="flex gap-5 justify-around w-full">
        <Link href={'/'}>
          <Home color="white" />
        </Link>
        <Link href={'/create-payment'}>
          <DollarSign color="white" />
        </Link>
        <Link href={'/create-student'}>
          <User color="white" />
        </Link>
        <button>
          <Plus color="white" />
        </button>
      </nav>
    </header>
  );
}
