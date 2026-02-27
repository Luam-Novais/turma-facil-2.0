'use client';
import { Spinner } from '@/src/components/spinner';
import { data_get } from '@/src/utils/fecthOpt';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isCheck, setIsCheck] = useState<boolean>(true);

  const authFetch = async (token: string) => {
    const { url, options } = data_get('auth/me', token);
    const response = await fetch(url, options as RequestInit);
    if (!response.ok){
      router.push('/login')
      return
    }
    setIsCheck(false);
  };
  useEffect(() => {
    const tokenLocal = localStorage.getItem('token');
    if (tokenLocal === null) {
      router.push('/login');
      return;
    }
    authFetch(tokenLocal);
  }, []);
  if(isCheck) return <Spinner/>
  return <>{children}</>;
}
