'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import React from 'react';

type WithAuthProps = {
  [key: string]: unknown; // Jika ada properti tambahan yang diteruskan ke komponen
};

const withAuth = <P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      console.log(token);

      if (!token) {
        // Redirect ke halaman login jika tidak ada token
        router.replace('/');
      } else {
        setIsAuthenticated(true); // Tandai pengguna sudah terautentikasi
      }
    }, [router]);

    // Jangan render komponen jika belum diverifikasi
    if (!isAuthenticated) {
      return null; // Bisa diganti dengan spinner/loading jika diinginkan
    }

    // Render komponen jika autentikasi berhasil
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
