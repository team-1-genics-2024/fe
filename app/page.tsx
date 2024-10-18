
import LoginForm from '@/app/login/page'
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href='/signup' className='mr-4 text-red-400'>sign up here</Link>
      <Link href='/login' className='text-red-600'>login here</Link>
    </main>
  );
}
