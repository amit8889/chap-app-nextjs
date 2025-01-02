// /hooks/useAuthRedirect.ts
"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuthRedirect = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }
  }, [session, status, router]);

  return { session, status };
};

export default useAuthRedirect;
