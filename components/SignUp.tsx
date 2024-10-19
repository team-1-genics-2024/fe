'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormStatus as useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    const response = await fetch(`${apiBaseUrl}api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (response.ok) {
      router.push('/login');
      // redirect('/login')
    } else {
      alert(`Sign up failed : ${response.statusText}`);
    }
  };

  const { pending } = useFormStatus();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md lg:max-w-4xl lg:flex lg:items-center lg:justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative overflow-hidden">
        <button className="absolute top-4 right-4 lg:right-12 lg:top-8 text-black hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* layar device besar */}
        <div className="hidden lg:block lg:w-1/2 text-white p-6">
          <Image src="/image/Star 5.png" alt="bintang" width={90} height={90} className="absolute bottom-[27%] left-[30%] hidden lg:block" />
          <Image src="/image/Star 5.png" alt="bintang" width={180} height={180} className="absolute bottom-[-3%] left-[10%] hidden lg:block -rotate-45" />
          <CardHeader className="space-y-1 mb-40">
            <CardTitle className="text-3xl font-bold text-black ">Sign up</CardTitle>
            <p className="text-sm text-black dark:text-gray-400 ">to continue learning</p>
          </CardHeader>

          
        </div>

        {/* layar device kecil */}
        <div className="w-full lg:w-1/2">
          <CardHeader className="space-y-1 mb-0 lg:hidden">
            <CardTitle className="text-2xl font-bold text-start">Sign up</CardTitle>
            <p className="text-sm text-black dark:text-gray-400 text-start">to continue learning</p>
          </CardHeader>
          <CardContent className="space-y-2 lg:mt-14">
            <form action="" id="contact_form" onSubmit={onSubmitForm}>
              <div className="space-y-4">
                <Input type="text" required placeholder="Enter your Name" className="w-full px-3 py-6 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="email" required placeholder="Enter your email" className="w-full px-3 py-6 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-3 py-6 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-full transition-colors mt-4" disabled={pending} type="submit">
                {pending ? <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div> : <>Sign up</>}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">or</span>
                </div>
              </div>

              <Button variant="outline" className="w-full border text-blue-500 border-gray-400 dark:border-gray-700 rounded-full p-2 flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600">
                <Image src="/Google.png" width={20} height={20} alt="google" />
                <span>Sign up with google</span>
              </Button>
            </form>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 underline font-bold">
                Log in
              </Link>
              <span className="text-gray-500"> instead!</span>
            </p>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
