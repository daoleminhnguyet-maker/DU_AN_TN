// src/app/dispatch/page.jsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DispatchPage() {
  const router = useRouter();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      router.push('/login');
    }
  }, [router]);
  
  return (
    <div>
      <h1>Trang Điều vận</h1>
      <p>Quản lý điều phối xe</p>
    </div>
  );
}